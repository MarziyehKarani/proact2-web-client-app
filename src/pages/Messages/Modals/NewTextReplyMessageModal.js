import React from "react";
import { useState } from "react";
import { Modal, Row, Col, Input, FormText } from "reactstrap";
import { showLoadingToast, apiErrorToast } from "../../../helpers/toastHelper";
import TextareaWithMaxlength from "../../../components/Common/TextareaWithMaxlength";
import useEnvironment from "../../../infrastructure/session/useEnvironment";
import { createReplyWithImageAttachment, createReply } from "../../../infrastructure/services/network/apiCalls/messagesApiService";
import messageScope from "../../../constants/messageScope";
import messageMood from "../../../constants/messageMood";

export const NewTextReplyMessageModal = ({ props, isOpen, originalMessageId, closeCallback, successCallback }) => {

    
    const environment = useEnvironment();

    const [isBodyErrorVisible, setIsBodyErrorVisible] = useState();
    const [body, setBody] = useState();
    const [attachment, setAttachment] = useState();

    const bodyMaxLength = 500;

    function sendMessage() {
        if (ValidateForm()) {
            showLoadingToast();
            const request = prepareRequestBody();
            if (request.hasAttachment) {
                createReplyWithImageAttachment(request, attachment, apiSuccessHandler, apiErrorToast);
            }
            else {
                createReply(request, apiSuccessHandler, apiErrorToast);
            }
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

    function prepareRequestBody() {
        const requestBody = {
            title: "",
            body: body,
            emotion: messageMood.NONE,
            messageScope: messageScope.NONE,
            hasAttachment: attachment ? true : false,
            projectId: environment.projectId,
            medicalTeamId: environment.medicalTeamId,
            originalMessageId: originalMessageId
        }
        return requestBody;
    }

    function apiSuccessHandler(resultData) {
        if (successCallback != null) {
            closeModalHandler();
            successCallback(resultData);
        }
    }

    function resetForm() {
        setBody();
        setAttachment()
        setIsBodyErrorVisible(false);
    }

    function closeModalHandler() {
        resetForm();
        closeCallback();
    }

    function handleAttachmentSelection(file) {
        Object.assign(file, {
            preview: URL.createObjectURL(file)
        });
        setAttachment(file)
    }

    return (
        <Modal
            size="lg"
            isOpen={isOpen} >
            <div className="modal-header">
                <h5 className="modal-title mt-0" id="myModalLabel">
                    {props.t("ReplyTextMessagePageTitle")}
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
                                    {props.t("ReplyTextMessagePlaceholder")}
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

                            <Row className="mb-5">
                                <label
                                    htmlFor="example-text-input"
                                    className="col-md-4 col-form-label">
                                    {props.t("NewTextMessageAttachPhotoPlaceholder")}
                                </label>
                                <div className="col-md-8">
                                    <Input
                                        type="file"
                                        onInput={e => handleAttachmentSelection(e.target.files[0])}
                                        accept="image/png, image/jpeg" />

                                    {
                                        attachment ?
                                            <img
                                                data-dz-thumbnail=""
                                                className="avatar-xl rounded bg-light mt-2"
                                                alt={attachment.name}
                                                src={attachment.preview}
                                            />
                                            :
                                            <></>
                                    }
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </form>
            </div >

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
        </Modal >
    );
}