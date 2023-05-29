import React from 'react';
import { Link } from "react-router-dom"
import { Card, Button, Badge, CardImg } from 'reactstrap';
import { useState } from 'react';
import AudioPlayer from './AudioPlayer';
//Lightbox
import Lightbox from "react-image-lightbox"
import "react-image-lightbox/style.css"

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

const MessageAttachment = ({ props, attachment, messageId, onClickCallback }) => {
    if (attachment != null) {
        if (attachment.attachmentType == 0) {
            return (MessageImageAttachment({ props, attachment }));
        }
        else if (attachment.attachmentType == 1) {
            return (MessageVideoAttachment({ props, attachment, messageId, onClickCallback }));
        }
        else if (attachment.attachmentType == 2) {
            return (MessageAudioAttachment({ props, attachment, messageId }));
        }
    }
    else {
        return ("");
    }
}

const MessageImageAttachment = ({ props, attachment }) => {

    const [islightboxVisible, setLightboxVisible] = useState(false)

    return (

        <div>
            {islightboxVisible ? (
                <Lightbox
                    mainSrc={attachment.url}
                    enableZoom={false}
                    onCloseRequest={() => {
                        setLightboxVisible(!islightboxVisible)
                    }}
                />
            ) : null}

            <Link to="#">

                <CardImg
                    onClick={() => {
                        setLightboxVisible(true)
                    }}

                    width="100%"
                    height="350px"
                    style={{ objectFit: "cover" }}
                    src={attachment.url}
                />
            </Link>

        </div>
    );
};

const MessageVideoAttachment = ({ props, attachment, messageId, onClickCallback }) => {

    const duration
        = millisToMinutesAndSeconds(attachment.durationInMilliseconds);

    function onClickHandler() {
        if (onClickCallback != null) {
            onClickCallback(messageId);
        }
    }

    const iconStyle = {
        top: "50%",
        left: "50%",
        position: "absolute",
        transform: "translate(-50%, -50%)"
    }

    const badgeDurationStyle = {
        top: "1%",
        left: "90%",
        position: "absolute",
        transform: "translate(-50%, 50%)"
    }

    return (
        <Link to="#" onClick={onClickHandler} >

            <div style={{ position: "relative" }}>
                <i className="fas fa-play-circle fa-5x text-white" style={iconStyle}></i>
                <h3 style={badgeDurationStyle}><Badge className='bg-dark' pill="true" >{duration}</Badge></h3>
                <img
                    width="100%"
                    height="350px"
                    style={{ objectFit: "cover" }}
                    src={attachment.thumbnailUrl}
                />
            </div>

        </Link>
    );
};

const MessageAudioAttachment = ({ props, attachment, messageId }) => {
    return (
        <div
            className="container d-flex justify-content-start align-items-center"
            style={{ background: "#7D8BFC", height: "180px" }}>

            <AudioPlayer
                messageId={messageId}
            />
            <i className="fa fa-2x fa-microphone text-white ms-4"></i>
        </div>
    );
};


export {
    MessageAttachment
}