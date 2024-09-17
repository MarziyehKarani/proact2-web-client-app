import React from "react"
import { ReactSession } from "react-client-session"
import { apiErrorToast } from "../../helpers/toastHelper"
import UserRoles from "./UserRoles"
import { aquireAccessToken } from "../azure/aquireAccessToken"
import getCurrentUserDetails from "../services/network/apiCalls/usersApiService"
import { useState, useEffect } from "react"
import { getAgreement ,getCurrentUserAgreement } from "../services/network/apiCalls/userAgreementApiService"

const useUserSession = () => {
  const [userSession, setUserSession] = useState(null)

  const userProfileKey = "userProfile"
  const userAgreementKey = "userAgreement"

  aquireAccessToken(loadCurrentUserData)

  function loadCurrentUserData(account) {
    const userProfileStr = ReactSession.get(userProfileKey)
    if (userProfileStr) {
      var user = getSessionUserProfile()
      if (user.accountId == account.localAccountId) {
       /*  if (user.isPatient)
        {
          LoadUserAgreement(user.userId)
        } */
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

  function  LoadUserAgreement(userId)
  {    
    var agreement = ReactSession.get(userAgreementKey)
    if(typeof agreement === "undefined" || agreement == null || agreement.userId!=userId)
    {
      getUserAgreement()
    }


}


  function saveUserProfile(userData) {
    var userDataWithRolers = defineRoles(userData)

  /*   if (userDataWithRolers.isPatient)
    {
      getUserAgreement()
    } */

    var userProfileStr = JSON.stringify(userDataWithRolers);
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


  function setUserAgreement(agreement) {
    if (agreement) {
      var userAgreementStr = JSON.stringify(agreement) 
      ReactSession.set(userAgreementKey, userAgreementStr)
      return agreement;
    }
    else
    {
      return null;
    }
  }

  function getUserAgreement() {
    getCurrentUserAgreement(setUserAgreement, errorHandle)
  }

  return userSession
}

function setSessionUserAgreement(userId,isPolicyAccepted,isConditionsAccepted,isEmergencyAlertAccepted) {
  var agreement = getSessionUserAgreement()
  if(agreement)
  {
    agreement.privacyAccepted = isPolicyAccepted!=null?isPolicyAccepted:agreement.privacyAccepted
    agreement.termsConditionsAccepted = isConditionsAccepted!=null?isConditionsAccepted:agreement.termsConditionsAccepted
    agreement.proactEmergencyMsgAccepted = isEmergencyAlertAccepted!=null?isEmergencyAlertAccepted:agreement.proactEmergencyMsgAccepted
  }
  else
  {
    agreement = {
      userId: userId,
      privacyAccepted: isPolicyAccepted,
      termsConditionsAccepted: isConditionsAccepted,
      proactEmergencyMsgAccepted: isEmergencyAlertAccepted
    }
  }

  var userAgreementStr = JSON.stringify(agreement) 
  ReactSession.set('userAgreement', userAgreementStr)
 }

 function getSessionUserAgreement() {
  const userAgreementStr = ReactSession.get('userAgreement')
  if(userAgreementStr)
    return JSON.parse(userAgreementStr)
  else
  {
    return getUserAgreement();
  }
}



export default useUserSession;
export {setSessionUserAgreement , getSessionUserAgreement} ;
