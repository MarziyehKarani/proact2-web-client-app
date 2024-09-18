import React from "react"
import { ReactSession } from "react-client-session"
import { apiErrorToast } from "../../helpers/toastHelper"
import UserRoles from "./UserRoles"
import { aquireAccessToken } from "../azure/aquireAccessToken"
import getCurrentUserDetails from "../services/network/apiCalls/usersApiService"
import { useState, useEffect } from "react"

const useUserSession = () => {
  const [userSession, setUserSession] = useState(null)

  const userProfileKey = "userProfile"

  aquireAccessToken(loadCurrentUserData)

  function loadCurrentUserData(account) {
    const userProfileStr = ReactSession.get(userProfileKey)
    if (userProfileStr) {
      var user = getSessionUserProfile()
      if (user.accountId == account.localAccountId) {
        /*  if (user.isPatient)
        {
          LoadUserAgreement(user.userId)
          user.setAgreement=true;
        }  */
        setUserSession(user)
      } else {
        loadUserProfile()
      }
    } else {
      loadUserProfile()
    }
  }

  function loadUserProfile() {
    getCurrentUserDetails(saveUserProfile, errorHandle)
  }

  function LoadUserAgreement(userId) {
    var agreement = ReactSession.get("userAgreement")
    if (
      typeof agreement === "undefined" ||
      agreement == null ||
      agreement.userId != userId
    ) {
      getUserAgreement()
    }
  }

  function saveUserProfile(userData) {
    var userDataWithRolers = defineRoles(userData)

   /*  if (userDataWithRolers.isPatient)
    {
      getUserAgreement()
      userDataWithRolers.setAgreement=true;
    } */ 

    var userProfileStr = JSON.stringify(userDataWithRolers)
    ReactSession.set(userProfileKey, userProfileStr)
    setUserSession(userDataWithRolers)
  }

  function errorHandle() {
    apiErrorToast()
    ReactSession.set(loadingKey, false)
  }

  function getSessionUserProfile() {
    const userProfileStr = ReactSession.get(userProfileKey)
    return JSON.parse(userProfileStr)
  }

  function defineRoles(userData) {
    userData.isPatient = userData.roles.includes(UserRoles.Patient)
    userData.isResearcher = userData.roles.includes(UserRoles.Researcher)
    userData.isDataManager = userData.roles.includes(
      UserRoles.MedicalTeamDataManager
    )
    userData.isMedicalProfessional =
      userData.roles.includes(UserRoles.MedicalProfessional) ||
      userData.roles.includes(UserRoles.Nurse)

    return userData
  }

 /*  function setUserAgreement(agreement) {
    if (agreement) {
      var userAgreementStr = JSON.stringify(agreement)
      ReactSession.set("userAgreement", userAgreementStr)
      return agreement
    } else {
      return null
    }
  }

  function getUserAgreement() {
    getCurrentUserAgreement(setUserAgreement, errorHandle)
  } */

  return userSession
}

export default useUserSession

