import React, { useState, useEffect, useMemo } from 'react';
import { Container, Card, CardBody, Row, Col } from 'reactstrap';
import useUserSession from '../../infrastructure/session/useUserSession';
import useEnvironment from '../../infrastructure/session/useEnvironment';
import getPatients from '../../infrastructure/services/network/apiCalls/patientsApiService';
import { getSurveyStats } from '../../infrastructure/services/network/apiCalls/surveysApiService';
import { apiErrorToast } from '../../helpers/toastHelper';
import { OpenDetailsCell, TextIconCell, FromDateToDateCell } from '../../components/Common/TableCells';
import TableContainer from '../../components/Common/TableContainer';
import { LoadingSpinner } from '../../components/Common/LoadingSpinner';
import { withTranslation } from "react-i18next"
import Breadcrumbs from '../../components/Common/Breadcrumb';
import userSubscriptionState from '../../constants/userSubscriptionState'
import Select from "react-select"
import SurveyQuestionHead from './Components/SurveyQuestionHead'
import SurveyQuestionTypeBadge from './Components/SurveyQuestionTypeBadge';
import SurveuDounutStats from './Components/SurveyStats/SurveyDounutStats';
import surveyQuestionType from '../../constants/surveyQuestionType';

const SurveyStatsPage = (props) => {
    const surveyId = props.match.params.id;
    const [statistics, setStatistics] = useState();

    const userSession = useUserSession();
    const environment = useEnvironment();

    useEffect(() => {
        if (environment) {
            loadStatistics();
        }
    }, [environment]);

    function loadStatistics() {
        getSurveyStats(
            surveyId,
            handleLoadStatisticsSuccess,
            apiErrorToast);
    }

    function handleLoadStatisticsSuccess(data) {
        setStatistics(data);
    }

    function RenderChart(question) {

        console.log("-------------question")
        console.log(question)
        console.log(question.answers)
        if (question.type != surveyQuestionType.OPEN_ANSWER) {
            return <SurveuDounutStats answers={question.answers} />
        }
        else {
            return <div className='text-center text-muted py-4 my-4'>{props.t("NoStatsForThisQuestionType")}</div>
        }
    }

    return (
        <Container>
            <Breadcrumbs
                useHistory={true}
                history={props.history}
                title={props.t("StudySurveys")}
                breadcrumbItem={props.t("SurveyStats")} />

            {
                statistics ?
                    statistics.questionWithAnswers.length > 0 ?
                        statistics.questionWithAnswers.map((element, idx) => (
                            <Card key={idx} >
                                <CardBody>
                                    <div className='d-flex flex-row-reverse'>
                                        <SurveyQuestionTypeBadge 
                                            props={props} 
                                            questionType={element.type} />
                                    </div>
                                    <SurveyQuestionHead questionDetail={element} />
                                    {RenderChart(element)}
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

export default withTranslation()(SurveyStatsPage)