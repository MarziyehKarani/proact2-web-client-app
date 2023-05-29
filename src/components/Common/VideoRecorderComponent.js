import React from "react";
import { RecordWebcam, useRecordWebcam } from "react-record-webcam";
import { Button, Spinner } from "reactstrap";
import { useEffect } from "react";
import Countdown from "./Countdown";

const OPTIONS = {
    mimeType: 'video/mp4',
    disableLogs: true,
    frameRate: 60,
    recordingLength: 30
};

const VideoPlayerComponent = ({ props, isOpen, onFileGenerated }) => {

    const recordWebcam = useRecordWebcam(OPTIONS);

    useEffect(() => {
        if (isOpen && recordWebcam.status === "CLOSED") {
            recordWebcam.open();
        }

        if (!isOpen && recordWebcam) {
            recordWebcam.close();
        }
    }, [isOpen, recordWebcam]);


    const saveFile = async () => {
        const blob = await recordWebcam.getRecording();
        var file = new File([blob], "patientVideo.mp4", { type: OPTIONS.mimeType });
        Object.assign(file, {
            preview: URL.createObjectURL(file)
        });
        onFileGenerated(file);
    };

    function startRecording() {
        recordWebcam.start();
    }

    function stopRecording() {
        recordWebcam.stop();
    }

    function retakeVideo() {
        recordWebcam.retake();
        onFileGenerated();
    }

    function startButtonVisible() {
        return (recordWebcam.status !== "CLOSED" &&
            recordWebcam.status !== "RECORDING" &&
            recordWebcam.status !== "PREVIEW" &&
            recordWebcam.status !== "INIT")
    }

    function stopButtonIsVisible() {
        return recordWebcam.status === "RECORDING";
    }

    function isInit() {
        return recordWebcam.status === "INIT";
    }

    function isPreview() {
        return recordWebcam.status === "PREVIEW";
    }

    return (
        <div>
            <div>
                <video
                    ref={recordWebcam.webcamRef}
                    style={{
                        height: "auto",
                        width: "100%",
                        display: `${recordWebcam.status === "OPEN" ||
                            recordWebcam.status === "RECORDING"
                            ? "block"
                            : "none"
                            }`
                    }}
                    autoPlay
                />
                <video
                    ref={recordWebcam.previewRef}
                    style={{
                        height: "auto",
                        width: "100%",
                        display: `${recordWebcam.status === "PREVIEW" ? "block" : "none"}`
                    }}
                    autoPlay
                    loop
                />
            </div>
            <div className='text-center'>

                {isInit() &&
                    <div className="m-5 p-6">
                        <Spinner size="lg" color="success" />
                    </div>
                }

                {stopButtonIsVisible() &&
                    <>
                        <Button
                            className='rounded-circle mt-3'
                            color="danger"
                            onClick={stopRecording}
                            style={{ height: "80px", width: "80px", border: "0" }}>
                            <i className="fas fa-stop fa-2x"></i>
                        </Button>
                        <h3 className="text-muted text-center p-2"><Countdown
                            durationInSeconds={OPTIONS.recordingLength}
                            onTimerFinish={() => { }} />
                        </h3>
                    </>
                }

                {startButtonVisible() &&
                    <>
                        <Button
                            className='rounded-circle text-center mt-3'
                            color='danger'
                            onClick={startRecording}
                            style={{ height: "80px", width: "80px", border: "0" }}>
                            <i className="fas fa-video fa-2x"></i>
                        </Button>
                        <h3 className="text-muted text-center p-2">{props.t("TapToStartRecording")}</h3>
                    </>
                }

                {isPreview() &&
                    <div className="m-3">
                        <Button
                            color="info"
                            onClick={retakeVideo}
                            className="btn-rounded px-5 me-4" >{props.t("RetakeVideo")}</Button>
                        <Button
                            color="success"
                            onClick={saveFile}
                            className="btn-rounded px-5" >{props.t("Save")}</Button>
                    </div>
                }

            </div>
        </div>
    );
}

export default VideoPlayerComponent;