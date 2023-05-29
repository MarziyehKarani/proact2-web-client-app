import React, { useEffect, useState } from 'react';
import { Container, Card, CardBody } from 'reactstrap';
import { apiErrorToast } from '../helpers/toastHelper';
import { withTranslation } from "react-i18next"
import { getContactPageContent } from '../infrastructure/services/network/apiCalls/projectsApiService';
import useUserSession from '../infrastructure/session/useUserSession';
import useEnvironment from '../infrastructure/session/useEnvironment';
import renderHTML from 'react-render-html';
import Breadcrumbs from '../components/Common/Breadcrumb';
import { LoadingSpinner } from '../components/Common/LoadingSpinner';

const ContactPage = (props) => {

    const session = useUserSession();
    const environment = useEnvironment();

    const [htmlContent, setHtmlContent] = useState();

    useEffect(() => {
        if (environment) {
            loadContactPageContent();
        }
    }, [environment]);

    function loadContactPageContent() {
        getContactPageContent(
            environment.projectId,
            handleApiSuccess,
            apiErrorToast);
    }

    function handleApiSuccess(data) {
        setHtmlContent(data.htmlContent);
    }

    return (
        <Container>
            <Breadcrumbs
                backButtonLinkTo={"/messages"}
                title={props.t("Home")}
                breadcrumbItem={props.t("ContactTitle")} />
            <Card>
                <CardBody>
                    {htmlContent ?
                        renderHTML(htmlContent)
                        :
                        <LoadingSpinner />}
                </CardBody>
            </Card>
        </Container>
    );
}

export default withTranslation()(ContactPage)
