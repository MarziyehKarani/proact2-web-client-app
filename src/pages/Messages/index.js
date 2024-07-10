import React, { useState, useEffect } from "react"
import { withTranslation } from "react-i18next"
import { Container, Card, Button, Row, Col, Spinner } from "reactstrap"
import useEnvironment from "../../infrastructure/session/useEnvironment"
import {
  deleteMessage,
  getMessages,
  filterMessagesByPatient,
} from "../../infrastructure/services/network/apiCalls/messagesApiService"
import {
  apiErrorToast,
  showSuccessToast,
  showLoadingToast,
  showErrorToast,
} from "../../helpers/toastHelper"
import { LoadingSpinner } from "../../components/Common/LoadingSpinner"
import MessageListRow from "./Components/MessageListRow"
import { VideoPlayeModal } from "./Components/VideoPlayerModal"
import messageType from "../../constants/messageType"
import BroadcastMessageRow from "./Components/BroadcastMessageRow"
import { NewBroadcastMessageModal } from "./Modals/NewBroadcastMessageModal"
import { NewInfoMessageModal } from "./Modals/NewInfoMessageModal"
import { NewHealthTextMessageModal } from "./Modals/NewHealthTextMessageModal"
import useUserSession from "../../infrastructure/session/useUserSession"
import UserRoles from "../../infrastructure/session/UserRoles"
import NewMessageButtonsRow from "./Components/NewMessageButtonsRow"
import { NewTextReplyMessageModal } from "./Modals/NewTextReplyMessageModal"
import { NewVoiceMessageModal } from "./Modals/NewVoiceMessageModal"
import { NewVideoMessageModal } from "./Modals/NewVideoMessageModal"
import CurrentStudyAndMedicalTeamCard from "../../components/Messages/CurrentStudyAndMedicalTeamCard"
import { getProjectDetails } from "../../infrastructure/services/network/apiCalls/projectsApiService"
import { generateAnalysisPageUrl } from "../../helpers/externalUrlHelper"
import SweetAlert from "react-bootstrap-sweetalert"
import AuthorizedPage from "../../components/AuthorizedPage"
import { Redirect } from "react-router-dom"
import { NewMessageToPatientModal } from "./Modals/NewMessageToPatientModal"
import { EditBroadcastMessageModal } from "./Modals/EditBroadcastMessageModal"
import PatientFilter from "../../components/Common/PatientListAutoCompelete"
import getPatients from "../../infrastructure/services/network/apiCalls/patientsApiService"

