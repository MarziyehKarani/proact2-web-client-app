import React from 'react';
import { useState, useEffect } from 'react';
import { LoadingSpinner } from '../../../components/Common/LoadingSpinner';
import {getAttachmentSasUriApi} from '../../../infrastructure/services/network/apiCalls/attachmentApiService';
import { apiErrorToast } from '../../../helpers/toastHelper';

const AudioPlayer = ({ messageId }) => {

    const [sasUri, setSasUri] = useState(null);

    useEffect(() => {
        if (!sasUri) {
            LoadUrl();
        }
    }, [sasUri]);

    function LoadUrl() {
        if (messageId) {
            getAttachmentSasUriApi(messageId, OnLoadUrlSuccess, apiErrorToast);
        }
    }

    function OnLoadUrlSuccess(result) {
        setSasUri(result.contentUrl);
    }

    return (

        <>
            {sasUri ?
                <audio
                    controls
                    controlsList="nodownload"
                    src={sasUri}>
                    Your browser does not support the
                    <code>audio</code> element.
                </audio>
                :
                <LoadingSpinner />
            }
        </>


    );
}

export default AudioPlayer;