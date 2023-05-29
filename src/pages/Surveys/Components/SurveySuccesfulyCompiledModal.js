import React from "react";
import { Modal, Button, ModalFooter, ModalBody } from "reactstrap";
import smile from "../../../assets/images/surveys/ic_surveyResultGood.png"

export const SurveySuccesfulyCompiledModal = ({ props, isOpen, closeCallback }) => {
    return (
        <Modal

            style={{ background: "#7D8BFC" }}
            isOpen={isOpen} >
            <ModalBody
                className="text-center">

                <img
                    src={smile}
                    height="100"
                    width="100"
                />
                <h4 className="text-muted m-3">
                    {props.t("SurveyResultsGoodMessage")}
                </h4>
            </ModalBody>
            <ModalFooter>
                <Button
                    className="px-5"
                    onClick={closeCallback}
                    color="success">
                    {props.t("Close")}
                </Button>
            </ModalFooter>
        </Modal>
    );
}