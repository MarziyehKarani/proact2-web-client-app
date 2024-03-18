import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import useUserSession from '../../infrastructure/session/useUserSession';
import useEnvironment from '../../infrastructure/session/useEnvironment';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { withTranslation } from "react-i18next"
import { Container, Row, Card, CardBody, Col, Label, Button } from 'reactstrap';
import { getSurveyResults } from '../../infrastructure/services/network/apiCalls/surveysApiService';
import { apiErrorToast, showLoadingToast, showSuccessToast } from '../../helpers/toastHelper';
import { LoadingSpinner } from '../../components/Common/LoadingSpinner';
import SurveyResultsDetails from './Components/SurveyResultsDetails';
import Select from "react-select"
import { getPatientsAssignedToASurvey } from '../../infrastructure/services/network/apiCalls/surveysApiService';
import { getSurveyStatsOverTheTime , getSurveyResultAsExcel } from '../../infrastructure/services/network/apiCalls/dataExportersApiServece';
import generateAndDownloadTextFile from '../../helpers/generateAndDownloadTextFile'; 
import generateAndDownloadExcelFile from '../../helpers/generateAndDownloadExcelFile'; 

const SurveyResults = (props) => {

  const surveyId = props.match.params.id;

  const [assignations, setAssignations] = useState();
  const [selectedAssignation, setSelectedAssignation] = useState();
  const [surveyResults, setSurveyResults] = useState();
  const userSession = useUserSession();
  const environment = useEnvironment();

  useEffect(() => {
    if (environment) {
      loadAssignations();
    }
  }, [environment]);

  useEffect(() => {
    if (selectedAssignation) {
      setSurveyResults();
      loadSurveyResults();
    }
  }, [selectedAssignation]);

  function loadAssignations() {
    getPatientsAssignedToASurvey(
      surveyId,
      handleLoadAssignationsSuccess,
      apiErrorToast);
  }

  function handleLoadAssignationsSuccess(data) {
    var options = getPatientSelectOptionsFromItems(data);
    setAssignations(options);

    if (options.length > 0) {
      setSelectedAssignation(options[0]);
    }
  }

  function loadSurveyResults() {
    getSurveyResults(selectedAssignation.value, onLoadResultsRequestSuccess, apiErrorToast);
  }

  function onLoadResultsRequestSuccess(data) {
    setSurveyResults(data);
  }

  function getPatientSelectOptionsFromItems(items) {
    var options = [];
    items.forEach(item => {
      var optionItem = {};
      optionItem.label = item.user.name;
      optionItem.value = item.id;
      optionItem.userId = item.user.userId;
      options.push(optionItem);
    });

    return options;
  }

  function downloadResultsAsCsv() {
    showLoadingToast();
    getSurveyStatsOverTheTime(
        surveyId,
        selectedAssignation.userId,
        handleDownloadRequestSuccess,
        apiErrorToast);
  }

  function handleDownloadRequestSuccess(data) {
    showSuccessToast(props.t("DownloadSuccess"));
    var filename = selectedAssignation.userId + "." + data.type;
    var content = data.value;
    generateAndDownloadTextFile(content, filename);
  }

  function downloadResultsAsExcel() {
    showLoadingToast();
    getSurveyResultAsExcel(
        surveyId,
        handleDownloadResultsSuccess,
        apiErrorToast);
}

function handleDownloadResultsSuccess(data) {
    showSuccessToast(props.t("DownloadSuccess"));
    generateAndDownloadExcelFile(data);
}

  return (

    <Container >
      <Breadcrumbs
        useHistory={true}
        history={props.history}
        title={props.t("StudySurveys")}
        breadcrumbItem={props.t("SurveyResults")} />

      <Row className='mb-2'>
        <Col sm="8">
          <div className='d-flex justify-content-start'>
            <Label className='my-2 me-2'>{props.t("FilterByPatients")}</Label>
            <div style={{ width: "300px" }}>
              <Select
                value={selectedAssignation}
                onChange={setSelectedAssignation}
                options={assignations}
                classNamePrefix="select2-selection"
              />
            </div>
          </div>
        </Col>
        <Col sm="2" className='d-flex flex-row-reverse'>
          <Button
            color='info'
            className='px-4'
            onClick={downloadResultsAsCsv}
            disabled={!surveyResults}><i className="fas fa-file-download me-2"></i>{props.t("ExportAsCsv")}</Button>
        </Col>
        <Col sm="2" className='d-flex flex-row'>
                <Button
                        color='success'
                        className='px-4'
                        onClick={downloadResultsAsExcel}
                        disabled={!surveyResults}>
                        <i className="fas fa-file-download me-2"></i>{props.t("ExportAsExcel")}
                    </Button>
                </Col>
      </Row>


      {surveyResults ?
        <SurveyResultsDetails
          props={props}
          surveyResults={surveyResults} />
        :
        <LoadingSpinner />
      }


    </Container>
  );
}

export default withTranslation()(SurveyResults)