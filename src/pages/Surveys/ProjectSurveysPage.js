import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import useUserSession from '../../infrastructure/session/useUserSession';
import useEnvironment from '../../infrastructure/session/useEnvironment';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { withTranslation } from "react-i18next"
import { Container, Row, Card, CardBody, Col } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import { FromDateToDateCell } from "../../components/Common/TableCells"
import { LoadingSpinner } from '../../components/Common/LoadingSpinner';
import { getProjectSurveys , getProjectAssignedSurveys } from '../../infrastructure/services/network/apiCalls/surveysApiService';
import { apiErrorToast } from '../../helpers/toastHelper';
import { OnceSurveyActionButtons, SurveyActionButtons, SurveyTextWithReccurenceCell, SurveyPatientsCodes } from './Components/SurveysTableCells';
import surveyReccurence from '../../constants/surveyReccurence';
import { getProjectDetails } from '../../infrastructure/services/network/apiCalls/projectsApiService';


const ProjectSurveysPage = (props) => {
    const userSession = useUserSession();
    const environment = useEnvironment();
    const [projectProperties, setProjectProperties] = useState();
    const [backButtonHidden, setbackButtonHidden] = useState(true);

    const [surveys, setSurveys] = useState();

    useEffect(() => {
        if (environment) {
            loadSurveys();
            getCurrentProjectProperties();
        }
    }, [environment]);

    useEffect(() => {
        if(projectProperties ){
            setbackButtonHidden(!projectProperties.isMessagingActive)
        }
    }, [projectProperties]);

    function loadSurveys() {
        getProjectAssignedSurveys(environment.projectId, onRequestSuccess, apiErrorToast);
    }

    function onRequestSuccess(data) {
        setSurveys(data);
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

    const columns = useMemo(
        () => [
            {
                Header: props.t("Title"),
                accessor: "title",
                disableFilters: true,
                maxWidth: 400,
                width: 400,
                disableGlobalFilter: false,
                filterable: true,
                Cell: (cellProps) => {
                    const survey = cellProps.row.original;
                    return <SurveyTextWithReccurenceCell
                        text={survey.title}
                        props={props}
                        reccurence={survey.reccurence} />;
                }
            },
            {
                Header: props.t("AssignedPatientsCodes"),
                accessor: "assignedPatients",
                disableFilters: true,
                disableGlobalFilter: false,
                filterable: true,
                Cell: (cellProps) => {
                    const survey = cellProps.row.original;
                    return <SurveyPatientsCodes
                        survey={survey}/>;
                }
            },
            {
                Header: props.t("Period"),
                accessor: "startTime",
                maxWidth: 400,
                width: 400,
                disableFilters: true,
                disableGlobalFilter: false,
                filterable: true,
                Cell: (cellProps) => {
                    const survey = cellProps.row.original;
                    return <FromDateToDateCell props={props} from={survey.startTime} to={survey.expireTime} />;
                }
            },
            {
                Header: props.t("Actions"),
                accessor: "action",
                maxWidth: 400,
                width: 400,
                disableFilters: true,
                disableGlobalFilter: true,
                filterable: false,
                Cell: (cellProps) => {
                    const survey = cellProps.row.original;
                    return <>{survey.reccurence == surveyReccurence.Once ?
                        <OnceSurveyActionButtons
                            props={props}
                            survey={survey} />
                        :
                        <SurveyActionButtons
                            props={props}
                            survey={survey} />

                    }
                    </>
                }
            }
        ],
        [props.t]
    );

    return (

        <Container >
            <Breadcrumbs
                backButtonHidden={backButtonHidden}
                backButtonLinkTo={"/messages"}
                title={props.t("Home")}
                breadcrumbItem={props.t("StudySurveys")} />
            <Row>
                <Col xs="12">
              { environment ?
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
                    :
                    <Card>
                        <CardBody>
                        <div className="text-center text-muted m-5 p-5"> 
                               {props.t("EmptyComiledSurveysList")}
                               </div>
                        </CardBody>
                    </Card>
}
                </Col>
            </Row>


        </Container>
    );
}

export default withTranslation()(ProjectSurveysPage)