import React from "react"
import { ReactSession } from "react-client-session"
import { apiErrorToast } from "../../helpers/toastHelper"
import UserRoles from "./UserRoles"
import getCurrentUserDetails from "../services/network/apiCalls/usersApiService"
import { useState, useEffect, useRef } from "react"
import { msalInstance , Logout} from "../../index"
import userSubscriptionState from "../../constants/userSubscriptionState"

const userProfileKey = "userProfile"
const useUserSession = () => {
  // console.log("useUserSession: start")
  const [userSession, setUserSession] = useState(null)

  useEffect(() => {
    if (!userSession) {
      const accounts = msalInstance.getAllAccounts()
      loadCurrentUserData(accounts[0])
    }
  }, [userSession])

  //  // Update the previous user state on each change
  //  useEffect(() => {
  //   previousUserStateRef.current = userState
  // }, [userState])

  function loadCurrentUserData(account) {
    const userProfileStr = ReactSession.get(userProfileKey)
    if (userProfileStr) {
      var user = getSessionUserProfile()
      if (account != null && user.accountId == account.localAccountId) {

        if (user.expiresOn > new Date().getTime()) {
          setUserSession(user)
          //  console.log("loadCurrentUserData.user.state: " + user.state)
        } else {
          //  console.log("loadCurrentUserData.expiresOn " + userState)
          loadUserProfile()
        }
      } else {
        // setUserState(null)

        ReactSession.remove("userAgreement")
        loadUserProfile()
      }
    } else {
      //  setUserState(null)
      loadUserProfile()
    }
  }

  function loadUserProfile() {
    ReactSession.remove(userProfileKey)
    getCurrentUserDetails(saveUserProfile, errorHandle)
  }

  function saveUserProfile(userData) {
    // console.log("Previous userState: " + previousUserStateRef.current)
    // console.log("Current userData.state: " + userData.state)

    if (
      // previousUserStateRef.current != null &&
      // previousUserStateRef.current !=userData.state
      userData.state == userSubscriptionState.Deactivated &&
      msalInstance.getAllAccounts().length > 0
    ) {
      Logout();
    }

    var userDataWithRolers = defineRoles(userData)

    userDataWithRolers.expiresOn = new Date().getTime() + 60000

    var userProfileStr = JSON.stringify(userDataWithRolers)

    ReactSession.set(userProfileKey, userProfileStr)

    setUserSession(userDataWithRolers)
    // previousUserStateRef.current = userData.state
  }

  function errorHandle(error) {
    apiErrorToast(error)
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

  // const handleLogout = () => {
  //   msalInstance.logoutRedirect();
  //     return;
  // }


  return userSession
}

export default useUserSession
