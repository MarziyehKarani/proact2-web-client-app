import React from "react"
import { RecordWebcam, useRecordWebcam } from "react-record-webcam"
import { Button, Spinner } from "reactstrap"
import { useEffect, useRef, useState } from "react"
import Countdown from "./Countdown"

const videoOptions = {
  mimeType: "video/mp4",
  disableLogs: true,
  frameRate: 60,
  recordingLength: 30,
}

const options = {
  fileName: "patientVideo.mp4",
  fileType: "mp4",
  mimeType: "video/mp4",
}

const VideoPlayerComponent = ({ props, isOpen, onFileGenerated }) => {
  // const recordWebcam = useRecordWebcam(OPTIONS);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    duration: 0,
  })
  const [curRecording, setCurRecording] = useState(null)
  const [recorded, setRecorded] = useState(null)
  const {
    activeRecordings,
    cancelRecording,
    clearAllRecordings,
    clearError,
    clearPreview,
    closeCamera,
    createRecording,
    devicesById,
    devicesByType,
    download,
    errorMessage,
    muteRecording,
    openCamera,
    pauseRecording,
    resumeRecording,
    startRecording,
    stopRecording,
  } = useRecordWebcam({
    options: options,
    mediaRecorderOptions: { mimeType: "video/mp4" },
  })
  //{options: options,
  //   mediaRecorderOptions: { mimeType: 'video/mp4' },
  //   mediaTrackConstraints: { video: true, audio: true ,frameRate: 60 }
  //}

  useEffect(() => {
    if (isOpen) {
      // recordWebcam.open();
      setTimeout(() => {
         start()
      }, 100); // small delay to let layout settle
     
    }

    if (!isOpen) {
      // recordWebcam.close();
      clearError(curRecording.id)
      clearPreview(curRecording.id)
      closeCamera(curRecording.id)
      clearAllRecordings()
      setCurRecording(null)
      setRecorded(null)
    }
  }, [isOpen])

  const start = async () => {
    const recording = await createRecording()
    setCurRecording(recording)
    if (recording) await openCamera(recording.id)
  }

  const saveFile = async () => {
    console.log("saveFile")

    /*  const stream = await navigator.mediaDevices.getUserMedia({video: true});
        const {width, height} = stream.getVideoTracks()[0].getSettings(); */
    console.log(`${dimensions.width}x${dimensions.height}`)

    const blob = recorded.blob //await recordWebcam.getRecording()
    console.log("blob", blob)
    var file = new File([blob], "patientVideo.mp4", {
      type: videoOptions.mimeType,
    })
    Object.assign(file, {
      preview: URL.createObjectURL(file),
    })
    console.log("file", file)
    onFileGenerated(
      file,
      dimensions.width,
      dimensions.height,
      dimensions.duration
    )
  }

  function startVideoRecording() {
    // // recordWebcam.start();
    // const recording = createRecording()

    // // setCurRecording(activeRecordings[0]);
    // console.log("recording", activeRecordings[0])
    // // recording.webcamRef.current.srcObject = webcamRef.current.srcObject;
    // openCamera(recording.id)

    startRecording(curRecording.id)
  }

  async function stopVideoRecording() {
    // recordWebcam.stop();
    console.log("stoprecording")
    const recorded = await stopRecording(curRecording.id)
    setRecorded(recorded)
    console.log("recording", recorded)
    console.log(curRecording.status)
    // recordWebcam.status="PREVIEW";
  }

  function retakeVideo() {
    // recordWebcam.retake();
    clearPreview(curRecording.id)
    startRecording(curRecording.id)

    // onFileGenerated()
  }

  function startButtonVisible(recording) {
    return (
      recording.status !== "CLOSED" &&
      recording.status !== "RECORDING" &&
      // recording.status !== "PREVIEW" &&
      recording.status !== "INITIAL" &&
      !recording.previewRef.current?.src.startsWith("blob:")
    )
  }

  function stopButtonIsVisible(recording) {
    return recording.status === "RECORDING"
  }

  function isInit(recording) {
    return recording.status === "INITIAL"
  }

  function isPreview(recording) {
    return recording.status === "STOPPED"
    // return recording.previewRef.current?.src.startsWith("blob:")
  }

  function replayVideo() {
    curRecording.previewRef.current.play()
  }

  const handleLoadedMetadata = e => {
    const videoElement = e.target
    console.log("videoElement", videoElement)
    setDimensions({
      width: videoElement.videoWidth,
      height: videoElement.videoHeight,
      duration: videoElement.duration,
    })
  }

  return (
    //   <div className="my-2">
    //   <p>{errorMessage ? `Error: ${errorMessage}` : ""}</p>
    //  </div>
    activeRecordings?.length > 0 && (
      <div>
        {/* <Button onClick={start}>Open camera</Button> */}

        {/* <div> */}
        {/* {activeRecordings?.map(recording => (
          <> */}
        <div>
          <video
            ref={activeRecordings[0].webcamRef}
            style={{
              height: "auto",
              width: "100%",
              display: `${
                activeRecordings[0].status === "OPEN" ||
                activeRecordings[0].status === "RECORDING"
                  ? "block"
                  : "none"
              }`,
            }}
            muted
            autoPlay
            playsInline
          />

          <div
      className={`${
        activeRecordings[0].previewRef.current?.src.startsWith("blob:")
          ? "visible"
          : "hidden"
      }`}
    > 
          {/* <p>Preview</p> */}
        
            <video
              ref={activeRecordings[0].previewRef}
              onLoadedMetadata={handleLoadedMetadata}
              style={{
                height: "auto",
                width: "100%",
                display: "block",
              }}
              autoPlay
              playsInline
            />
          </div>
        </div>

        <div className="text-center">

        {isInit(activeRecordings[0]) &&
                    <div className="m-5 p-6">
                        <Spinner size="lg" color="success" />
                    </div>
                }

          {stopButtonIsVisible(activeRecordings[0]) && (
            <>
              <Button
                className="rounded-circle mt-3"
                color="danger"
                onClick={stopVideoRecording}
                style={{ height: "80px", width: "80px", border: "0" }}
              >
                <i className="fas fa-stop fa-2x"></i>
              </Button>
              <h3 className="text-muted text-center p-2">
                <Countdown
                  durationInSeconds={videoOptions.recordingLength}
                  onTimerFinish={stopVideoRecording}
                />
              </h3>
            </>
          )}

          {startButtonVisible(activeRecordings[0]) && (
            <>
              <Button
                className="rounded-circle text-center mt-3"
                color="danger"
                onClick={startVideoRecording}
                style={{ height: "80px", width: "80px", border: "0" }}
              >
                <i className="fas fa-video fa-2x"></i>
              </Button>
              <h3 className="text-muted text-center p-2">
                {props.t("TapToStartRecording")}
              </h3>
            </>
          )}

          {isPreview(activeRecordings[0]) && (
            <div className="m-3">
              <Button
                color="info"
                onClick={retakeVideo}
                className="btn-rounded px-5 me-4"
              >
                {props.t("RetakeVideo")}
              </Button>
              <Button
                color="primary"
                onClick={replayVideo}
                className="btn-rounded px-5 me-4"
              >
                {props.t("ReplayVideo")}
              </Button>
              <Button
                color="success"
                onClick={saveFile}
                className="btn-rounded px-5"
              >
                {props.t("Save")}
              </Button>
            </div>
          )}
        </div>
      </div>
    )
    // </div>
  )
}

export default VideoPlayerComponent
