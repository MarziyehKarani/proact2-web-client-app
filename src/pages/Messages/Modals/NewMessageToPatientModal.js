import React from "react";
import { useState,useEffect } from "react";
import { Modal, Row, Col, Input, FormText } from "reactstrap";
import { showLoadingToast, apiErrorToast } from "../../../helpers/toastHelper";
import TextareaWithMaxlength from "../../../components/Common/TextareaWithMaxlength";
import useEnvironment from "../../../infrastructure/session/useEnvironment";
import { createMessagebyMedic } from "../../../infrastructure/services/network/apiCalls/messagesApiService";
import PatientFilter from "../../../components/Common/PatientListAutoCompelete";
import getPatients from '../../../infrastructure/services/network/apiCalls/patientsApiService';

export const NewMessageToPatientModal = ({ props, isOpen, closeCallback, successCallback }) => {

    const [isTitleErrorVisible, setIsTitleErrorVisible] = useState();
    const [isBodyErrorVisible, setIsBodyErrorVisible] = useState();
    const [title, setTitle] = useState();
    const [body, setBody] = useState();
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patients, setPatients] = useState([]);

    const environment = useEnvironment();

    useEffect(() => {
        if (environment)  {
              loadPatients();
          }
      }, [environment]);
  
      function loadPatients() {
          getPatients(
              environment.medicalTeamId,
              handleLoadPatientsSuccess,
              apiErrorToast);
      }

      function handleLoadPatientsSuccess(data) {
           setPatients(data);
           if(data != null)
                setSelectedPatient(data[0]);
       }
  

    const bodyMaxLength = 1000;
    
    function prepareRequestBody() {
        const requestBody = {
            title: title,
            body: body,
            emotion: 0,
            messageScope: 0,
            hasAttachment: false,
            projectId: environment.projectId,
            medicalTeamId: environment.medicalTeamId,
            patientId:selectedPatient.userId
        }
        return requestBody;
    }

    function sendMessageToPatient() {
        if (ValidateForm()) {
            showLoadingToast();
            const request = prepareRequestBody();
            createMessagebyMedic(request, apiSuccessHandler, apiErrorToast);
        }
    }

    function apiSuccessHandler(resultData) {
        if (successCallback != null) {
            closeModalHandler();
            successCallback(resultData);
        }
    }

    function ValidateForm() {
        var isValid = true;
        if (!title || title == '') {
            isValid = false;
            setIsTitleErrorVisible(true);
        }
        if (!body || body == '') {
            isValid = false;
            setIsBodyErrorVisible(true);
        }
        return isValid;
    }

    function resetForm() {
        setTitle();
        setBody();
        setIsTitleErrorVisible(false);
        setIsBodyErrorVisible(false);
    }

    function closeModalHandler() {
        resetForm();
        closeCallback();
    }

    const handlePatientChange = (value) => {
        console.log(value);
        setSelectedPatient(value);
      };

    return (
        <Modal
            size="lg"
            isOpen={isOpen} >
            <div className="modal-header">
                <h5 className="modal-title mt-0" id="myModalLabel">
                    {props.t("MessageToPatientPageTitle")}
                </h5>
                <button
                    type="button"
                    onClick={closeModalHandler}
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <form>
                    <Row>
                        <Col>
                        <Row className="mb-3">
                            <div className="col-md-4">

                                <label
                                    htmlFor="example-text-input"
                                    className="col-md-4 col-form-label" >
                                    {props.t("Patient")}
                                </label>
                            </div>
                            <div className="col-md-8">
                                <PatientFilter props={props} patients={patients} onChange={handlePatientChange}></PatientFilter>
                            </div>
                            </Row>
                            <Row className="mb-3">
                                <label
                                    htmlFor="example-text-input"
                                    className="col-md-4 col-form-label" >
                                    {props.t("Title")}
                                </label>
                                <div className="col-md-8">
                                    <Input
                                        id="title"
                                        className="form-control col-md-8"
                                        type="text"
                                        onInput={e => setTitle(e.target.value)}
                                        value={title} />
                                    {isTitleErrorVisible ? <FormText color="danger">{props.t("RequiredField")}</FormText> : null}
                                </div>
                            </Row>

                            <Row className="mb-5">
                                <label
                                    htmlFor="example-text-input"
                                    className="col-md-4 col-form-label">
                                    {props.t("BodyMessage")}
                                </label>
                                <div className="col-md-8">
                                    <TextareaWithMaxlength
                                        id="body"
                                        maxLength={bodyMaxLength}
                                        value={body}
                                        rows="5"
                                        onChange={e => setBody(e.target.value)}
                                    />
                                    {isBodyErrorVisible ? <FormText color="danger">{props.t("RequiredField")}</FormText> : null}
                                </div>
                            </Row>

                        </Col>
                    </Row>
                </form>
            </div>

            <div className="modal-footer">
                <button
                    type="button"
                    onClick={() => {
                        sendMessageToPatient();
                    }}
                    className="btn btn-primary waves-effect waves-light"
                >
                    {props.t("NewTextMessageSubmitButtonText")}
                </button>
            </div>
        </Modal>
    );
}