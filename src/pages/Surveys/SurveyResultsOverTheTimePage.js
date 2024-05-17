import React, { useState, useEffect, useMemo } from 'react';
import { Container, Card, CardBody, Row, Col, Button, Label } from 'reactstrap';
import useUserSession from '../../infrastructure/session/useUserSession';
import useEnvironment from '../../infrastructure/session/useEnvironment';
import getPatients from '../../infrastructure/services/network/apiCalls/patientsApiService';
import { getPatientStats } from '../../infrastructure/services/network/apiCalls/surveysApiService';
import { apiErrorToast, showLoadingToast, showSuccessToast } from '../../helpers/toastHelper';
import { OpenDetailsCell, TextIconCell, FromDateToDateCell } from '../../components/Common/TableCells';
import TableContainer from '../../components/Common/TableContainer';
import { LoadingSpinner } from '../../components/Common/LoadingSpinner';
import { withTranslation } from "react-i18next"
import Breadcrumbs from '../../components/Common/Breadcrumb';
import userSubscriptionState from '../../constants/userSubscriptionState'
import Select from "react-select"
import SurveyQuestionHead from './Components/SurveyQuestionHead'
import SurveyQuestionTypeBadge from './Components/SurveyQuestionTypeBadge';
import SurveyStatsOverTheTimeChart from './Components/SurveyStats/SurveyStatsOverTheTimeChart';
import { getSurveyStatsOverTheTime , getSurveyResultAsExcel } from '../../infrastructure/services/network/apiCalls/dataExportersApiServece';
import generateAndDownloadTextFile from '../../helpers/generateAndDownloadTextFile';
import generateAndDownloadExcelFile from '../../helpers/generateAndDownloadExcelFile';
import { getPatientsAssignedToASurvey } from '../../infrastructure/services/network/apiCalls/surveysApiService';


const SurveyResultsOverTheTimePage = (props) => {
    const surveyId = props.match.params.id;

    const [assignations, setAssignations] = useState();
    const [selectedAssignation, setSelectedAssignation] = useState();
    const [patients, setPatients] = useState();
    const [selectedPatient, setSelectedPatient] = useState();
    const [statistics, setStatistics] = useState();
    const [statisticsAreEmpty, setStatisticsAreEmpty] = useState(true);

    const userSession = useUserSession();
    const environment = useEnvironment();


    useEffect(() => {
        if (environment) {
           // loadPatients();
           loadAssignations();
        }
    }, [environment]);

/*     useEffect(() => {
        if (selectedPatient) {
            resetStatistics();
            loadStatistics();
        }
    }, [selectedPatient]); */

    useEffect(() => {
        if (selectedAssignation) {
            resetStatistics();
            loadStatistics();
        }
      }, [selectedAssignation]);

    useEffect(() => {
        setStatisticsAreEmpty(!statistics || statistics.questions.length == 0)
    }, [statistics]);

    function loadPatients() {
        getPatients(
            environment.medicalTeamId,
            handleLoadPatientsSuccess,
            apiErrorToast);
    }

    function handleLoadPatientsSuccess(data) {
        var options = getPatientSelectOptionsFromItems(data);
        setPatients(options);

        if (options.length > 0) {
            setSelectedPatient(options[0]);
        }
    }

    function loadAssignations() {
        getPatientsAssignedToASurvey(
          surveyId,
          handleLoadAssignationsSuccess,
          apiErrorToast);
      }

      function handleLoadAssignationsSuccess(data) {
        var options = getPatientSelectOptionsFromItems(data);
        console.log(data);
        setAssignations(options);
    
        if (options.length > 0) {
          setSelectedAssignation(options[0]);
        }
      }


    function resetStatistics() {
        setStatistics();
    }

    function loadStatistics() {
        getPatientStats(
            surveyId,
            selectedAssignation.value,
            handleLoadStatisticsSuccess,
            apiErrorToast);
    }

    function handleLoadStatisticsSuccess(data) {
        setStatistics(data);
    }

    function getPatientSelectOptionsFromItems(items) {
        var options = [];
        items.forEach(item => {
            var exists = options.some(option => option.value === item.user.userId);
            if(!exists)
                {
                    var optionItem = {};
                    optionItem.label = item.user.name;
                    optionItem.value = item.user.userId;
                    options.push(optionItem);
                }

        });

        return options;
    }

    function downloadResultsAsCsv() {
        showLoadingToast();
        getSurveyStatsOverTheTime(
            surveyId,
            selectedAssignation.value,
            handleDownloadRequestSuccess,
            apiErrorToast);
    }

    function handleDownloadRequestSuccess(data) {
        showSuccessToast(props.t("DownloadSuccess"));
        var filename = selectedAssignation.value + "." + data.type;
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
        <Container>
            <Breadcrumbs
                useHistory={true}
                history={props.history}
                title={props.t("StudySurveys")}
                breadcrumbItem={props.t("SurveyResultsOverTheTime")} />

            <Row className='mb-2'>
                <Col sm="8">
                    <div className='d-flex justify-content-start'>
                        <Label className='my-2 me-2'>{props.t("FilterByPatients")}</Label>
                        <div style={{ width: "300px" }}>
                            <Select

                                // value={selectedPatient}
                                // onChange={setSelectedPatient}
                                // options={patients}
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
                        disabled={statisticsAreEmpty}>
                        <i className="fas fa-file-download me-2"></i>{props.t("ExportAsCsv")}
                    </Button>
                    
                </Col>
                <Col sm="2" className='d-flex flex-row'>
                <Button
                        color='success'
                        className='px-4'
                        onClick={downloadResultsAsExcel}
                        disabled={statisticsAreEmpty}>
                        <i className="fas fa-file-download me-2"></i>{props.t("ExportAsExcel")}
                    </Button>
                </Col>
            </Row>

            {
                statistics ?
                    !statisticsAreEmpty ?
                        statistics.questions.map((element, idx) => (
                            <Card key={idx} >
                                <CardBody>
                                    <div className='d-flex flex-row-reverse'>
                                        <SurveyQuestionTypeBadge props={props} questionType={element.type} />
                                    </div>
                                    <SurveyQuestionHead questionDetail={element} />
                                    <SurveyStatsOverTheTimeChart props={props} questionStats={element} />
                                </CardBody>
                            </Card>
                        ))
                        :
                        <Card >
                            <CardBody className='text-muted text-center py-5'>
                                {props.t("SurveysNotCompiledError")}
                            </CardBody>
                        </Card>
                    :
                    <LoadingSpinner />
            }
        </Container>
    )
}

export default withTranslation()(SurveyResultsOverTheTimePage)