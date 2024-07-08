import React from "react";
import { useState , useRef } from "react";
import { Modal, Row, Col, Input, FormText } from "reactstrap";
import { showLoadingToast, apiErrorToast , showErrorAlert } from "../../../helpers/toastHelper";
import TextareaWithMaxlength from "../../../components/Common/TextareaWithMaxlength";
import useEnvironment from "../../../infrastructure/session/useEnvironment";
import { createMessageWithImageAttachment, createMessage } from "../../../infrastructure/services/network/apiCalls/messagesApiService";
import messageScope from "../../../constants/messageScope";
import messageMood from "../../../constants/messageMood";
import MessageScopeIcon from "../../../components/Messages/MessageScopeIcon";
import MoodSelector from "../Components/MoodSelector";

export const NewHealthTextMessageModal = ({ props, isOpen, closeCallback, successCallback }) => {

    const environment = useEnvironment();

    const [isBodyErrorVisible, setIsBodyErrorVisible] = useState();
    const [body, setBody] = useState();
    const [mood, setMood] = useState(messageMood.NONE);
    const [attachment, setAttachment] = useState();
    const [fileInputKey, setFileInputKey] = useState(Date.now()); // Key to force re-render

    const fileInputRef = useRef(null);

    const bodyMaxLength = 500;

    function sendMessage() {
        if (ValidateForm()) {
            showLoadingToast();
            const request = prepareRequestBody();
            if (request.hasAttachment) {
                createMessageWithImageAttachment(request, attachment, apiSuccessHandler, apiErrorToast);
            }
            else {
                createMessage(request, apiSuccessHandler, apiErrorToast);
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
            emotion: mood,
            messageScope: messageScope.HEALTH,
            hasAttachment: attachment ? true : false,
            projectId: environment.projectId,
            medicalTeamId: environment.medicalTeamId
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
        setMood(messageMood.NONE);
        setIsBodyErrorVisible(false);
    }

    function closeModalHandler() {
        resetForm();
        closeCallback();
    }

    function handleAttachmentSelection(file) {
        console.log(file.type);
        if(file.type=="image/jpeg" || file.type=="image/png" || file.type=="image/jpg")
            {
                Object.assign(file, {
                    preview: URL.createObjectURL(file)
                });
                setAttachment(file)
            }
            else
            {
                handleRemoveFile();
                showErrorAlert(props.t("FileUploadHintMessage"));
            }

        }

    async function handleRemoveFile()
    {
        fileInputRef.current.value = null
        setFileInputKey(Date.now()); // Update key to force re-render
        setAttachment(null);
    }

    return (
        <Modal
            size="lg"
            isOpen={isOpen} >
            <div className="modal-header">
                <h5 className="modal-title mt-0" id="myModalLabel">
                    <MessageScopeIcon scope={messageScope.HEALTH} iconSizeClass="fa-lg" /> {props.t("HealthMessage")}
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
                                    {props.t("NewTextMessagePlaceholder")}
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
                                    {props.t("NewTextMessageMoodPlaceholder")}
                                </label>
                                <div className="col-md-8">
                                    <MoodSelector
                                        onMoodChange={setMood} />
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
                                        key={fileInputKey} // Set key to force re-render
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={e => handleAttachmentSelection(e.target.files[0])}
                                        accept="image/png, image/jpeg" />
                                        <span> {props.t("FileUploadHintMessage")}</span>

                                    {
                                        attachment ?
                                        <div className="mt-2" >
                                            <img
                                                data-dz-thumbnail=""
                                                className="avatar-xl rounded bg-light mt-2"
                                                alt={attachment.name}
                                                src={attachment.preview}
                                            />
                                            <button type="button" className="btn btn-danger btn-sm"  style={{ marginLeft: '50px' }}   onClick={ handleRemoveFile}>
                                                <i className="fa fa-trash" aria-hidden="true"></i>
                                            </button>
                                            </div>
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