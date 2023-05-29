import React from "react";
import { useState } from "react";
import { Modal, Button } from "reactstrap";
import { showLoadingToast, apiErrorToast } from "../../../helpers/toastHelper";
import useEnvironment from "../../../infrastructure/session/useEnvironment";
import AudioRecorder from "../../../components/Common/AudioRecorder";
import { createMessageWithVoiceAttachment, createReplyWithVoiceAttachment } from "../../../infrastructure/services/network/apiCalls/messagesApiService";
import messageMood from "../../../constants/messageMood";
import messageScope from "../../../constants/messageScope";


export const NewVoiceMessageModal = ({ props, isOpen, originalMessageId, closeCallback, successCallback }) => {

    const [attachment, setAttachment] = useState();

    const environment = useEnvironment();

    function prepareRequestBody() {
        const requestBody = {
            title: "",
            body: "",
            emotion: messageMood.NONE,
            messageScope: messageScope.HEALTH,
            hasAttachment: true,
            projectId: environment.projectId,
            medicalTeamId: environment.medicalTeamId
        }
        return requestBody;
    }

    function prepareReplyRequestBody() {
        var request = prepareRequestBody();
        request.originalMessageId = originalMessageId;
        return request;
    }

    function sendMessage() {
        if (ValidateForm()) {
            showLoadingToast();
            if (originalMessageId) {
                sendReplyMessage();
            }
            else {
                sendNewMessage();
            }
        }
    }

    function sendNewMessage() {
        const request = prepareRequestBody();
        createMessageWithVoiceAttachment(
            request, attachment, apiSuccessHandler, apiErrorToast);
    }

    function sendReplyMessage() {
        const request = prepareReplyRequestBody();
        createReplyWithVoiceAttachment(
            request, attachment, apiSuccessHandler, apiErrorToast);
    }

    function apiSuccessHandler(resultData) {
        if (successCallback != null) {
            closeModalHandler();
            successCallback(resultData);
        }
    }

    function ValidateForm() {
        var isValid = attachment ? true : false;
        return (isValid);
    }

    function closeModalHandler() {
        resetForm();
        closeCallback();
    }

    function handleAudioFile(file) {
        setAttachment(file)
    }

    function resetForm() {
        setAttachment();
    }

    return (
        <Modal
            size="lg"
            style={{ background: "#7D8BFC" }}
            isOpen={isOpen} >

            <div className="modal-body" style={{ background: "#7D8BFC" }}>

                <div className="mb-5">
                    <h5 className="text-white" >
                        {props.t("MessageWithVoiceAttachmentTitle")}
                    </h5>
                    <button
                        type="button"
                        className="close"
                        onClick={closeModalHandler}
                        data-dismiss="modal"
                        aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <AudioRecorder
                    props={props}
                    onFileGenerated={handleAudioFile} />

                <div className="text-end pt-5">
                    {attachment && <Button
                        className="btn-rounded px-5"
                        onClick={sendMessage}
                        color="light">
                        {props.t("SendVoiceMessageConfirmButton")}
                    </Button>}
                </div>


            </div>
        </Modal>
    );
}