import React, { useState, useEffect } from "react"
import { DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import getProtocols from "../../../infrastructure/services/network/apiCalls/protocolApiService"
import getInstitute from "../../../infrastructure/services/network/apiCalls/instituteApiService"
//import useUserSession from "../../../infrastructure/session/useUserSession"
//import NotificationSettingModal from "../../Common/NotificationSettingModal"

import {
    apiErrorToast,
    showLoadingToast,
    closeToast
  } from "../../../helpers/toastHelper"

const ProfileMenuPatientContent = ({ props , openNotificationSetting }) => {

   // const userSession = useUserSession();

   // const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

    function getPatientsProtocols() {
        showLoadingToast();
        getProtocols(handleProtocolsRequestSuccess, apiErrorToast);
    }

    function handleProtocolsRequestSuccess(protocols) {
        closeToast();
        var url = protocols.projectProtocol.url;
        openBlankWindow(url);
    }

    function getInstituteModel(handleSuccessRequest) {
        showLoadingToast();
        getInstitute(handleSuccessRequest, apiErrorToast);
    }

    function handleTermsAndConditionsRequestSuccess(institute) {
        closeToast();
        openBlankWindow(institute.properties.termsAndConditions.url);
    }

    function handlePrivacyPolicyRequestSuccess(institute) {
        closeToast();
        openBlankWindow(institute.properties.privacyPolicy.url);
    }

    function openBlankWindow(url) {
        window.open(url, "_blank")
    }

    return (
        <>
            <DropdownItem header>{props.t("SurveysGroupTitle")}</DropdownItem>
            <Link to="/surveys/notcompiled/mine" className="dropdown-item">
                <i className="fas fa-file-alt font-size-18 align-middle me-2 text-muted"></i>
                <span>{props.t("ToBeCompletedSurveysPageTitle")}</span>
            </Link>
            <Link to="/surveys/compiled/mine" className="dropdown-item">
                <i className="fas fa-archive font-size-18 align-middle me-2 text-muted"></i>
                <span>{props.t("CompletedSurveysPageTitle")}</span>
            </Link>

            <DropdownItem header>{props.t("ProtocolDetailsGroupTitle")}</DropdownItem>
            <DropdownItem onClick={getPatientsProtocols}>
                <i className="fas fa-paste font-size-18 align-middle me-2 text-muted"></i>
                <span>{props.t("ShowProtocol")}</span>
            </DropdownItem>

            <DropdownItem header>{props.t("NotificationsGroupTitle")}</DropdownItem>
              <DropdownItem
                onClick={() => openNotificationSetting()}>
                <i className="fas fa-bell font-size-18 align-middle me-2 text-muted"></i>
                <span>{props.t("NotificationSettingsPageTitle")}</span>
              </DropdownItem>

            <DropdownItem header>{props.t("HelpDeskGroupTitle")}</DropdownItem>
            <Link to="/contact" className="dropdown-item">
                <i className="fas fa-question-circle font-size-18 align-middle me-2 text-muted"></i>
                <span>{props.t("ContactTitle")}</span>
            </Link>

            <DropdownItem header>{props.t("ProactInfoGroupTitle")}</DropdownItem>
            <DropdownItem onClick={() => getInstituteModel(handleTermsAndConditionsRequestSuccess)}>
                <i className="fas fa-file-contract font-size-18 align-middle me-2 text-muted"></i>
                <span>{props.t("TermsAndConditionsTitle")}</span>
            </DropdownItem>
            <DropdownItem onClick={() => getInstituteModel(handlePrivacyPolicyRequestSuccess)}>
                <i className="fas fa-file-contract font-size-18 align-middle me-2 text-muted"></i>
                <span>{props.t("PrivacyPolicyTitle")}</span>
            </DropdownItem>

   {/*  {isNotificationModalOpen && 
        <NotificationSettingModal
        props={props}
        isOpen={isNotificationModalOpen}
        closeCallback={() => { setIsNotificationModalOpen(false) }}
      />
   } */}
        </>
    );
}

export default ProfileMenuPatientContent;