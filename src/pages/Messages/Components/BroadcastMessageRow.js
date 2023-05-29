import React from 'react';
import { Card, CardHeader, CardBody, CardText } from 'reactstrap';
import { toLocalDatetime } from '../../../common/formattedDatetime';

const BroadcastMessageRow = ({ props, message }) => {
    return (
        <Card
            className='mb-3'
            outline="false"
            style={{ background: "#C3F8F5" }}>
            <CardBody>
                <p >
                    <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 align-self-center me-3">
                            <img
                                src={message.originalMessage.avatarUrl}
                                className="avatar-sm rounded-circle"
                            />
                        </div>
                        <div className="flex-grow-1">
                            <h5 className="font-size-16 mt-0 mb-1">
                                {message.originalMessage.authorName}
                            </h5>
                            <p className="text-muted mb-0">
                                {toLocalDatetime(message.originalMessage.createdDateTime)}
                            </p>
                        </div>
                    </div>
                </p>
                <CardText tag="h5" className='text-muted'>{message.originalMessage.title}</CardText>
                <CardText tag="h6" className='text-muted'>{message.originalMessage.body}</CardText>
            </CardBody>
        </Card>
    );
}

export default BroadcastMessageRow;