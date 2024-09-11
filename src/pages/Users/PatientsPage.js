import React, { useState, useEffect, useMemo } from "react"
import { Container, Card, CardBody, Badge, Button } from "reactstrap"
import useUserSession from "../../infrastructure/session/useUserSession"
import useEnvironment from "../../infrastructure/session/useEnvironment"
import getPatients from "../../infrastructure/services/network/apiCalls/patientsApiService"
import {
  apiErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../helpers/toastHelper"
import {
  TextIconCell,
  FromDateToDateCell,
} from "../../components/Common/TableCells"
import TableContainer from "../../components/Common/TableContainer"
import { LoadingSpinner } from "../../components/Common/LoadingSpinner"
import { withTranslation } from "react-i18next"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import userSubscriptionState from "../../constants/userSubscriptionState"
import { getAnalysisOfAPatient } from "../../infrastructure/services/network/apiCalls/dataExportersApiServece"
import generateAndDownloadTextFile from "../../helpers/generateAndDownloadTextFile"

const PatientsPage = props => {
  const [patients, setPatients] = useState()
  const userSession = useUserSession()
  const environment = useEnvironment()

  var selectedPatient

  console.log(environment)

  useEffect(() => {
    if (environment) {
      loadPatients()
    }
  }, [environment])

  function loadPatients() {
    getPatients(
      environment.medicalTeamId,
      handleLoadPatientsSuccess,
      apiErrorToast
    )
  }

  function handleLoadPatientsSuccess(data) {
    setPatients(data)
  }

  function handleDownloadAnalysisButtonClick(patient) {
    selectedPatient = patient
    downloadAnalysisAsCsv()
  }

  function downloadAnalysisAsCsv() {
    showLoadingToast()
    getAnalysisOfAPatient(
      selectedPatient.userId,
      handleDownloadRequestSuccess,
      apiErrorToast
    )
  }

  function handleDownloadRequestSuccess(data) {
    showSuccessToast(props.t("DownloadSuccess"))
    var filename = selectedPatient.userId + "." + data.type
    var content = data.value
    generateAndDownloadTextFile(content, filename)
  }

  var columns = useMemo(
    () => [
      {
        Header: props.t("Patient"),
        accessor: "name",
        maxWidth: 800,
        width: 800,
        disableFilters: true,
        disableGlobalFilter: false,
        filterable: true,
        Cell: cellProps => {
          const patient = cellProps.row.original
          return (
            <TextIconCell text={patient.name} iconSource={patient.avatarUrl} />
          )
        },
      },
      {
        Header: props.t("Status"),
        accessor: "state",
        maxWidth: 800,
        width: 800,
        disableFilters: true,
        disableGlobalFilter: false,
        filterable: true,
        Cell: cellProps => {
          const state = cellProps.row.original.state
          if (state == userSubscriptionState.Active) {
            return <Badge color="success">{props.t("Active")}</Badge>
          } else if (state == userSubscriptionState.Deactivated) {
            return <Badge color="danger">{props.t("Deactivated")}</Badge>
          } else {
            return <Badge color="warning">{props.t("Suspended")}</Badge>
          }
        },
      },
      {
        Header: props.t("Dates"),
        accessor: "treatmentStartDate",
        maxWidth: 800,
        width: 800,
        disableFilters: true,
        disableGlobalFilter: false,
        filterable: true,
        Cell: cellProps => {
          const patient = cellProps.row.original
          return (
            <FromDateToDateCell
              props={props}
              from={patient.treatmentStartDate}
              to={patient.treatmentEndDate}
            />
          )
        },
      },
      // ,
      // {
      //     Header: props.t("Action"),
      //     accessor: "action",
      //     disableFilters: true,
      //     disableGlobalFilter: true,
      //     filterable: false,
      //     Cell: (cellProps) => {
      //         const patient = cellProps.row.original;
      //         return <Button
      //             onClick={() => handleDownloadAnalysisButtonClick(patient)}
      //             color='info'>
      //             {props.t("DownloadMessagesAndAnalisys")}
      //         </Button>;
      //     }
      // }
    ],
    [props.t]
  )

  return (
    <Container>
      <Breadcrumbs
        backButtonLinkTo={"/messages"}
        title={props.t("Home")}
        breadcrumbItem={props.t("YourPatientsTitle")}
      />

{ environment ?
        <Card>
          <CardBody>
            {patients == null ? (
              <LoadingSpinner />
            ) : (
              <TableContainer
                columns={columns}
                data={patients}
                isGlobalFilter={true}
                isAddTableWithoutBorderStrap={true}
              />
            )}
          </CardBody>
        </Card>
        :
        <Card>
          <CardBody>
          <div className="text-center text-muted m-5 p-5"> 
            {props.t("EmptyPatientList")}
            </div>
          </CardBody>
      </Card>
}
    </Container>
  )
}

export default withTranslation()(PatientsPage)
