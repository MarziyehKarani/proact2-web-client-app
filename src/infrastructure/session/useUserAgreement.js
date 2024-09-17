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
  
    const userSession = useUserSession();

    const userAgreementKey = "userAgreement"
  
    useEffect(() => {
      if (userSession) {
        LoadUserAgreement(userSession.userId);
      }
  }, [userSession]);


  function LoadUserAgreement(userId) {
    var agreement = ReactSession.get(userAgreementKey)
    if (
      typeof agreement === "undefined" ||
      agreement == null ||
      agreement.userId != userId
    ) {
      getUserAgreement()
    }
    else
    {
      var userAgreementStr = JSON.stringify(agreement)
      setUserAgreement(userAgreementStr);
    }
  }

  function addUserAgreementToSession(agreement) {
    if (agreement) {
      var userAgreementStr = JSON.stringify(agreement)
      ReactSession.set(userAgreementKey, userAgreementStr)
      setUserAgreement(agreement);
    } 
  }

  function getUserAgreement() {
    getCurrentUserAgreement(addUserAgreementToSession, errorHandle)
  }

  function errorHandle() {
    apiErrorToast()
    ReactSession.set(loadingKey, false)
  }

    function getSessionUserAgreement() {
      const userAgreementStr = ReactSession.get("userAgreement")
      if (typeof userAgreementStr === "undefined" || userAgreementStr == null) {
         getUserAgreement()
      } else {
        return JSON.parse(userAgreementStr)
      }
    }
return userAgreement;

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
}

export default useUserAgreement
export { setSessionUserAgreement }