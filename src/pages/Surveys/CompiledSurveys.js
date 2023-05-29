import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import useUserSession from '../../infrastructure/session/useUserSession';
import useEnvironment from '../../infrastructure/session/useEnvironment';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { withTranslation } from "react-i18next"
import { Container, Row, Card, CardBody, Col } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import { TextCell, OpenDetailsCell, DateTimeCell, BadgeCell } from "../../components/Common/TableCells"
import { LoadingSpinner } from '../../components/Common/LoadingSpinner';
import { getCompiledSurveys } from '../../infrastructure/services/network/apiCalls/surveysApiService';
import { apiErrorToast } from '../../helpers/toastHelper';
import { SurveyDateWithReccurenceCell } from './Components/SurveysTableCells';


const CompiledSurveys = (props) => {
    const patientId = props.match.params.id;
    const userSession = useUserSession();
    const environment = useEnvironment();

    const [surveys, setSurveys] = useState();

    useEffect(() => {
        if (environment) {
            loadSurveys();
        }
    }, [environment]);

    function loadSurveys() {
        getCompiledSurveys(patientId,onRequestSuccess, apiErrorToast);
    }

    function onRequestSuccess(data) {
        setSurveys(data);
    }

    const columns = useMemo(
        () => [
            {
                Header: props.t("completedDateTime"),
                accessor: "completedDateTime",
                maxWidth: 800,
                width: 800,
                disableFilters: true,
                disableGlobalFilter: false,
                filterable: true,
                Cell: (cellProps) => {
                    const survey = cellProps.row.original;
                    return <SurveyDateWithReccurenceCell
                    date={survey.completedDateTime} 
                    props={props} 
                    reccurence={survey.reccurence} />;
                }
            },
            {
                Header: props.t("SurveyTitle"),
                accessor: "surveyTitle",
                maxWidth: 800,
                width: 800,
                disableFilters: true,
                disableGlobalFilter: false,
                filterable: true,
                Cell: (cellProps) => {
                    return <TextCell {...cellProps} />;
                }
            },
            {
                Header: props.t("action"),
                accessor: "action",
                disableFilters: true,
                disableGlobalFilter: true,
                filterable: false,
                Cell: (cellProps) => {
                    const survey = cellProps.row.original;
                    return <OpenDetailsCell
                        linkTo={`/surveys/compiled/${survey.id}`}
                        title={props.t("SurveysResults")} />;
                }
            }
        ],
        []
    );

    return (

        <Container >
            <Breadcrumbs
                backButtonLinkTo={"/patients"}
                title={props.t("YourPatientsTitle")}
                breadcrumbItem={props.t("CompletedSurveysPageTitle")} />
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

export default withTranslation()(CompiledSurveys)