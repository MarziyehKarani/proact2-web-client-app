import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import useUserSession from '../../infrastructure/session/useUserSession';
import useEnvironment from '../../infrastructure/session/useEnvironment';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { withTranslation } from "react-i18next"
import { Container, Row, Card, CardBody, Col } from 'reactstrap';
import { getMineSurveyResults } from '../../infrastructure/services/network/apiCalls/surveysApiService';
import { apiErrorToast } from '../../helpers/toastHelper';
import { LoadingSpinner } from '../../components/Common/LoadingSpinner';
import SurveyResultsDetails from './Components/SurveyResultsDetails';

const SurveyResultsMine = (props) => {

  const surveyAssignationId = props.match.params.id;

  const [surveyResults, setSurveyResults] = useState();
  const userSession = useUserSession();
  const environment = useEnvironment();

  useEffect(() => {
    if (environment) {
      loadData();
    }
  }, [environment]);

  function loadData() {
    getMineSurveyResults(surveyAssignationId, onRequestSuccess, apiErrorToast);
  }

  function onRequestSuccess(data) {
    setSurveyResults(data);
  }

  return (

    <Container >
      <Breadcrumbs
        backButtonLinkTo={"/surveys/compiled/mine"}
        title={props.t("CompletedSurveysPageTitle")}
        breadcrumbItem={props.t("SurveysResults")} />
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

export default withTranslation()(SurveyResultsMine)