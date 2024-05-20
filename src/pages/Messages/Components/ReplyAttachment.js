import React from 'react';
import { Link } from "react-router-dom"
import { Badge } from 'reactstrap';
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

const ReplyAttachment = ({ props, attachment, messageId, onClickCallback }) => {
    if (attachment != null) {
        if (attachment.attachmentType == 0) {
            return (ReplyImageAttachment({ props, attachment }));
        }
        else if (attachment.attachmentType == 1) {
            return (ReplyVideoAttachment({ props, attachment, messageId, onClickCallback }));
        }
        else if (attachment.attachmentType == 2) {
            return (ReplyAudioAttachment({ props, attachment, messageId }));
        }
    }
    else {
        return ("");
    }
}

const ReplyImageAttachment = ({ props, attachment }) => {

    const [islightboxVisible, setLightboxVisible] = useState(false)

    return (

        <div>
            {islightboxVisible ? (
                <Lightbox
                    mainSrc={attachment.url}
                    enableZoom={false}
                    reactModalStyle={{
                        overlay: {
                            zIndex: 1005
                        }
                    }}
                    onCloseRequest={() => {
                        setLightboxVisible(!islightboxVisible)
                    }}
                />
            ) : null}

            <Link to="#">

                <img
                    onClick={() => {
                        setLightboxVisible(true)
                    }}
                    className="card-img-top img-fluid"
                    src={attachment.url}
                />
            </Link>

        </div>
    );
};

const ReplyVideoAttachment = ({ props, attachment, messageId, onClickCallback }) => {

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
        left: "80%",
        position: "absolute",
        transform: "translate(-50%, 50%)"
    }

    return (
        <Link to="#" onClick={onClickHandler}>
            <div style={{ position: "relative" }}>
                <i className="fas fa-play-circle fa-3x text-white" style={iconStyle}></i>
                <h5 style={badgeDurationStyle}><Badge className='bg-dark' pill="true" >{duration}</Badge></h5>
                <img
                    className="card-img-top img-fluid"
                    style={{ objectFit: "cover" }}
                    src={attachment.thumbnailUrl}
                />
            </div>
        </Link>
    );
};

const ReplyAudioAttachment = ({ props, attachment, messageId }) => {
    return (
        <AudioPlayer
            messageId={messageId}
        />
    );
};


export {
    ReplyAttachment
}