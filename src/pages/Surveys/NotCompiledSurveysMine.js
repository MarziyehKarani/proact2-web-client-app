import React from "react"
import { useState, useEffect, useMemo } from "react"
import useUserSession from "../../infrastructure/session/useUserSession"
import useEnvironment from "../../infrastructure/session/useEnvironment"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { withTranslation } from "react-i18next"
import {
  Container,
  Row,
  Card,
  CardBody,
  Col,
  Button,
  Spinner,
} from "reactstrap"
import TableContainer from "../../components/Common/TableContainer"
import {
  TextCell,
  OpenDetailsCell,
  DateCell,
} from "../../components/Common/TableCells"
import {
  SurveyDateWithReccurenceCell,
  SurveyExpireDateWithStatusCell,
  CompileSurveyButtonCell,
} from "./Components/SurveysTableCells"
import { LoadingSpinner } from "../../components/Common/LoadingSpinner"
import { getMineNotCompiledSurveys } from "../../infrastructure/services/network/apiCalls/surveysApiService"
import { apiErrorToast } from "../../helpers/toastHelper"
import { getProjectDetails } from "../../infrastructure/services/network/apiCalls/projectsApiService"
import NotCompiledSurveysMineCard from "./Components/NotCompiledSurveysMineCard"

const NotCompiledSurveysMine = props => {
  const userSession = useUserSession()
  const environment = useEnvironment()

  const [surveys, setSurveys] = useState()
  const [projectProperties, setProjectProperties] = useState()
  const [backButtonHidden, setbackButtonHidden] = useState(true)
  const [filterValue, setFilterValue] = useState("")
  const [sortField, setSortField] = useState("default")
  const [pagingCount, setPagingCount] = useState(0)
  const [nextPageButtonVisible, setNextPageButtonVisible] = useState(false)
  const [isbusy, setIsbusy] = useState(false)

  const pageSize = 5

  useEffect(() => {
    if (environment) {
      loadSurveys()
      getCurrentProjectProperties()
    }
  }, [environment])

  useEffect(() => {
    if (projectProperties) {
      setbackButtonHidden(!projectProperties.isMessagingActive)
    }
  }, [projectProperties])

  useEffect(() => {
    if (pagingCount > 0) {
      loadSurveys()
    }
  }, [pagingCount])

  function loadSurveys() {
    setIsbusy(true)
    getMineNotCompiledSurveys(pagingCount, onRequestSuccess, apiErrorToast)
  }

  function getCurrentProjectProperties() {
    getProjectDetails(
      environment.projectId,
      handleProjectPropertiesSuccess,
      apiErrorToast
    )
  }

  function handleProjectPropertiesSuccess(data) {
    setProjectProperties(data.properties)
  }

  const handleFilterValue = e => {
    setFilterValue(e.target.value)
  }

  const filteredSurveys = useMemo(() => {
    if (!surveys) return []

    const filtered = surveys.filter(survey =>
      survey.title.toLowerCase().includes(filterValue.toLowerCase())
    )

    const sorted = [...filtered].sort((a, b) => {
      if (sortField === "Title_Asc") {
        return a.title.localeCompare(b.title)
      } else if (sortField === "Title_Desc") {
        return b.title.localeCompare(a.title)
      } else if (sortField === "SentDate_Desc") {
        return new Date(b.startTime) - new Date(a.startTime)
      } else if (sortField === "SentDate_Asc") {
        return new Date(a.startTime) - new Date(b.startTime)
      } else if (sortField === "ExpireDate-Asc") {
        return new Date(a.expireTime) - new Date(b.expireTime)
      } else if (sortField === "ExpireDate-Desc") {
        return new Date(b.expireTime) - new Date(a.expireTime)
      }
      return 0
    })

    return sorted
  }, [surveys, filterValue, sortField])

  function onRequestSuccess(data) {
    var notCompletedSurveys = []
    data.forEach(item => {
      var survey = {
        id: item.id,
        surveyId: item.surveyId,
        title: item.surveyTitle,
        description: item.surveyDescription,
        version: item.surveyVersion,
        reccurence: item.reccurence,
        startTime: item.startTime,
        expireTime: item.expireTime,
        lastSubmission: item.scheduler.lastSubmission,
        completed: item.completed,
        expired: item.expired,
      }

      notCompletedSurveys.push(survey)
    })

    setSurveys(prevSurveys =>
      pagingCount === 0
        ? notCompletedSurveys
        : [...prevSurveys, ...notCompletedSurveys]
    )

    setNextPageButtonVisible(data.length < pageSize ? false : true)
    setIsbusy(false)
  }

  function loadNextPage() {
    setPagingCount(prevCount => prevCount + 1)
  }

  //   const columns = useMemo(
  //     () => [
  //       {
  //         Header: props.t("Title"),
  //         accessor: "title",
  //         maxWidth: 800,
  //         width: 800,
  //         disableFilters: true,
  //         disableGlobalFilter: false,
  //         filterable: true,
  //         Cell: cellProps => {
  //           return <TextCell {...cellProps} />
  //         },
  //       },
  //       {
  //         Header: props.t("SurveyCompleted"),
  //         accessor: "lastSubmission",
  //         disableFilters: true,
  //         disableGlobalFilter: false,
  //         filterable: true,
  //         Cell: cellProps => {
  //           const survey = cellProps.row.original
  //           return (
  //             <SurveyDateWithReccurenceCell
  //               props={props}
  //               date={survey.startTime}
  //               reccurence={survey.reccurence}
  //             />
  //           )
  //         },
  //       },
  //       {
  //         Header: props.t("ExpireTime"),
  //         accessor: "expiredTime",
  //         disableFilters: true,
  //         disableGlobalFilter: false,
  //         filterable: true,
  //         Cell: cellProps => {
  //           const survey = cellProps.row.original
  //           return (
  //             <SurveyExpireDateWithStatusCell
  //               props={props}
  //               date={survey.expireTime}
  //               expired={survey.expired}
  //             />
  //           )
  //         },
  //       },

  //       {
  //         Header: props.t("Actions"),
  //         accessor: "action",
  //         disableFilters: true,
  //         disableGlobalFilter: true,
  //         filterable: false,
  //         Cell: cellProps => {
  //           const survey = cellProps.row.original
  //           return (
  //             <CompileSurveyButtonCell
  //               linkTo={`/surveys/compile/${survey.surveyId}/${survey.id}`}
  //               title={props.t("CompileSurvey")}
  //             />
  //           )
  //         },
  //       },
  //     ],
  //     [props.t]
  //   )

  return (
    <Container>
      <Breadcrumbs
        backButtonHidden={backButtonHidden}
        backButtonLinkTo={"/messages"}
        title={props.t("Home")}
        breadcrumbItem={props.t("ToBeCompletedSurveysPageTitle")}
      />

      <Row className="mb-3">
        <div className="col-md-8 d-flex justify-content-start align-items-center">
          <div className="search-box me-2 mb-2 w-100">
            <div className="position-relative">
              <label className="search-label w-100">
                <span id="search-bar-0-label" className="sr-only">
                  Cerca
                </span>
                <input
                  id="search-bar-0"
                  type="text"
                  className="form-control w-100"
                  placeholder={props.t("SearchbarPlaceholder")}
                  value={filterValue || ""}
                  onChange={handleFilterValue}
                />
              </label>
              <i className="bx bx-search-alt search-icon"></i>
            </div>
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-end align-items-center">
          {/* <label className="form-label">{props.t("SortBy")}</label> */}
          <div className="me-2 mb-2 w-80">
            <select
              className="form-select"
              value={sortField}
              onChange={e => setSortField(e.target.value)}
              style={{ border: "none", boxShadow: "none" }}
            >
              <option value="default">{props.t("SortBy")}</option>
              <option value="Title_Asc">{props.t("Title_Asc")}</option>
              <option value="Title_Desc">{props.t("Title_Desc")}</option>
              <option value="SentDate_Desc">{props.t("SentDate_Desc")}</option>
              <option value="SentDate_Asc">{props.t("SentDate_Asc")}</option>
              <option value="ExpireDate-Asc">
                {props.t("ExpireDate-Asc")}
              </option>
              <option value="ExpireDate-Desc">
                {props.t("ExpireDate-Desc")}
              </option>
            </select>
          </div>
        </div>
      </Row>
      <Row>
        <Col xs="12">
          {surveys === undefined ? (
            <LoadingSpinner />
          ) : Array.isArray(surveys) && surveys.length > 0 ? (
            filteredSurveys.map((survey, idx) => (
              <NotCompiledSurveysMineCard
                key={idx}
                survey={survey}
                props={props}
              />
            ))
          ) : (
            <Card>
                      <CardBody>
                        <div className="text-center">
                          {props.t("EmptyNotComiledSurveysList")}
                        </div>
                      </CardBody>
                    </Card>
          )}
        </Col>
      </Row>
      {nextPageButtonVisible ? (
        <div className="p-3 text-center">
          <Button
            color="success"
            className="btn-rounded px-3"
            onClick={loadNextPage}
          >
            {isbusy && <Spinner size="sm" color="light" className="me-2" />}
            {props.t("LoadMore")}
          </Button>
        </div>
      ) : (
        <></>
      )}
    </Container>
  )
}

export default withTranslation()(NotCompiledSurveysMine)
