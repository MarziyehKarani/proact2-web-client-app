import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

export const BackButton = ({ title,linkTo }) => {

    return (
        <Link to={linkTo}>
            <Button
                color="secondary"
                className="btn-sm me-4"
                outline
            >
                <i className="fas fa-chevron-left"></i> { title}
            </Button>
        </Link>
    );
}