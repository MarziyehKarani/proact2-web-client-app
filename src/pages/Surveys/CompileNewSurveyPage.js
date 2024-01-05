import React from "react"
import { useState, useEffect, useMemo } from "react"
import useUserSession from "../../infrastructure/session/useUserSession"
import useEnvironment from "../../infrastructure/session/useEnvironment"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { withTranslation } from "react-i18next"
import { Container, Row, Card, CardBody, Col, Button } from "reactstrap"
import { LoadingSpinner } from "../../components/Common/LoadingSpinner"
import {
  getSurvey,
  compileSurvey,
} from "../../infrastructure/services/network/apiCalls/surveysApiService"
import { apiErrorToast, showErrorToast } from "../../helpers/toastHelper"
import SurveyQuestionCard from "./Components/SurveyQuestionCard"
import { SurveySuccesfulyCompiledModal } from "./Components/SurveySuccesfulyCompiledModal"

const CompileNewSurveyPage = props => {
  const surveyId = props.match.params.id
  const assegnationId = props.match.params.assegnationId
  const userSession = useUserSession()
  const environment = useEnvironment()
  const [survey, setSurvey] = useState()
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [compiledQuestions, setCompiledQuestions] = useState([])

  useEffect(() => {
    if (environment) {
      loadSurvey()
    }
  }, [environment])

  function loadSurvey() {
    getSurvey(surveyId, onRequestSuccess, apiErrorToast)
  }

  function onRequestSuccess(data) {
    setSurvey(setQuestionCardsVisibility(data))
    console.log(data)
  }

  function handleSendButtonClick() {
    if (validate()) {
      sendCompiledSurvey()
    } else {
      showErrorToast(props.t("FillinAllFields"))
    }
  }

  function sendCompiledSurvey() {
    var request = createRequest()
    compileSurvey(
      surveyId,
      assegnationId,
      request,
      handleCompileRequestSuccess,
      apiErrorToast
    )
  }

  function validate() {
    let surveyQuestionEnabled = survey.questions.filter(
      question => question.isVisible !== false
    )
    return surveyQuestionEnabled.length == compiledQuestions.length
  }

  function createRequest() {
    var request = {
      questionsCompiled: compiledQuestions,
    }
    return request
  }

  function handleCompileRequestSuccess(data) {
    openSuccessModal()
  }

  function openSuccessModal() {
    setIsSuccessModalOpen(true)
  }

  function handleCloseSuccessModal() {
    setIsSuccessModalOpen(true)
    goToNotCompiledSurveysListPage()
  }

  function goToNotCompiledSurveysListPage() {
    props.history.push("/surveys/notcompiled/mine")
  }

  function removeCompiledQuestion(questionId) {
    var items = compiledQuestions.slice()
    var idx = items.findIndex(q => q.questionId == questionId)
    if (idx != -1) {
      items.splice(idx, 1)
    }
    return items
  }

  function handleAddCompiledQuestion(compiledQuestion) {
    var items = removeCompiledQuestion(compiledQuestion.questionId)
    items.push(compiledQuestion)
    console.log(items)
    setCompiledQuestions(items)
  }
  
  //Paola 19/09/2023 
  
  //<--->

  const setQuestionCardsVisibility = data => {
    const updatedQuestions = data.questions.map(element => {
      return { ...element, isVisible: true }
    })

    updatedQuestions.forEach(question => {
      if (question.type === 1) {
        const selectableAnswers = question.answersContainer.selectableAnswers
        if (selectableAnswers) {
          const childQuestions = selectableAnswers.filter(
            answer => answer.childQuestionId !== null
          )
          childQuestions.forEach(childQuestion => {
            const index = updatedQuestions.findIndex(
              dataQuestion => dataQuestion.id === childQuestion.childQuestionId
            )
            if (index !== -1) {
              updatedQuestions[index].isVisible = false
            }
          })
        }
      }
    })
    return { ...data, questions: updatedQuestions }
  }

  function handleEnableNextQuestion(questionId, answerId, nexQuestionId) {
    const question = survey.questions.find(q => q.id === questionId)
    if (!question) {
      return
    }
    const answersWithChildQuestion =
      question.answersContainer.selectableAnswers.filter(
        answer => answer.childQuestionId !== null
      )
    if (!nexQuestionId) {
      answersWithChildQuestion.forEach(answer => {
        hideQuestionById(answer.childQuestionId)
      })
      answersWithChildQuestion
        .filter(answer => answer.answerId !== answerId)
        .forEach(answer => {
          removeQuestion(compiledQuestions, answer.childQuestionId)
        })
      return
    }
    const nextQuestion = survey.questions.find(q => q.id === nexQuestionId)
    if (nextQuestion) {
      nextQuestion.isVisible = true
    }
    answersWithChildQuestion
      .filter(
        answer =>
          answer.answerId !== answerId &&
          answer.childQuestionId !== nexQuestionId
      )
      .forEach(answer => {
        hideQuestionById(answer.childQuestionId)
        removeQuestion(compiledQuestions, answer.childQuestionId)
      })
  }

  function removeQuestion(array, questionId) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].questionId === questionId) {
        array.splice(i, 1)
        break
      }
    }
  }

  function hideQuestionById(questionId) {
    const question = survey.questions.find(q => q.id === questionId)
    if (question) {
      question.isVisible = false
    }
  }
  return (
    <Container>
      <Breadcrumbs
        backButtonLinkTo={"/surveys/notcompiled/mine"}
        title={props.t("ToBeCompletedSurveysPageTitle")}
        breadcrumbItem={survey && survey.title}
      />

      {survey ? (
        <div>
          <Row>
            <Col xs="12">
              {survey.questions.map((question, idx) => (
                <SurveyQuestionCard
                  key={idx}
                  question={question}
                  props={props}
                  addCompiledQuestion={handleAddCompiledQuestion}
                  enableNextQuestion={handleEnableNextQuestion}
                  questionVisible={question.isVisible}
                />
              ))}
            </Col>
          </Row>
          <Row className="mb-4">
            <Col className="text-end">
              <Button
                className="px-5"
                onClick={handleSendButtonClick}
                color="success"
              >
                {props.t("SubmitSurveyButton")}
              </Button>
            </Col>
          </Row>
        </div>
      ) : (
        <LoadingSpinner />
      )}

      <SurveySuccesfulyCompiledModal
        props={props}
        isOpen={isSuccessModalOpen}
        closeCallback={handleCloseSuccessModal}
      />
    </Container>
  )
}

export default withTranslation()(CompileNewSurveyPage)
