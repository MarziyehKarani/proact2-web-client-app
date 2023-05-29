import React from "react";
import { useState } from "react";
import { Modal, Row, Col, Input, FormText } from "reactstrap";
import { showLoadingToast, apiErrorToast } from "../../../helpers/toastHelper";
import TextareaWithMaxlength from "../../../components/Common/TextareaWithMaxlength";
import useEnvironment from "../../../infrastructure/session/useEnvironment";
import { createMessage } from "../../../infrastructure/services/network/apiCalls/messagesApiService";
import messageScope from "../../../constants/messageScope";
import messageMood from "../../../constants/messageMood";
import MessageScopeIcon from "../../../components/Messages/MessageScopeIcon";

export const NewInfoMessageModal = ({ props, isOpen, closeCallback, successCallback }) => {

    const [isBodyErrorVisible, setIsBodyErrorVisible] = useState();
    const [body, setBody] = useState();

    const environment = useEnvironment();

    const bodyMaxLength = 500;

    function prepareRequestBody() {
        const requestBody = {
            title: "",
            body: body,
            emotion: messageMood.NONE,
            messageScope: messageScope.INFO,
            hasAttachment: false,
            projectId: environment.projectId,
            medicalTeamId: environment.medicalTeamId
        }
        return requestBody;
    }

    function sendMessage() {
        if (ValidateForm) {
            showLoadingToast();
            const request = prepareRequestBody();
            createMessage(request, apiSuccessHandler, apiErrorToast);
        }
    }

    function apiSuccessHandler(resultData) {
        if (successCallback != null) {
            closeModalHandler();
            successCallback(resultData);
        }
    }

    function ValidateForm() {
        var isValid = true;
        if (!body || body == '') {
            isValid = false;
            setIsBodyErrorVisible(true);
        }
        return isValid;
    }

    function resetForm() {
        setBody();
        setIsBodyErrorVisible(false);
    }

    function closeModalHandler() {
        resetForm();
        closeCallback();
    }

    return (
        <Modal
            size="lg"
            isOpen={isOpen} >
            <div className="modal-header">
                <h5 className="modal-title mt-0" id="myModalLabel">
                     <MessageScopeIcon scope={messageScope.INFO} iconSizeClass="fa-lg" /> {props.t("InfoMessage")}
                </h5>
                <button
                    type="button"
                    onClick={closeModalHandler}
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <form>
                    <Row>
                        <Col>

                            <Row className="mb-5">
                                <label
                                    htmlFor="example-text-input"
                                    className="col-md-4 col-form-label">
                                    {props.t("BodyMessage")}
                                </label>
                                <div className="col-md-8">
                                    <TextareaWithMaxlength
                                        id="body"
                                        maxLength={bodyMaxLength}
                                        value={body}
                                        rows="5"
                                        onChange={e => setBody(e.target.value)}
                                    />
                                    {isBodyErrorVisible ? <FormText color="danger">{props.t("RequiredField")}</FormText> : null}
                                </div>
                            </Row>

                        </Col>
                    </Row>
                </form>
            </div>

            <div className="modal-footer">
                <button
                    type="button"
                    onClick={() => {
                        sendMessage();
                    }}
                    className="btn btn-primary waves-effect waves-light"
                >
                    {props.t("NewTextMessageSubmitButtonText")}
                </button>
            </div>
        </Modal>
    );
}