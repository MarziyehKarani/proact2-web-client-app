import React from "react";
import { useState } from "react";
import { Modal, Button } from "reactstrap";
import { showLoadingToast, apiErrorToast } from "../../../helpers/toastHelper";
import useEnvironment from "../../../infrastructure/session/useEnvironment";
import { createMessageWithVideoAttachment, createReplyWithVideoAttachment } from "../../../infrastructure/services/network/apiCalls/messagesApiService";
import messageMood from "../../../constants/messageMood";
import messageScope from "../../../constants/messageScope";
//import VideoRecorederComponent from "../../../components/Common/VideoRecorderComponent";
import VideoPlayerComponent from "../../../components/Common/VideoRecorderComponent";

export const NewVideoMessageModal = ({ props, isOpen, originalMessageId, closeCallback, successCallback }) => {

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

    function prepareReplyRequestBody(){
        var request = prepareRequestBody();
        request.originalMessageId = originalMessageId;
        return request;
    }

    function sendMessage(attachment,width,height) {
        if (Validate(attachment)) {
            showLoadingToast();
            if(originalMessageId){
                sendReplyMessage(attachment,width,height);
            }
            else{
                sendNewMessage(attachment,width,height);
            }
        }
    }

    function sendNewMessage(attachment,width,height){
        const request = prepareRequestBody();
        createMessageWithVideoAttachment(
            request, attachment,width,height, apiSuccessHandler, apiErrorToast);
    }

    function sendReplyMessage(attachment,width,height){
        const request = prepareReplyRequestBody();
        createReplyWithVideoAttachment(
            request, attachment,width,height, apiSuccessHandler, apiErrorToast);
    }

    function apiSuccessHandler(resultData) {
        if (successCallback != null) {
            closeModalHandler();
            successCallback(resultData);
        }
    }

    function Validate(attachment) {
        var isValid = attachment ? true : false;
        return (isValid);
    }

    function closeModalHandler() {
        closeCallback();
    }

    function handleFileVideo(file,width,height) {
        sendMessage(file,width,height)
    }

    return (
        <Modal
            size="lg"
            isOpen={isOpen} >

            <div className="modal-body">

                <div className="mb-5">
                    <h5>
                        {props.t("MessageWithVideoAttachmentTitle")}
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

                <VideoPlayerComponent
                    props={props}
                    isOpen={isOpen}
                    onFileGenerated={handleFileVideo}
                />
            </div>
        </Modal>
    );
}