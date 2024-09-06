import React, { useState, useEffect } from "react"
import { Modal, Row, Col, Spinner, FormText } from "reactstrap"
import Switch from "react-switch"
import Select from "react-select"
import { apiErrorToast } from "../../helpers/toastHelper"
import { setSessionEnvironment } from "../../infrastructure/session/useEnvironment"
import contract from "../../assets/images/popupAlerts/ic_urgent_message.png"
import {acceptEmergencyAlert} from "../../infrastructure/services/network/apiCalls/userAgreementApiService"
import { setSessionUserAgreement } from "../../infrastructure/session/useUserSession"
import useUserSession from "../../infrastructure/session/useUserSession";

export const EmergencyAlertModal = ({ props, isOpen, closeCallback }) => {

  const userSession = useUserSession();

  const [emergencyAlertAccepted, setEmergencyAlertAccepted] = useState(false)
  const [isErrorVisible, setIsErrorVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      console.log("EmergencyAlertModal is open")
    }
  }, [isOpen])

  function handleEmergencyAlertToggle() {
    setEmergencyAlertAccepted(!emergencyAlertAccepted)
  }

  function validate() {
    var isValid = emergencyAlertAccepted
    setIsErrorVisible(!isValid)
    return isValid
  }

  function handleContinueButtonClick() {
        handleAcceptEmergencyAlert()
  }

  function handleAcceptEmergencyAlert() {
    if (validate()) {
        acceptEmergencyAlert(
        {
            ProactEmergencyMsgAccepted:emergencyAlertAccepted
        },
        handleSuccessAcceptEmergencyAlert,
        apiErrorToast
      )
    }
  }

  function handleSuccessAcceptEmergencyAlert() {
    setSessionUserAgreement(userSession.userId,null,null,emergencyAlertAccepted);
    reloadMainPage();
   }
  function reloadMainPage() {
    closeCallback()
    props.history.push("/")
  }

  function handleCloseButtonClick() {
    closeCallback()
  }

  return (
    <Modal isOpen={isOpen}>
      <div className="modal-header text-center">
        <h5 className="modal-title mt-0" id="myModalLabel">
          {props.t("UrgentMedicalAdviceTitle")}
        </h5>
{/*         <button
          type="button"
          onClick={handleCloseButtonClick}
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button> */}
      </div>
      <div className="modal-body">
        <form>
          <Row>
            <Col>
              <div className="mb-3 text-center">
                {/* <i className="fas fa-solid fa-file-signature"></i> */}
                <img
                  src={contract}
                  height={100}
                  width={100}
                  alt="urgent_message-logo"
                />
              </div>

              <div className="mb-3">
                <span>{props.t("UrgentMedicalAdviceMessage2")}</span>
              </div>
              <div className="mb-3">
                <span>{props.t("UrgentMedicalAdviceMessage3")}</span>
              </div>
              <div className="d-flex align-items-start mb-3">
                <div className="align-self-center me-3">
                  <label> {props.t("UrgentMedicalAdviceCondition")} </label>
                </div>
                <div className="flex-grow-1 align-self-center">
                  <Switch
                    onChange={handleEmergencyAlertToggle}
                    checked={emergencyAlertAccepted}
                  />
                </div>
              </div>
              <div>
                {isErrorVisible && (
                  <FormText color="danger">
                    {props.t("UrgentMedicalAdviceError")}
                  </FormText>
                )}
              </div>
            </Col>
          </Row>
        </form>
      </div>

      <div className="modal-footer">
        <button
          type="button"
          onClick={handleContinueButtonClick}
          className="btn btn-primary waves-effect waves-light"
        >
          {props.t("Continue")}
        </button>
      </div>
    </Modal>
  )
}
