import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

export const HistoryBackButton = ({ history, title }) => {

    function handleButtonClick() {
        history.goBack();
    }

    return (
        <Button
            onClick={handleButtonClick}
            color="secondary"
            className="btn-sm me-4"
            outline

        >
            <i className="fas fa-chevron-left"></i> {title}
        </Button>

    );
}