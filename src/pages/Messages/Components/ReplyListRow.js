import React from 'react';
import { toLocalDatetime } from '../../../common/formattedDatetime';
import { Attachment } from './MessageAttachment';
import { ReplyAttachment } from './ReplyAttachment';
import { Row, Badge } from 'reactstrap';
import MessageTypeBadge from '../../../components/Messages/MessageTypeBadge';

const ReplyListRow = ({ props, reply, onVideoAttachmentClick }) => {
    return (
        <div>
            <div className="d-flex align-items-start">
                <div className="flex-shrink-0 align-self-center me-3">
                    <img
                        src={reply.avatarUrl}
                        className="avatar-xs rounded-circle"
                    />
                </div>
                <div className="flex-grow-1 align-self-center">
                    <h5 className="font-size-14 mt-0 mb-1">
                        {reply.authorName} <MessageTypeBadge props={props} type={reply.messageType} />
                    </h5>
                </div>
                <p className="text-muted mb-0 align-self-center">
                    {toLocalDatetime(reply.createdDateTime)}
                </p>
            </div>
            <p className='text-muted my-3'>
                {reply.body}
            </p>
            <Row>
                <div className='col-3'>
                    <ReplyAttachment
                        props={props}
                        messageId={reply.messageId}
                        attachment={reply.attachment}
                        onClickCallback={onVideoAttachmentClick} />
                </div>
            </Row>
            <hr />
        </div>

    );
}

export default ReplyListRow;