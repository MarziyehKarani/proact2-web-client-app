import React from 'react';
import { Button } from 'reactstrap';
import messageScope from '../../../constants/messageScope';

const MessageListRowActionBar = ({
    props,
    message,
    showReplyButtons,
    onTextMessageButtonClick,
    onAudioMessageButtonClick,
    onVideoMessageButtonClick }) => {
    return (
        <div className="d-flex align-items-center mt-4">
            <h5 className="text-muted mt-2">
                <i className="fas fa-comment me-1"></i>
                {message.replyMessages.length} {message.replyMessages.length == 1 ? props.t("Reply") : props.t("Replies")}
            </h5>

            <div className="flex-grow-1" />

            {
                showReplyButtons &&
                <>
                    <div className="me-2">
                        <Button
                            className='rounded-circle'
                            onClick={onTextMessageButtonClick}
                            style={{ background: "#EBF4FF", border: "0", color: "#213384" }}>
                            <i className="fas fa-pen"></i>
                        </Button>
                    </div>

                    {
                        message.originalMessage.messageScope == messageScope.HEALTH ?
                            <>
                                <div className="me-2">
                                    <Button
                                        className='rounded-circle'
                                        onClick={onAudioMessageButtonClick}
                                        style={{ background: "#F9EDFF", border: "0", color: "#762CFB", width: "38px", height: "38px" }}>
                                        <i className="fas fa-microphone"></i>
                                    </Button>
                                </div>
                                <div >
                                    <Button
                                        className='rounded-circle'
                                        onClick={onVideoMessageButtonClick}
                                        style={{ background: "#FFEBF8", border: "0", color: "#FE387B", width: "38px", height: "38px" }}>
                                        <i className="fas fa-video"></i>
                                    </Button>
                                </div>
                            </>
                            :
                            <></>
                    }
                </>
            }
        </div>
    );
}

export default MessageListRowActionBar;