import React, { useState, useEffect } from "react"
import { Modal, Row, Col, Spinner, FormText } from "reactstrap"
import Switch from "react-switch"
import Select from "react-select"
import { apiErrorToast  } from "../../helpers/toastHelper"
import getInstitute from "../../infrastructure/services/network/apiCalls/instituteApiService"
import contract from "../../assets/images/popupAlerts/ic_contract_color.png"
import { acceptPolicyConditionsAgreement } from "../../infrastructure/services/network/apiCalls/userAgreementApiService"
import { setSessionUserAgreement } from "../../infrastructure/session/useUserSession"
import useUserSession from "../../infrastructure/session/useUserSession";

export const AcceptPrivacyModal = ({ props, isOpen, closeCallback,continueCallBack }) => {

  const userSession = useUserSession();

  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [conditionsAccepted, setConditionsAccepted] = useState(false)
  const [isErrorVisible, setIsErrorVisible] = useState(false)
  const [privacyURL, setPrivacyURL] = useState(null)
  const [conditionsURL, setConditionsURL] = useState(null)
  const [privacyURLText, setPrivacyURLText] = useState(null)
  const [conditionsURLText, setConditionsURLText] = useState(null)

  useEffect(() => {
    if (isOpen) {
      // console.log("AcceptPrivacyModal is open");
      getInstituteModel(handleSuccessRequest)
    }
  }, [isOpen])

  function handlePrivacyToggle() {
    setPrivacyAccepted(!privacyAccepted)
  }

  function handleConditionsToggle() {
    setConditionsAccepted(!conditionsAccepted)
  }

  function validate() {
    var isValid = privacyAccepted && conditionsAccepted
    setIsErrorVisible(!isValid)
    return isValid
  }

  function handleContinueButtonClick() {
    if(validate())
      {
      handleAcceptAgreement();
      }
  }

  function handleSuccessAcceptAgreement() {
   setSessionUserAgreement(userSession.userId,privacyAccepted,conditionsAccepted,null);
   closeCallback();
 //  reloadMainPage();
  }

  function handleAcceptAgreement() {
      acceptPolicyConditionsAgreement(
        {
          privacyAccepted: privacyAccepted,
          termsConditionsAccepted: conditionsAccepted,
        },
        handleSuccessAcceptAgreement,
        apiErrorToast
      )
  }

  function reloadMainPage() {
    closeCallback()
    props.history.push("/")
  }

  function handleCloseButtonClick() {
    closeCallback()
  }

  function openPrivacyPolicy() {
        openBlankWindow(privacyURL)
  }

  function openTermsConditions() {
        openBlankWindow(conditionsURL)
  }

  function handleSuccessRequest(institute) {
    if (institute != null) {
      console.log(institute.properties)
      setPrivacyURL(institute.properties.privacyPolicy.url)
      setConditionsURL(institute.properties.termsAndConditions.url)
      setPrivacyURLText(institute.properties.privacyPolicy.title)
      setConditionsURLText(institute.properties.termsAndConditions.title)
    }
  }

  function getInstituteModel(handleSuccessRequest) {
  //  showLoadingToast();
    getInstitute(handleSuccessRequest, apiErrorToast)
  }

  function openBlankWindow(url) {
    window.open(url, "_blank")
  }

  return (
    <Modal isOpen={isOpen}>
      <div className="modal-header text-center">
        <h5 className="modal-title mt-0" id="myModalLabel">
          { props.t("TermsAndConditionsAgreeTitle") }
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
              <div className="mb-4 text-center">
                {/* <i className="fas fa-solid fa-file-signature"></i> */}
                <img src={contract} alt="logo" />
              </div>

              <div className="mb-3">
                <span>
                { props.t("TermsAndConditionsAgreeMessage") }
                </span>
              </div>
              <div className="d-flex justify-content-between mb-4">
              <div className="align-self-center me-5">
                  <label>{ props.t("TermsAndConditionsConfirmMessage") }</label>  
                  <br />
                  <a
                    href=""
                    onClick={openPrivacyPolicy}
                  >
                    {privacyURLText}
                  </a>

                  </div>
                  <div className="ml-auto p-2">
                  <Switch
                    onChange={handlePrivacyToggle}
                    checked={privacyAccepted}
                  />
                </div>
                </div>


              <div className="d-flex justify-content-between">
              <div className="align-self-center me-5">
                <label>{ props.t("TermsAndConditionsConfirmMessage") }</label>  
                
                <br />
                <a
                    href=""
                    onClick={openTermsConditions}
                  >
                   {conditionsURLText}
                  </a>
                </div>
                <div className="ml-auto p-2">
                  <Switch
                    onChange={handleConditionsToggle}
                    checked={conditionsAccepted}
                  />
                </div> 
                </div>
              <div>
              {isErrorVisible && !privacyAccepted && (
                  <FormText color="danger">
                    {props.t("PrivacyPolicyError")}
                  </FormText>
                )}
                <br />
                {isErrorVisible && !conditionsAccepted && (
                  <FormText color="danger">
                    {props.t("TermsAndConditionsError")}
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
