import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// default avatar
import avatar from "../../../assets/images/users/avatar.png"
//Azure b2c
import { useMsal } from "@azure/msal-react";
import useUserSession from "../../../infrastructure/session/useUserSession"
import ProfileMenuPatientContent from "./ProfileMenuPatientContent"
import UserRoles from "../../../infrastructure/session/UserRoles"
import { ChangeStudyModal } from "../../Common/ChangeStudyModal";
import { getAnalystConsoleBaseUrl, getControlPanelBaseUrl } from "../../../helpers/externalUrlHelper"

const ProfileMenu = props => {

  const userSession = useUserSession();

  const [menu, setMenu] = useState(false)
  const { instance, accounts } = useMsal();
  const [profileImage, setProfileImage] = useState(avatar);
  const [isChangeStudyModalOpen, setIsChangeStudyModalOpen] = useState(false);

  const handleLogout = () => {
    instance.logoutPopup({ postLogoutRedirectUri: "/signout", mainWindowRedirectUri: "/" })
  }

  function currentUserIsMedicalProfesional() {
    return (userSession &&
      (userSession.roles.includes(UserRoles.MedicalProfessional)
        || userSession.roles.includes(UserRoles.Nurse))
    );
  }

  function currentUserIsPatient() {
    return userSession && userSession.roles.includes(UserRoles.Patient);
  }

  function currentUserIsResearcher() {
    return userSession && userSession.roles.includes(UserRoles.Researcher);
  }

  function openAnalystConsole(){
    var url = getAnalystConsoleBaseUrl();
    openBlankWindow(url);
  }

  function openControlPanel(){
    var url = getControlPanelBaseUrl();
    openBlankWindow(url);
  }

  function openBlankWindow(url) {
    window.open(url, "_blank")
  }

  useEffect(() => {
    if (userSession) {
      setProfileImage(userSession.avatarUrl);
    }
  }, [userSession]);

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={profileImage}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ms-1 fw-medium font-size-15">{accounts != null && accounts.length > 0 ? accounts[0].name : ""}</span>{" "}
          <i className="uil-angle-down d-none d-xl-inline-block font-size-15"></i>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">

          {currentUserIsPatient() &&
            <ProfileMenuPatientContent
              props={props} />
          }

          {currentUserIsMedicalProfesional() &&
            <>
              <DropdownItem header>{props.t("MedicalTeamGroupTitle")}</DropdownItem>
              <DropdownItem
                onClick={() => setIsChangeStudyModalOpen(true)}>
                <i className="fas fa-exchange-alt font-size-18 align-middle me-2 text-muted"></i>
                <span>{props.t("ChangeMedicalTeamAndTrialTitle")}</span>
              </DropdownItem>
              <Link to="/patients" className="dropdown-item">
                <i className="fas fa-hospital-user font-size-18 align-middle me-2 text-muted"></i>
                <span>{props.t("YourPatientsTitle")}</span>
              </Link>

              <DropdownItem header>{props.t("SurveysGroupTitle")}</DropdownItem>
              <Link to="/surveys/study" className="dropdown-item">
                <i className="fas fa-chart-bar font-size-18 align-middle me-2 text-muted"></i>
                <span>{props.t("SurveysResultsAndStatistics")}</span>
              </Link>
              <DropdownItem header>{props.t("ProactTools")}</DropdownItem>
              <DropdownItem onClick={openControlPanel}>
                <i className="fas fa-cogs font-size-18 align-middle me-2 text-muted"></i>
                <span>{props.t("OpenControlPanel")}</span>
              </DropdownItem>
              <DropdownItem onClick={openAnalystConsole}>
                <i className="fas fa-file-medical-alt font-size-18 align-middle me-2 text-muted"></i>
                <span>{props.t("OpenAnalystConsole")}</span>
              </DropdownItem>
            </>

          }

          {currentUserIsResearcher() &&
            <>
              <DropdownItem header>{props.t("MedicalTeamGroupTitle")}</DropdownItem>
              <DropdownItem
                onClick={() => setIsChangeStudyModalOpen(true)}>
                <i className="fas fa-exchange-alt font-size-18 align-middle me-2 text-muted"></i>
                <span>{props.t("ChangeMedicalTeamAndTrialTitle")}</span>
              </DropdownItem>
              <DropdownItem header>{props.t("ProactTools")}</DropdownItem>
              <DropdownItem onClick={openAnalystConsole}>
                <i className="fas fa-file-medical-alt font-size-18 align-middle me-2 text-muted"></i>
                <span>{props.t("OpenAnalystConsole")}</span>
              </DropdownItem>
            </>
          }

          <DropdownItem divider />
          <Link to="#" onClick={handleLogout} className="dropdown-item text-danger">
            <i className="fas fa-sign-out-alt font-size-18 align-middle me-2"></i>
            <span>{props.t("ExitTitle")}</span>
          </Link>

        </DropdownMenu>
      </Dropdown>
      <ChangeStudyModal
        props={props}
        isOpen={isChangeStudyModalOpen}
        closeCallback={() => { setIsChangeStudyModalOpen(false) }}
      />
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
)