const Messages = props => {
  const [initialising, setInitialization] = useState(true)
  const [messages, setMessages] = useState([])
  const [pagingCount, setPagingCount] = useState(0)
  const [isbusy, setIsbusy] = useState(false)
  const [projectProperties, setProjectProperties] = useState()
  const [isVideoEnabled, setIsVideoEnabled] = useState(false)
  const [nextPageButtonVisible, setNextPageButtonVisible] = useState(true)
  const [selectedMessageIdAttachment, setSelectedMessageIdAttachment] =
    useState()
  const [isAttachmentModalVisible, setIsAttachmentModalVisible] =
    useState(false)
  const [
    isNewBroadcastMesageModalVisible,
    setIsNewBroadcastMesageModalVisible,
  ] = useState(false)
  const [isNewInfoMessageModalVisible, setIsNewInfoMessageModalVisible] =
    useState(false)
  const [isNewTextMessageModalVisible, setIsNewTextMessageModalVisible] =
    useState(false)
  const [isNewVoiceMessageModalVisible, setIsNewVoiceMessageModalVisible] =
    useState(false)
  const [isNewVideoMessageModalVisible, setIsNewVideoMessageModalVisible] =
    useState(false)
  const [
    isNewMesageToPatientModalVisible,
    setIsNewMesageToPatientModalVisible,
  ] = useState(false)
  const [selectedMessageId, setSelectedMessageId] = useState()
  const [isNewTextReplyModalVisible, setIsNewTextReplyModalVisible] =
    useState(false)
  const [isVideoReplyModalVisible, setIsVideoReplyModalVisible] =
    useState(false)
  const [isVoiceReplyModalVisible, setIsVoiceReplyModalVisible] =
    useState(false)
  const [isDeleteAlertVisible, setDeleteAlertVisible] = useState(false)
  const [deletingMessageId, setDeletingMessageId] = useState()
  const [
    isEditBroadcastMessageModalVisible,
    setIsEditBroadcastMessageModalVisible,
  ] = useState(false)
  const [editingMessage, setEditingMessage] = useState()
  const [patients, setPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [filterText, setFilterText] = useState(null)
  const [initialLoadCompleted, setInitialLoadCompleted] = useState(false);

  const userSession = useUserSession()
  const environment = useEnvironment()

  const POOL_REQUEST_INTERVAL_IN_SECONDS = 60000

  useEffect(() => {
    if (environment && !initialLoadCompleted) {
      getCurrentProjectProperties()
      loadMessages()
      loadPatients()
      setInitialLoadCompleted(true); // Mark initial load as completed
    }
  }, [environment, initialLoadCompleted])

  useEffect(() => {
    if (initialLoadCompleted) {
      setPagingCount(0) // Reset paging count when patient changes
      loadMessages(true)
    }
  }, [selectedPatient, initialLoadCompleted,filterText])

  useEffect(() => {
    if (pagingCount > 0) {
      loadMessages()
    }
  }, [pagingCount])

  useEffect(() => {
    if (messages) {
      setInitialization(false)
    }

    const interval = initPoolRequest()

    return () => clearInterval(interval)
  }, [messages])

  function loadPatients() {
    getPatients(
      environment.medicalTeamId,
      handleLoadPatientsSuccess,
      apiErrorToast
    )
  }

  function handleLoadPatientsSuccess(data) {
    setPatients(data)
    // if (data != null) setSelectedPatient(data[0]);
  }

  const handlePatientChange = value => {
    setSelectedPatient(value)
  }

  function loadMessages(reset = false) {
    setIsbusy(true)
    if (reset) {
      setMessages([]) // Clear messages when resetting
    }
    if (selectedPatient) {
      filterMessagesByPatient(
        environment.projectId,
        environment.medicalTeamId,
        selectedPatient.userId,
        reset ? 0 : pagingCount,
        handleLoadMessages,
        handleLoadMessagesError
      )
    } else {
      getMessages(
        environment.projectId,
        environment.medicalTeamId,
        reset ? 0 : pagingCount,
        handleLoadMessages,
        handleLoadMessagesError
      )
    }

  }

  function handleLoadMessages(nextMessages) {

    console.log(nextMessages)
    setMessages(prevMessages =>
      pagingCount === 0 ? nextMessages : [...prevMessages, ...nextMessages]
    )

    console.log(filterText)
    if (filterText!=null && filterText!="") {
    filterMessages(filterText)
    }

    setNextPageButtonVisible(nextMessages.length > 0)
    setIsbusy(false)
  }

  function initPoolRequest() {
    const interval = setInterval(() => {
      if (messages.length > 0) {
        performPoolRequest()
      }
    }, POOL_REQUEST_INTERVAL_IN_SECONDS)

    return interval
  }

  function performPoolRequest() {
    if (selectedPatient != null) {
      filterMessagesByPatient(
        environment.projectId,
        environment.medicalTeamId,
        selectedPatient.userId,
        0,
        handlePollRequest,
        handleLoadMessagesError
      )
    } else {
      getMessages(
        environment.projectId,
        environment.medicalTeamId,
        0,
        handlePollRequest,
        handleLoadMessagesError
      )
    }
  }

  function handlePollRequest(newMessages) {
    const updatedMessages = messages.filter(
      m =>
        !newMessages.some(
          newMsg =>
            newMsg.originalMessage.messageId === m.originalMessage.messageId
        )
    )
    setMessages([...newMessages, ...updatedMessages])
  }

  function handleLoadMessagesError(error) {
    apiErrorToast(error)
    setIsbusy(false)
  }

  function loadNextPage() {
    setPagingCount(prevCount => prevCount + 1)
  }

  function handleVideoMessagePlay(messageId) {
    setSelectedMessageIdAttachment(messageId)
    setIsAttachmentModalVisible(true)
  }

  function closeVideoAttachmentModal() {
    setIsAttachmentModalVisible(!isAttachmentModalVisible)
  }

  function handleNewMessage(message) {
    showSuccessToast(props.t("NewMessageAddedd"))
    setMessages(prevMessages => [
      { originalMessage: message, replyMessages: [] },
      ...prevMessages,
    ])
  }

  const delay = async ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  const handleVideoMessage = async message => {
    await delay(30000)
    showSuccessToast(props.t("VideoMessageSentSuccessfullyAlert"))
  }

  function openTextReplyModal(originalMessage) {
    if (checkIfmessageCanBeReplied(originalMessage)) {
      setSelectedMessageId(originalMessage.messageId)
      setIsNewTextReplyModalVisible(true)
    } else {
      ShowCantReplyErrorToast()
    }
  }

  function openVideoReplyModal(originalMessage) {
    if (checkIfmessageCanBeReplied(originalMessage)) {
      setSelectedMessageId(originalMessage.messageId)
      setIsVideoReplyModalVisible(true)
    } else {
      ShowCantReplyErrorToast()
    }
  }

  function openVoiceReplyModal(originalMessage) {
    if (checkIfmessageCanBeReplied(originalMessage)) {
      setSelectedMessageId(originalMessage.messageId)
      setIsVoiceReplyModalVisible(true)
    } else {
      ShowCantReplyErrorToast()
    }
  }

  function ShowCantReplyErrorToast() {
    var title = props.t("CantReplyToMessageAlertTitle")
    var message = props.t("CantReplyToMessageAlertMessage")
    message = message.replace(
      "{0}",
      projectProperties.messageCanBeRepliedAfterMinutes
    )
    showErrorToast(title + " " + message)
  }

  function checkIfmessageCanBeReplied(message) {
    var today = new Date()
    var messageDateTime = new Date(message.createdDateTime)
    var diffMs = today - messageDateTime
    var diffMins = Math.floor(diffMs / 1000 / 60)

    return (
      projectProperties.messageCanBeRepliedAfterMinutes === 0 ||
      diffMins > projectProperties.messageCanBeRepliedAfterMinutes
    )
  }

  function handleNewReply(message) {
    setMessages(prevMessages => {
      return prevMessages.map(msg => {
        if (msg.originalMessage.messageId === message.originalMessageId) {
          return {
            ...msg,
            replyMessages: [...msg.replyMessages, message],
          }
        }
        return msg
      })
    })
    showSuccessToast(props.t("NewMessageAddedd"))
  }

  function getCurrentProjectProperties() {
    getProjectDetails(
      environment.projectId,
      handleProjectPropertiesSuccess,
      apiErrorToast
    )
  }

  function handleProjectPropertiesSuccess(data) {
    setProjectProperties(data.properties)
    setIsVideoEnabled(data.properties.isVideoRecordingActive)
  }

  function openAnalysisInAnalystConsole(message) {
    var url = generateAnalysisPageUrl(
      environment.projectId,
      message.originalMessage.authorId,
      message.originalMessage.messageId
    )
    openBlankWindow(url)
  }

  function openBlankWindow(url) {
    window.open(url, "_blank")
  }

  function handleDeleteButtonClick(message) {
    if (validateMessageDeleting(message)) {
      openDeleteModal(message.messageId)
    } else {
      showErrorToast(props.t("NotDeletableMessageAlertMessage"))
    }
  }

  function handleEditBroadcastButtonClick(message) {
    setIsEditBroadcastMessageModalVisible(true)
    setEditingMessage(message)
  }

  function handleDeleteBroadcastButtonClick(message) {
    if (validateBroadcastMessageDeleting(message)) {
      openDeleteModal(message.messageId)
    } else {
      showErrorToast(props.t("NotDeletableMessageAlertMessage"))
    }
  }

  function openDeleteModal(messageId) {
    setDeletingMessageId(messageId)
    setDeleteAlertVisible(true)
  }

  function validateMessageDeleting(message) {
    var today = new Date()
    var messageDateTime = new Date(message.createdDateTime)
    var diffMs = today - messageDateTime
    var diffMins = Math.floor(diffMs / 1000 / 60)

    return diffMins <= projectProperties.messageCanNotBeDeletedAfterMinutes
  }

  function validateBroadcastMessageDeleting(message) {
    var today = new Date()
    var messageDateTime = new Date(message.createdDateTime)
    var diffMs = today - messageDateTime
    var diffMins = Math.floor(diffMs / 1000 / 60)

    return (
      diffMins <= projectProperties.broadcastMessageCanNotBeDeletedAfterMinutes
    )
  }

  function performDeleteMessage() {
    showLoadingToast()
    var request = {
      projectId: environment.projectId,
      medicalTeamId: environment.medicalTeamId,
      messageId: deletingMessageId,
    }

    deleteMessage(request, handleDeleteMessage, apiErrorToast)
  }

  function handleDeleteMessage() {
    setMessages(prevMessages =>
      prevMessages.filter(
        msg => msg.originalMessage.messageId !== deletingMessageId
      )
    )
    showSuccessToast(props.t("MessageDeleteSuccess"))
  }

  function handleEditMessage(updatedMessage) {
    setMessages(prevMessages => {
      return prevMessages.map(msg => {
        if (msg.originalMessage.messageId === editingMessage.messageId) {
          return {
            ...msg,
            originalMessage: updatedMessage,
          }
        }
        return msg
      })
    })
    showSuccessToast(props.t("MessageEditSuccess"))
  }

  function checkIfMessagingIsEnabled() {
    if (projectProperties && !projectProperties.isMessagingActive) {
      if (userSession.isPatient) {
        return <Redirect to="/surveys/notcompiled/mine" />
      } else if (userSession.isMedicalProfessional) {
        return <Redirect to="/surveys/study" />
      } else {
        return <Redirect to="/unauthorized" />
      }
    }
  }

  function handleFilterValue(filter) {
    setFilterText(filter)
    if (filter === "") {
      loadMessages(true); // Reload all messages when filter is cleared
    } else {
      filterMessages(filter);
    }
  }

  function filterMessages(filter) {

    console.log(filter)
    const filteredMessages = messages.filter(
      m =>
        m.originalMessage.body.toLowerCase().includes(filter.toLowerCase()) ||
      //  m.originalMessage.title.toLowerCase().includes(filter.toLowerCase()) ||
        m.replyMessages.some(r => r.body.toLowerCase().includes(filter.toLowerCase()))
    );
    setMessages(filteredMessages) ;

  }

  return (
    <Container>
      <AuthorizedPage />
      {checkIfMessagingIsEnabled()}

      <Row>
        <Col className="d-flex justify-content-start">
          {userSession && userSession.isMedicalProfessional && (
            <div className="d-flex align-items-center">
              <div className="me-2">
                <Button
                  color="success"
                  onClick={() => setIsNewBroadcastMesageModalVisible(true)}
                >
                  {props.t("NewBroadcastMessageButton")}
                </Button>
              </div>
              <div className="me-2">
                <Button
                  color="info"
                  onClick={() => setIsNewMesageToPatientModalVisible(true)}
                >
                  {props.t("NewMessageToPatientButton")}
                </Button>
              </div>
            </div>
          )}

          {userSession && userSession.isPatient && (
            <NewMessageButtonsRow
              props={props}
              isVideoEnabled={isVideoEnabled}
              onInfoMessageButtonClick={() =>
                setIsNewInfoMessageModalVisible(true)
              }
              onTextMessageButtonClick={() =>
                setIsNewTextMessageModalVisible(true)
              }
              onAudioMessageButtonClick={() =>
                setIsNewVoiceMessageModalVisible(true)
              }
              onVideoMessageButtonClick={() =>
                setIsNewVideoMessageModalVisible(true)
              }
            />
          )}
        </Col>
      </Row>

      <Row className="mt-4">
        {userSession && !userSession.isPatient && (
          <CurrentStudyAndMedicalTeamCard props={props} />
        )}
      </Row>
      <Row className="m-3">
        <div className="col-md-8">
        <PatientFilter  props={props} patients={patients} onChange={handlePatientChange} />
        </div>
      
        <div className="col-md-4 d-flex justify-content-end" >
          <div className="search-box me-2 mb-2 d-inline-block">
            <div className="position-relative">
              <label  className="search-label">
                <span id="search-bar-0-label" className="sr-only">
                  Search this table
                </span>
                <input
                  id="search-bar-0"
                  type="text"
                  className="form-control"
                  placeholder=  {props.t("SearchbarPlaceholder")}   
                  value={filterText || ""}
                  onChange={(e) => handleFilterValue(e.target.value)}
                />
              </label>
              <i className="bx bx-search-alt search-icon"></i>
            </div>
          </div>
        </div>
      </Row>

      {messages.length > 0 ? (
        messages.map((message, idx) =>
          message.originalMessage.messageType !== messageType.BROADCAST ? (
            <MessageListRow
              key={idx}
              props={props}
              message={message}
              showAnalysisCount={
                projectProperties && projectProperties.isAnalystConsoleActive
              }
              patientMenuIsVisible={
                userSession &&
                userSession.userId === message.originalMessage.authorId
              }
              showReplyButtons={userSession && !userSession.isResearcher}
              onVideoAttachmentClick={handleVideoMessagePlay}
              onNewTextReplyClick={() =>
                openTextReplyModal(message.originalMessage)
              }
              onNewVideoReplyClick={() =>
                openVideoReplyModal(message.originalMessage)
              }
              onNewVoiceReplyClick={() =>
                openVoiceReplyModal(message.originalMessage)
              }
              onMessageDeleteButtonClick={() =>
                handleDeleteButtonClick(message.originalMessage)
              }
              onOpenAnalysis={() => openAnalysisInAnalystConsole(message)}
              showVideoReplyButton={userSession && isVideoEnabled}
              showReadIcon={userSession && userSession.isMedicalProfessional}
            />
          ) : (
            <BroadcastMessageRow
              key={idx}
              props={props}
              message={message}
              menuIsVisible={
                userSession &&
                userSession.userId === message.originalMessage.authorId
              }
              onMessageEditButtonClick={() =>
                handleEditBroadcastButtonClick(message.originalMessage)
              }
              onMessageDeleteButtonClick={() =>
                handleDeleteBroadcastButtonClick(message.originalMessage)
              }
            />
          )
        )
      ) : (
        <Card>
          <div className="text-center text-muted m-5 p-5">
            {props.t("EmptyWallMessagesMessage")}
          </div>
        </Card>
      )}

      {initialising ? (
        <LoadingSpinner />
      ) : (
        <>
          {nextPageButtonVisible && (
            <div className="p-3 text-center">
              <Button
                color="success"
                className="btn-rounded px-3"
                onClick={loadNextPage}
              >
                {isbusy && <Spinner size="sm" color="light" className="me-2" />}
                {props.t("LoadMore")}
              </Button>
            </div>
          )}
        </>
      )}

      <VideoPlayeModal
        isOpen={isAttachmentModalVisible}
        closeCallback={closeVideoAttachmentModal}
        messageId={selectedMessageIdAttachment}
      />

      <NewBroadcastMessageModal
        props={props}
        isOpen={isNewBroadcastMesageModalVisible}
        closeCallback={() => setIsNewBroadcastMesageModalVisible(false)}
        successCallback={handleNewMessage}
      />

      <NewMessageToPatientModal
        props={props}
        isOpen={isNewMesageToPatientModalVisible}
        closeCallback={() => setIsNewMesageToPatientModalVisible(false)}
        successCallback={handleNewMessage}
      />

      <NewInfoMessageModal
        props={props}
        isOpen={isNewInfoMessageModalVisible}
        closeCallback={() => setIsNewInfoMessageModalVisible(false)}
        successCallback={handleNewMessage}
      />

      <NewHealthTextMessageModal
        props={props}
        isOpen={isNewTextMessageModalVisible}
        closeCallback={() => setIsNewTextMessageModalVisible(false)}
        successCallback={handleNewMessage}
      />

      <NewVoiceMessageModal
        props={props}
        isOpen={isNewVoiceMessageModalVisible}
        closeCallback={() => setIsNewVoiceMessageModalVisible(false)}
        successCallback={handleNewReply}
      />

      <NewVideoMessageModal
        props={props}
        isOpen={isNewVideoMessageModalVisible}
        closeCallback={() => setIsNewVideoMessageModalVisible(false)}
        successCallback={handleVideoMessage}
      />

      <NewTextReplyMessageModal
        props={props}
        originalMessageId={selectedMessageId}
        isOpen={isNewTextReplyModalVisible}
        closeCallback={() => setIsNewTextReplyModalVisible(false)}
        successCallback={handleNewReply}
      />

      <NewVoiceMessageModal
        props={props}
        isOpen={isVoiceReplyModalVisible}
        originalMessageId={selectedMessageId}
        closeCallback={() => setIsVoiceReplyModalVisible(false)}
        successCallback={handleNewReply}
      />

      <NewVideoMessageModal
        props={props}
        originalMessageId={selectedMessageId}
        isOpen={isVideoReplyModalVisible}
        closeCallback={() => setIsVideoReplyModalVisible(false)}
        successCallback={handleVideoMessage}
      />

      {isDeleteAlertVisible && (
        <SweetAlert
          title={props.t("DeleteMessageDialogMessage")}
          warning
          showCancel
          confirmBtnBsStyle="success"
          cancelBtnBsStyle="danger"
          confirmBtnText={props.t("Ok")}
          cancelBtnText={props.t("Cancel")}
          onConfirm={() => {
            setDeleteAlertVisible(false)
            performDeleteMessage()
          }}
          onCancel={() => setDeleteAlertVisible(false)}
        ></SweetAlert>
      )}

      {isEditBroadcastMessageModalVisible && (
        <EditBroadcastMessageModal
          props={props}
          isOpen={isEditBroadcastMessageModalVisible}
          message={editingMessage}
          closeCallback={() => setIsEditBroadcastMesageModalVisible(false)}
          successCallback={handleEditMessage}
        />
      )}
    </Container>
  )
}

export default withTranslation()(Messages)
