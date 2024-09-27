import React from "react";
import { useState, useEffect , useRef } from "react";
import { Modal, Row, Col, Audio } from "reactstrap";
import { LoadingSpinner } from "../../../components/Common/LoadingSpinner";
import {getAttachmentSasUriApi} from "../../../infrastructure/services/network/apiCalls/attachmentApiService";
import { apiErrorToast } from "../../../helpers/toastHelper";

export const VideoPlayeModal = ({ isOpen, closeCallback, messageId }) => {

    const [sasUri, setSasUri] = useState(null);
    const iframeRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            LoadUrl();
        }
    }, [isOpen]);

/*     useEffect(() => {
        if (sasUri) {
            openFullscreen();
        }
    }, [sasUri]); */

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

    const openFullscreen = () => {
        console.log("openFullscreen");
        const iframe = iframeRef.current;
        console.log(iframe);
        if (iframe) {
            if (iframe.requestFullscreen) {
                iframe.requestFullscreen();
            } else if (iframe.mozRequestFullScreen) { // Firefox
                iframe.mozRequestFullScreen();
            } else if (iframe.webkitRequestFullscreen) { // Chrome, Safari and Opera
                iframe.webkitRequestFullscreen();
            } else if (iframe.msRequestFullscreen) { // IE/Edge
                iframe.msRequestFullscreen();
            }
        }
    };

    return (
        <Modal
           fullscreen
            size="xl"
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
            {/* <div className="embed-responsive embed-responsive-16by9 ratio ratio-16x9"> */}
            <div className="modal-body p-0 position-relative" >
                {sasUri ?
                        <iframe
                            className="embed-responsive-item"
                            allowFullScreen
                            allow='autoplay'
                            src={sasUri}
                            style={{ width: "100%" , height: "100%" , position:"absolute" , top:"0" , left:"0"}} // Ensure iframe fills the container
                        />
                    :
                    <LoadingSpinner />
                }
            </div>
        </Modal>
    );
}