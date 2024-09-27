import React from "react"
import { ReactSession } from "react-client-session"
import { apiErrorToast } from "../../helpers/toastHelper"
import { aquireAccessToken } from "../azure/aquireAccessToken"
import { useState, useEffect } from "react"
import useUserSession from './useUserSession';
import {
  getAgreement,
  getCurrentUserAgreement,
} from "../services/network/apiCalls/userAgreementApiService"

 const useUserAgreement = () => {
  
    const [userAgreement, setUserAgreement] = useState();
  
    async function LoadUserAgreement(userId) {
      const agreement = ReactSession.get("userAgreement");
    
      if (!agreement || agreement.userId !== userId) {
         await getUserAgreement(); // Ensure this returns the agreement
      }
      return getSessionUserAgreement();
    }

  function addUserAgreementToSession(agreement) {
    if (agreement) {
      var userAgreementStr = JSON.stringify(agreement)
      ReactSession.set("userAgreement", userAgreementStr)
    } 

  }

  async function getUserAgreement() {
    await getCurrentUserAgreement(addUserAgreementToSession, errorHandle)
  }

  function errorHandle() {
    apiErrorToast()
    ReactSession.set(loadingKey, false)
  }

    function getSessionUserAgreement() {
      const userAgreementStr = ReactSession.get('userAgreement')
      if(userAgreementStr)
        return JSON.parse(userAgreementStr)
      return null;
    }

function setSessionUserAgreement(
  userId,
  isPolicyAccepted,
  isConditionsAccepted,
  isEmergencyAlertAccepted
) {
  var agreement = getSessionUserAgreement()
  if (agreement) {
    agreement.privacyAccepted =
      isPolicyAccepted != null ? isPolicyAccepted : agreement.privacyAccepted
    agreement.termsConditionsAccepted =
      isConditionsAccepted != null
        ? isConditionsAccepted
        : agreement.termsConditionsAccepted
    agreement.proactEmergencyMsgAccepted =
      isEmergencyAlertAccepted != null
        ? isEmergencyAlertAccepted
        : agreement.proactEmergencyMsgAccepted
  } else {
    agreement = {
      userId: userId,
      privacyAccepted: isPolicyAccepted,
      termsConditionsAccepted: isConditionsAccepted,
      proactEmergencyMsgAccepted: isEmergencyAlertAccepted,
    }
  }

  var userAgreementStr = JSON.stringify(agreement)
  ReactSession.set("userAgreement", userAgreementStr)
  setUserAgreement(userAgreementStr);
}

return { userAgreement, setSessionUserAgreement ,LoadUserAgreement };

}

export default useUserAgreement;