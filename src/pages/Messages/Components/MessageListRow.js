import React from "react"
import { withTranslation } from "react-i18next"
import { Card, CardBody, CardHeader, CardFooter, CardText } from "reactstrap"
import { toLocalDatetime } from "../../../common/formattedDatetime"
import MessageScopeIcon from "../../../components/Messages/MessageScopeIcon"
import MessageMoodIcon from "../../../components/Messages/MessageMoodIcon"
import MessageListRowActionBar from "./MessageListRowActionsBar"
import ReplyListRow from "./ReplyListRow"
import { MessageAttachment } from "./MessageAttachment"
import MessageTypeBadge from "../../../components/Messages/MessageTypeBadge"
import AnalysisCountBadge from "./AnalysisCountBadge"
import PatientMessageDropdownMenu from "./PatientMessageDropdownMenu"
import messageType from "../../../constants/messageType"
import MessageReadIcon from "../../../components/Messages/MessageReadIcon"

const MessageListRow = ({
  props,
  message,
  showAnalysisCount,
  showReplyButtons,
  onVideoAttachmentClick,
  onNewTextReplyClick,
  onNewVoiceReplyClick,
  onNewVideoReplyClick,
  onOpenAnalysis,
  onMessageDeleteButtonClick,
  patientMenuIsVisible,
  showVideoReplyButton,
  showReadIcon,
}) => {
  return (
    <Card className="mb-3">
      <CardHeader className="bg-white">
        <div className="d-flex align-items-center justify-content-between">
          <div className="flex-shrink-0 align-self-center me-3">
            <img
              src={message.originalMessage.avatarUrl}
              className="avatar-sm rounded-circle"
            />
          </div>
          <div className="d-flex align-items-center ">
            <div className="me-3">
              <MessageMoodIcon
                mood={message.originalMessage.emotion}
                height="32"
              />
            </div>
            <div className="me-3">
              <MessageScopeIcon
                scope={message.originalMessage.messageScope}
                iconSizeClass="fa-2x"
              />
            </div>
            {message.originalMessage.isRead &&
              showReadIcon &&
              message.originalMessage.messageType == messageType.PATIENT && (
                <MessageReadIcon iconSizeClass="fa-2x" />
              )}

            {patientMenuIsVisible && (
              <PatientMessageDropdownMenu
                props={props}
                onMessageDeleteButtonClick={onMessageDeleteButtonClick}
              />
            )}
          </div>
        </div>
        <div className="d-flex align-items-center">
          <div className="flex-grow-1">
            <h5 className="font-size-16 mt-0 mb-1">
              {message.originalMessage.authorName}
              <MessageTypeBadge
                props={props}
                type={message.originalMessage.messageType}
              />
              {message.originalMessage.messageType == messageType.MEDIC && (
                <span>
                  {" "}
                  <i
                    className="fa fa-arrow-circle-right"
                    aria-hidden="true"
                  ></i>{" "}
                  {message.originalMessage.recipients[0]}
                </span>
              )}
              {showAnalysisCount && message.originalMessage.hasAnalysis && (
                <a href="#" onClick={onOpenAnalysis}>
                  <AnalysisCountBadge
                    analysisCount={message.originalMessage.analysisCount}
                  />
                </a>
              )}
            </h5>
            <p className="text-muted mb-0">
              {toLocalDatetime(message.originalMessage.createdDateTime)}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <CardText className="text-muted font-size-16">
          {message.originalMessage.body}
        </CardText>
      </CardBody>

      <MessageAttachment
        props={props}
        messageId={message.originalMessage.messageId}
        attachment={message.originalMessage.attachment}
        onClickCallback={onVideoAttachmentClick}
      />

      <CardBody>
        <MessageListRowActionBar
          props={props}
          message={message}
          showReplyButtons={showReplyButtons}
          onTextMessageButtonClick={onNewTextReplyClick}
          onAudioMessageButtonClick={onNewVoiceReplyClick}
          onVideoMessageButtonClick={onNewVideoReplyClick}
          showVideoReplyButton={showVideoReplyButton}
        />
      </CardBody>

      {message.replyMessages && message.replyMessages.length > 0 ? (
        <CardFooter className="bg-white">
          {message.replyMessages.map((reply, idx) => (
            <ReplyListRow
              key={idx}
              props={props}
              reply={reply}
              onVideoAttachmentClick={onVideoAttachmentClick}
              showReadIcon={showReadIcon}
            />
          ))}
        </CardFooter>
      ) : (
        <></>
      )}
    </Card>
  )
}

export default MessageListRow
