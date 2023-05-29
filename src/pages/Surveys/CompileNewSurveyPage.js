import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import useUserSession from '../../infrastructure/session/useUserSession';
import useEnvironment from '../../infrastructure/session/useEnvironment';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { withTranslation } from "react-i18next"
import { Container, Row, Card, CardBody, Col, Button } from 'reactstrap';

import { LoadingSpinner } from '../../components/Common/LoadingSpinner';
import { getSurvey, compileSurvey } from '../../infrastructure/services/network/apiCalls/surveysApiService';
import { apiErrorToast, showErrorToast } from '../../helpers/toastHelper';
import SurveyQuestionCard from './Components/SurveyQuestionCard';
import { SurveySuccesfulyCompiledModal } from './Components/SurveySuccesfulyCompiledModal';

const CompileNewSurveyPage = (props) => {

    const surveyId = props.match.params.id;
    const assegnationId = props.match.params.assegnationId;

    const userSession = useUserSession();
    const environment = useEnvironment();
    const [survey, setSurvey] = useState();
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const [compiledQuestions, setCompiledQuestions] = useState([]);

    useEffect(() => {
        if (environment) {
            loadSurvey();
        }
    }, [environment]);

    function loadSurvey() {
        getSurvey(surveyId, onRequestSuccess, apiErrorToast);
    }

    function onRequestSuccess(data) {
        setSurvey(data);
    }

    function handleSendButtonClick() {
        if (validate()) {
            sendCompiledSurvey();
        }
        else {
            showErrorToast(props.t("FillinAllFields"));
        }
    }

    function sendCompiledSurvey() {
        var request = createRequest();
        compileSurvey(
            surveyId,
            assegnationId,
            request,
            handleCompileRequestSuccess,
            apiErrorToast);
    }

    function validate() {
        return survey.questions.length == compiledQuestions.length;
    }

    function createRequest() {
        var request = {
            questionsCompiled: compiledQuestions
        }
        return request;
    }

    function handleCompileRequestSuccess(data) {
        openSuccessModal();
    }

    function handleAddCompiledQuestion(compiledQuestion) {
        var items = removeCompiledQuestion(compiledQuestion.questionId);
        items.push(compiledQuestion);
        setCompiledQuestions(items);
    }

    function removeCompiledQuestion(questionId) {
        var items = compiledQuestions.slice();
        var idx = items.findIndex(q => q.questionId == questionId);
        if (idx != -1) {
            items.splice(idx, 1);
        }
        return items;
    }

    function openSuccessModal(){
        setIsSuccessModalOpen(true);
    }

    function handleCloseSuccessModal() {
        setIsSuccessModalOpen(true);
        goToNotCompiledSurveysListPage();
    }

    function goToNotCompiledSurveysListPage() {
        props.history.push("/surveys/notcompiled/mine");
    }

    return (
        <Container>
            <Breadcrumbs
                backButtonLinkTo={"/surveys/notcompiled/mine"}
                title={props.t("ToBeCompletedSurveysPageTitle")}
                breadcrumbItem={survey && survey.title} />

            {
                survey ?
                    <div>
                        <Row>
                            <Col xs="12">
                                {
                                    survey.questions.map((question, idx) => (
                                        <SurveyQuestionCard
                                            key={idx}
                                            question={question}
                                            props={props}
                                            addCompiledQuestion={handleAddCompiledQuestion} />
                                    ))
                                }
                            </Col>
                        </Row>
                        <Row className='mb-4'>
                            <Col
                                className='text-end' >
                                <Button
                                    className='px-5'
                                    onClick={handleSendButtonClick}
                                    color='success'>
                                    {props.t("SubmitSurveyButton")}
                                </Button>
                            </Col>
                        </Row>
                    </div>
                    :
                    <LoadingSpinner />
            }

            <SurveySuccesfulyCompiledModal
                props={props}
                isOpen={isSuccessModalOpen}
                closeCallback={handleCloseSuccessModal}
            />

        </Container>
    );
}

export default withTranslation()(CompileNewSurveyPage);