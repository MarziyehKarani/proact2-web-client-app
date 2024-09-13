import React, { useState, useEffect } from "react"
import { Modal, Row, Col, Spinner, FormText } from "reactstrap"
import Switch from "react-switch"
import {
  getNotificationSetting,
  setNotificationSetting,
} from "../../infrastructure/services/network/apiCalls/NotificationSettingsApiService"
import { apiErrorToast, showSuccessToast } from "../../helpers/toastHelper"
import "rc-time-picker/assets/index.css"
import TimePicker from "rc-time-picker"
import moment from 'moment';

const NotificationSettingModal = ({ props, isOpen, closeCallback }) => {
  const [isErrorVisible, setIsErrorVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const [notificationEnabled, setNotificationEnabled] = useState(false)
  const [fromTime, setFromTime] = useState(null)
  const [endTime, setEndTime] = useState(null)

  const format = "hh:mm a"

  useEffect(() => {
    if (isOpen) {
      setIsErrorVisible(false)
      loadNotificationSetting()
    }
  }, [isOpen])

  function loadNotificationSetting() {
    getNotificationSetting(
      handleLoadNotificationSettingSuccess,
      handleApiRequestError
    )
  }

  function handleLoadNotificationSettingSuccess(data) {
    if (data != null) {
      setNotificationEnabled(data.active)

      if (data.allDay) {
        setFromTime(null)
        setEndTime(null)
      } else if (data.active) {

        var fTime =moment.utc(data.startAtUtc);
        var eTime = moment.utc(data.stopAtUtc);

        setFromTime(fTime)
        setEndTime(eTime)
      }
      //  setSettings(data);
    }
  }

  function handleActiveNotificationToggle() {
    setNotificationEnabled(!notificationEnabled)
  }

  function handleStartTimeValueChanged(value) {
    console.log(value.format(format))
    setFromTime(value)
  }

  function handleEndTimeValueChanged(value) {
    setEndTime(value)
  }

  function handleApiRequestError(message) {
    apiErrorToast(message)
    // setIsMedicalTeamsBusy(false);
    // setIsProjectsBusy(false);
  }

  function validate() {
    console.log(fromTime)
    console.log(endTime)
    console.log(notificationEnabled)
    var isValid = true
    setIsErrorVisible(false)

    if (fromTime != null && endTime != null) {
      isValid = notificationEnabled
      if (!isValid) {
        setIsErrorVisible(!isValid)
        setErrorMessage(props.t("FillinAllFields"))
        return isValid
      }

      isValid = fromTime < endTime
      if (!isValid) {
        setIsErrorVisible(!isValid)
        setErrorMessage(props.t("PushNotificationsSettingsValidateError"))
        return isValid
      }
    }

    isValid =
      (fromTime != null && endTime != null) ||
      (fromTime == null && endTime == null)
    if (!isValid) {
      setIsErrorVisible(!isValid)
      setErrorMessage(props.t("FillinAllFields"))
    }

    return isValid
  }

  function handleCloseButtonClick() {
    closeCallback()
  }

  function handleChangeButtonClick() {
    if (validate()) {
      const request = prepareRequestBody()
      console.log(request)
      setNotificationSetting(request, apiSuccessHandler, apiErrorToast)

      //  reloadMainPage();
    }
  }

  function apiSuccessHandler(resultData) {
    showSuccessToast(props.t("NotificationSettingsUpdated"))
  }

  function reloadMainPage() {
    handleCloseButtonClick()
    props.history.push("/")
  }

  function prepareRequestBody() {
    const requestBody = {
      active: notificationEnabled,
      allDay: notificationEnabled && fromTime == endTime,
      StartAtUtc: fromTime  ? fromTime.format('HH:mm') : null,
      StopAtUtc: endTime  ? endTime.format('HH:mm') : null,
    }
    return requestBody
  }

  const createDateTime = time => {

    const currentDate = moment();   // Get current date
    const [hours, minutes] = time.format('HH:mm').split(":").map(Number);
    currentDate.set({ hour: hours, minute: minutes, second: 0 });
    return currentDate.utc().format(); // Convert to UTC for saving
  }

  return (
    <Modal size="lg" isOpen={isOpen}>
      <div className="modal-header">
        <h5 className="modal-title mt-0" id="myModalLabel">
          {props.t("NotificationSettingsPageTitle")}
        </h5>
        <button
          type="button"
          onClick={handleCloseButtonClick}
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <form>
          <div>
            <div className="mb-3 d-flex flex-row">
              <label
                htmlFor="example-text-input"
                className="col-form-label"
                style={{ paddingInlineEnd: "150px" }}
              >
                {props.t("AllowNotifications")}
              </label>

              <Switch
                onChange={handleActiveNotificationToggle}
                checked={notificationEnabled}
              />
            </div>

            <div>
              <label
                htmlFor="example-text-input"
                className="col-md-6 col-form-label"
              >
                {props.t("NotificationsReceivingTime")}
              </label>
            </div>
            <div className="row mb-1">
              <div className="col-md-4">
                <lable className="me-2">{props.t("NotificationsTimeFrom")}</lable>
                <TimePicker
                  showSecond={false}
                  value={fromTime}
                  className="xxx m-2"
                  onChange={handleStartTimeValueChanged}
                  format={format}
                  use12Hours
                  inputReadOnly
                />
                
              </div>

              <div className="col-md-4">
                <lable className="me-3">{props.t("NotificationsTimeTo")}</lable>
                <TimePicker
                  showSecond={false}
                  value={endTime}
                  className="xxx m-2"
                  onChange={handleEndTimeValueChanged}
                  format={format}
                  use12Hours
                  inputReadOnly
                />
              </div>
            </div>

            <div>
              {isErrorVisible && (
                <FormText color="danger">{errorMessage}</FormText>
              )}
            </div>
          </div>
        </form>
      </div>

      <div className="modal-footer">
        <button
          type="button"
          onClick={handleChangeButtonClick}
          className="btn btn-primary waves-effect waves-light"
        >
          {props.t("Save")}
        </button>
      </div>
    </Modal>
  )
}

export default NotificationSettingModal
