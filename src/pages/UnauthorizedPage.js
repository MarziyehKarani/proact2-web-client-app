import React from 'react';
import { Card, CardBody, Container } from 'reactstrap';
import { withTranslation } from "react-i18next"

const UnauthorizedPage = (props) => {
    return (
        <Container>
            <div className="alert alert-danger" role="alert">
                {props.t("UnauthorizedMessage")}
            </div>
        </Container>
    );
}

export default withTranslation()(UnauthorizedPage)
