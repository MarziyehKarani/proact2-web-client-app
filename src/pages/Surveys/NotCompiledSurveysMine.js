import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import useUserSession from '../../infrastructure/session/useUserSession';
import useEnvironment from '../../infrastructure/session/useEnvironment';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { withTranslation } from "react-i18next"
import { Container, Row, Card, CardBody, Col } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import { TextCell, OpenDetailsCell, DateCell } from "../../components/Common/TableCells"
import {
    SurveyDateWithReccurenceCell,
    SurveyExpireDateWithStatusCell,
    CompileSurveyButtonCell
} from './Components/SurveysTableCells';
import { LoadingSpinner } from '../../components/Common/LoadingSpinner';
import { getMineNotCompiledSurveys } from '../../infrastructure/services/network/apiCalls/surveysApiService';
import { apiErrorToast } from '../../helpers/toastHelper';
import { getProjectDetails } from '../../infrastructure/services/network/apiCalls/projectsApiService';

const NotCompiledSurveysMine = (props) => {

    const userSession = useUserSession();
    const environment = useEnvironment();

    const [surveys, setSurveys] = useState();
    const [projectProperties, setProjectProperties] = useState();
    const [backButtonHidden, setbackButtonHidden] = useState(true);

    useEffect(() => {
        if (environment) {
            loadSurveys();
            getCurrentProjectProperties();
        }
    }, [environment]);

    useEffect(() => {
        if (projectProperties) {
            setbackButtonHidden(!projectProperties.isMessagingActive)
        }
    }, [projectProperties]);

    function loadSurveys() {
        getMineNotCompiledSurveys(onRequestSuccess, apiErrorToast);
    }

    function getCurrentProjectProperties() {
        getProjectDetails(
            environment.projectId,
            handleProjectPropertiesSuccess,
            apiErrorToast);
    }

    function handleProjectPropertiesSuccess(data) {
        setProjectProperties(data.properties);
    }

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
                startTime: item.scheduler.startTime,
                expireTime: item.scheduler.expireTime,
                lastSubmission: item.scheduler.lastSubmission,
                completed: item.completed,
                expired: item.expired
            }

            notCompletedSurveys.push(survey);
        });
        setSurveys(notCompletedSurveys);
    }

    const columns = useMemo(
        () => [
            {
                Header: props.t("Title"),
                accessor: "title",
                maxWidth: 800,
                width: 800,
                disableFilters: true,
                disableGlobalFilter: false,
                filterable: true,
                Cell: (cellProps) => {
                    return <TextCell  {...cellProps} />;
                }
            },
            {
                Header: props.t("SurveyCompleted"),
                accessor: "lastSubmission",
                disableFilters: true,
                disableGlobalFilter: false,
                filterable: true,
                Cell: (cellProps) => {
                    const survey = cellProps.row.original;
                    return <SurveyDateWithReccurenceCell
                        props={props}
                        date={survey.lastSubmission}
                        reccurence={survey.reccurence}
                    />;
                }
            },
            {
                Header: props.t("ExpireTime"),
                accessor: "expiredTime",
                disableFilters: true,
                disableGlobalFilter: false,
                filterable: true,
                Cell: (cellProps) => {
                    const survey = cellProps.row.original;
                    return <SurveyExpireDateWithStatusCell
                        props={props}
                        date={survey.expireTime}
                        expired={survey.expired}
                    />;
                }
            },

            {
                Header: props.t("Actions"),
                accessor: "action",
                disableFilters: true,
                disableGlobalFilter: true,
                filterable: false,
                Cell: (cellProps) => {
                    const survey = cellProps.row.original;
                    return <CompileSurveyButtonCell
                        linkTo={`/surveys/compile/${survey.surveyId}/${survey.id}`}
                        title={props.t("CompileSurvey")} />;
                }
            }
        ],
        []
    );

    return (

        <Container >
            <Breadcrumbs
                backButtonHidden={backButtonHidden}
                backButtonLinkTo={"/messages"}
                title={props.t("Home")}
                breadcrumbItem={props.t("ToBeCompletedSurveysPageTitle")} />
            <Row>
                <Col xs="12">
                    <Card>
                        <CardBody>
                            {surveys == null ?
                                <LoadingSpinner />
                                :
                                <TableContainer
                                    columns={columns}
                                    data={surveys}
                                    isGlobalFilter={true}
                                    isAddTableWithoutBorderStrap={true}
                                />
                            }
                        </CardBody>
                    </Card>
                </Col>
            </Row>


        </Container>
    );
}

export default withTranslation()(NotCompiledSurveysMine)