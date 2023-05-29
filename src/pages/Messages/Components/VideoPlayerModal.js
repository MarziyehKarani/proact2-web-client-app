import React from "react";
import { useState, useEffect } from "react";
import { Modal, Row, Col, Audio } from "reactstrap";
import { LoadingSpinner } from "../../../components/Common/LoadingSpinner";
import {getAttachmentSasUriApi} from "../../../infrastructure/services/network/apiCalls/attachmentApiService";
import { apiErrorToast } from "../../../helpers/toastHelper";

export const VideoPlayeModal = ({ isOpen, closeCallback, messageId }) => {

    const [sasUri, setSasUri] = useState(null);
    useEffect(() => {
        if (isOpen) {
            LoadUrl();
        }
    }, [isOpen]);

    function LoadUrl() {
        if (messageId) {
            getAttachmentSasUriApi(messageId, OnLoadUrlSuccess, apiErrorToast);
        }
    }

    function OnLoadUrlSuccess(result) {
        setSasUri(result.contentUrl);
    }

    function closeModalHandler() {
        closeCallback();
    }

    return (
        <Modal
            size="lg"
            isOpen={isOpen} >

            <div className="modal-header">
                <h5 className="modal-title mt-0" id="myModalLabel">
                    &nbsp;
                </h5>
                <button
                    type="button"
                    onClick={closeModalHandler}
                    className="close m-1"
                    data-dismiss="modal"
                    aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                {sasUri ?
                    <div className="embed-responsive embed-responsive-16by9 ratio ratio-16x9">
                        <iframe
                            className="embed-responsive-item"
                            allowFullScreen
                            allow='autoplay'
                            src={sasUri}
                        />

                    </div>
                    :
                    <LoadingSpinner />
                }
            </div>
        </Modal>
    );
}