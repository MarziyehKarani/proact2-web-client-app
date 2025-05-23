import React from "react"
import { toLocalDatetime } from "../../../common/formattedDatetime"
import { Attachment } from "./MessageAttachment"
import { ReplyAttachment } from "./ReplyAttachment"
import { Row, Badge } from "reactstrap"
import MessageTypeBadge from "../../../components/Messages/MessageTypeBadge"
import messageType from "../../../constants/messageType"
import MessageReadIcon from "../../../components/Messages/MessageReadIcon"

const ReplyListRow = ({
  props,
  reply,
  onVideoAttachmentClick,
  showReadIcon,
}) => {
  return (
    <div>
      <div className="d-flex align-items-start justify-content-between">
        <div className="flex-shrink-0 align-self-center me-3">
          <img src={reply.avatarUrl} className="avatar-xs rounded-circle" />
        </div>
        {reply.isRead &&
          reply.messageType == messageType.PATIENT &&
          showReadIcon && <MessageReadIcon />}
      </div>
      <div className="d-flex align-items-center">
        <div className="flex-grow-1">
          <h5 className="font-size-14 mt-0 mb-1">
            {reply.authorName}{" "}
            <MessageTypeBadge props={props} type={reply.messageType} />
          </h5>
       
        <p className="text-muted mb-0 align-self-center">
          {toLocalDatetime(reply.createdDateTime)}
        </p>
        </div>
      </div>
      <p className="text-muted my-3">{reply.body}</p>
      <Row>
        <div className="col-3">
          <ReplyAttachment
            props={props}
            messageId={reply.messageId}
            attachment={reply.attachment}
            onClickCallback={onVideoAttachmentClick}
          />
        </div>
      </Row>
      <hr />
    </div>
  )
}

export default ReplyListRow
