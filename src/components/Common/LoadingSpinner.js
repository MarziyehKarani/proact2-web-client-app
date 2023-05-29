import React from "react";
import { Row, Col } from "reactstrap";

export const LoadingSpinner = () => {
    return (
        <Row className="m-5 text-center">
            <Col>
                <div className="spinner-grow spinner-grow-sm text-secondary mx-1" role="status">
                    <span className="sr-only">Loading...</span>
                </div>

                <div className="spinner-grow spinner-grow-sm text-secondary mx-1" role="status">
                    <span className="sr-only">Loading...</span>
                </div>

                <div className="spinner-grow spinner-grow-sm text-secondary mx-1" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </Col>
        </Row>
    );
}