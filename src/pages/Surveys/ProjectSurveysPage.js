import React from "react"
import { useState, useEffect, useMemo } from "react"
import useUserSession from "../../infrastructure/session/useUserSession"
import useEnvironment from "../../infrastructure/session/useEnvironment"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { withTranslation } from "react-i18next"
import { Container, Row, Card, CardBody, Col , Button , Spinner} from "reactstrap"
import TableContainer from "../../components/Common/TableContainer"
import { FromDateToDateCell } from "../../components/Common/TableCells"
import { LoadingSpinner } from "../../components/Common/LoadingSpinner"
import {
  getProjectSurveys,
  getProjectAssignedSurveys,
} from "../../infrastructure/services/network/apiCalls/surveysApiService"
import { apiErrorToast } from "../../helpers/toastHelper"
import {
  OnceSurveyActionButtons,
  SurveyActionButtons,
  SurveyTextWithReccurenceCell,
  SurveyPatientsCodes,
} from "./Components/SurveysTableCells"
import surveyReccurence from "../../constants/surveyReccurence"
import { getProjectDetails } from "../../infrastructure/services/network/apiCalls/projectsApiService"
import SurveyRowItemCard from "./Components/SurveyRowItemCard"

const ProjectSurveysPage = props => {
  const userSession = useUserSession()
  const environment = useEnvironment()
  const [projectProperties, setProjectProperties] = useState()
  const [backButtonHidden, setbackButtonHidden] = useState(true)

  const [surveys, setSurveys] = useState()
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
     setIsbusy(true);
     
    getProjectAssignedSurveys(
      environment.projectId,
      pagingCount,
      onRequestSuccess,
      apiErrorToast
    )
  }

  function onRequestSuccess(data) {
    setSurveys(prevSurveys =>
      pagingCount === 0 ? data : [...prevSurveys, ...data]
    )

    setNextPageButtonVisible(data.length < pageSize ? false : true)
    setIsbusy(false)
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

  function loadNextPage() {
    setPagingCount(prevCount => prevCount + 1)
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
       } 
    // else if (sortField === "CompleteDate_Desc") {
    //     return new Date(b.completedDateTime) - new Date(a.completedDateTime)
    //   } else if (sortField === "CompleteDate_Asc") {
    //     return new Date(a.completedDateTime) - new Date(b.completedDateTime)
    //   }
      return 0
    })

    return sorted
  }, [surveys, filterValue, sortField])

  // const columns = useMemo(
  //     () => [
  //         {
  //             Header: props.t("Title"),
  //             accessor: "title",
  //             disableFilters: true,
  //             maxWidth: 400,
  //             width: 400,
  //             disableGlobalFilter: false,
  //             filterable: true,
  //             Cell: (cellProps) => {
  //                 const survey = cellProps.row.original;
  //                 return <SurveyTextWithReccurenceCell
  //                     text={survey.title}
  //                     props={props}
  //                     reccurence={survey.reccurence} />;
  //             }
  //         },
  //         {
  //             Header: props.t("AssignedPatientsCodes"),
  //             accessor: "assignedPatients",
  //             disableFilters: true,
  //             disableGlobalFilter: false,
  //             filterable: true,
  //             Cell: (cellProps) => {
  //                 const survey = cellProps.row.original;
  //                 return <SurveyPatientsCodes
  //                     survey={survey}/>;
  //             }
  //         },
  //         {
  //             Header: props.t("Period"),
  //             accessor: "startTime",
  //             maxWidth: 400,
  //             width: 400,
  //             disableFilters: true,
  //             disableGlobalFilter: false,
  //             filterable: true,
  //             Cell: (cellProps) => {
  //                 const survey = cellProps.row.original;
  //                 return <FromDateToDateCell props={props} from={survey.startTime} to={survey.expireTime} />;
  //             }
  //         },
  //         {
  //             Header: props.t("Actions"),
  //             accessor: "action",
  //             maxWidth: 400,
  //             width: 400,
  //             disableFilters: true,
  //             disableGlobalFilter: true,
  //             filterable: false,
  //             Cell: (cellProps) => {
  //                 const survey = cellProps.row.original;
  //                 return <>{survey.reccurence == surveyReccurence.Once ?
  //                     <OnceSurveyActionButtons
  //                         props={props}
  //                         survey={survey} />
  //                     :
  //                     <SurveyActionButtons
  //                         props={props}
  //                         survey={survey} />

  //                 }
  //                 </>
  //             }
  //         }
  //     ],
  //     [props.t]
  // );

  return (
    <Container>
      <Breadcrumbs
        backButtonHidden={backButtonHidden}
        backButtonLinkTo={"/messages"}
        title={props.t("Home")}
        breadcrumbItem={props.t("StudySurveys")}
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
              {/* <option value="CompleteDate_Desc">
                {props.t("CompleteDate_Desc")}
              </option>
              <option value="CompleteDate_Asc">
                {props.t("CompleteDate_Asc")}
              </option> */}
            </select>
          </div>
        </div>
      </Row>

      <Row>
        <Col xs="12">
          {Array.isArray(surveys) && surveys.length > 0 ? (
            
               filteredSurveys.map((survey, idx) => (
                  <SurveyRowItemCard key={idx} survey={survey} props={props} />
                ))
          ) : (
            <LoadingSpinner />
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

export default withTranslation()(ProjectSurveysPage)
