import React from 'react';
import { useRecordWebcam } from 'react-record-webcam'
import { useEffect, useState } from 'react';
import { Button } from 'reactstrap';

const VideoRecoreder = ({ props, isOpen, onFileGenerated }) => {

    const OPTIONS = {
        mimeType: 'video/mp4',
        disableLogs: true,
        frameRate: 60,
        recordingLength: 30
    };

    const recordWebcam = useRecordWebcam(OPTIONS);
    //const [cameraRef, setCameraRef] = useState();

    useEffect(() => {

        if (isOpen && recordWebcam.status == "CLOSED") {
            //recordWebcam.open();
            //setCameraRef(recordWebcam.webcamRef);
        }

        if (!isOpen && recordWebcam) {
            recordWebcam.close();
        }

    }, [isOpen, recordWebcam]);

    const saveFile = async () => {
        const blob = await recordWebcam.getRecording();
        var file = new File([blob], "patientVideo.mp4", { type: 'video/mp4' });
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
        saveFile();
    }

    return (
        <div>
            <p>Camera status: {recordWebcam.status}</p>
            <video
                width="100%"
                ref={recordWebcam.webcamRef}
                autoPlay
                style={{
                    display: `${recordWebcam.status === "OPEN" ||
                            recordWebcam.status === "RECORDING"
                            ? "block"
                            : "none"
                        }`
                }} />

            <video
               width="100%"
               ref={recordWebcam.webcamRef}
                style={{
                    display: `${recordWebcam.status === "PREVIEW" ? "block" : "none"}`
                }}
                autoPlay
                muted
                loop
            />

            <div className='text-center'>
                {
                    recordWebcam.status == "RECORDING" ?
                        <>
                            <Button
                                className='rounded-circle'
                                color="danger"
                                onClick={stopRecording}
                                style={{ height: "80px", width: "80px", border: "0" }}>
                                <i className="fas fa-stop fa-2x"></i>
                            </Button>
                            <h3 className="text-muted text-center p-2">{props.t("TapToStopRecording")}</h3>
                        </>
                        :
                        <>
                            <Button
                                className='rounded-circle text-center'
                                color='danger'
                                onClick={startRecording}
                                style={{ height: "80px", width: "80px", border: "0" }}>
                                <i className="fas fa-video fa-2x"></i>
                            </Button>
                            <h3 className="text-muted text-center p-2">{props.t("TapToStartRecording")}</h3>
                        </>
                }
            </div>

            {
                recordWebcam.status == "PREVIEW" &&
                <Button onClick={() => recordWebcam.retake()} >Retake</Button>
            }
  <Button onClick={() => recordWebcam.open()} >open</Button>

        </div>
    );
}

export default VideoRecoreder;