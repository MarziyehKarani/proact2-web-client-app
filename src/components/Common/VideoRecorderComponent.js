import React from "react";
import { RecordWebcam, useRecordWebcam } from "react-record-webcam";
import { Button, Spinner } from "reactstrap";
import { useEffect,useRef,useState } from "react";
import Countdown from "./Countdown";

const OPTIONS = {
    mimeType: 'video/mp4',
    disableLogs: true,
    frameRate: 60,
    recordingLength: 30
};

const VideoPlayerComponent = ({ props, isOpen, onFileGenerated }) => {

   // const recordWebcam = useRecordWebcam(OPTIONS);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0, duration:0 });

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
        } = useRecordWebcam();

    const {curRecording,setCurRecording} = useState(null);

   
   // const webcamRef = useRef(null);
    

  useEffect(async () => {
        if (isOpen) {
            // recordWebcam.open();
           await start();
        }

        if (!isOpen) {
           // recordWebcam.close();
           closeCamera(activeRecordings[0].id);
        }
    }, [isOpen]);


    const quickDemo = async () => {
        try {
          const recording = await createRecording();
          if (!recording) return;
          await openCamera(recording.id);
          await startRecording(recording.id);
          await new Promise((resolve) => setTimeout(resolve, 3000));
          await stopRecording(recording.id);
          await closeCamera(recording.id);
        } catch (error) {
          console.log({ error });
        }
      };

      const start = async () => {
        const recording = await createRecording();
        if (recording) await openCamera(recording.id);
      };
    

    const saveFile = async () => {
        console.log("saveFile");

       /*  const stream = await navigator.mediaDevices.getUserMedia({video: true});
        const {width, height} = stream.getVideoTracks()[0].getSettings(); */
        console.log(`${dimensions.width}x${dimensions.height}`); 

        const blob = await recordWebcam.getRecording();
        var file = new File([blob], "patientVideo.mp4", { type: OPTIONS.mimeType });
        Object.assign(file, {
            preview: URL.createObjectURL(file)
        });
        onFileGenerated(file,dimensions.width, dimensions.height, dimensions.duration);
    };

    function startVideoRecording() {
       // recordWebcam.start();
       const recording =  createRecording();
      
      // setCurRecording(activeRecordings[0]);
       console.log("recording",activeRecordings[0]);
      // recording.webcamRef.current.srcObject = webcamRef.current.srcObject;
        openCamera(recording.id);

       startRecording(recording.id);
    }

     function stopVideoRecording() {
       // recordWebcam.stop();
       console.log("stoprecording");
       const recorded = stopRecording(activeRecordings[0].id);
       console.log("recording",recorded);
       // recordWebcam.status="PREVIEW";
    }

    function retakeVideo() {
       // recordWebcam.retake();
        onFileGenerated();
    }

    function startButtonVisible() {
        return (activeRecordings[0].status !== "CLOSED" &&
            activeRecordings[0].status !== "RECORDING" &&
            activeRecordings[0].status !== "PREVIEW" &&
            activeRecordings[0].status !== "INIT")
    }

    function stopButtonIsVisible() {
        return activeRecordings[0].status === "RECORDING";
    }

    function isInit() {
        return activeRecordings[0].status === "INIT";
    }

    function isPreview() {
        return activeRecordings[0].status === "PREVIEW";
    }

    function replayVideo() {
        activeRecordings[0].previewRef.current.play();
    }

    const handleLoadedMetadata = (e) => {
        const videoElement = e.target;
        setDimensions({
          width: videoElement.videoWidth,
          height: videoElement.videoHeight,
          duration: videoElement.duration,
        });
      };

    return (
<div>
        <div className="space-x-2">
        <Button onClick={quickDemo}>Record 3s video</Button>
        <Button onClick={start}>Open camera</Button>
        <Button onClick={() => clearAllRecordings()}>Clear all</Button>
        <Button onClick={() => clearError()}>Clear error</Button>
      </div>
      <div className="my-2">
        <p>{errorMessage ? `Error: ${errorMessage}` : ''}</p>
      </div>
        
      <div className="grid grid-cols-custom gap-4 my-4">
        {activeRecordings?.map((recording) => (
          <div className="bg-white rounded-lg px-4 py-4" key={recording.id}>
            <div className="text-black grid grid-cols-1">
              <p>Live</p>
              <small>Status: {recording.status}</small>
              <small>Video: {recording.videoLabel}</small>
              <small>Audio: {recording.audioLabel}</small>
            </div>
            <video ref={recording.webcamRef}  
            style={{
                        height: "auto",
                        width: "100%",
                        display: "block"
                    }} loop autoPlay playsInline />
            <div className="space-x-1 space-y-1 my-2">
              <Button
                inverted
                disabled={
                  recording.status === 'RECORDING' ||
                  recording.status === 'PAUSED'
                }
                onClick={() => startRecording(recording.id)}
              >
                Record
              </Button>
              <Button
                inverted
                disabled={
                  recording.status !== 'RECORDING' &&
                  recording.status !== 'PAUSED'
                }
                toggled={recording.status === 'PAUSED'}
                onClick={() =>
                  recording.status === 'PAUSED'
                    ? resumeRecording(recording.id)
                    : pauseRecording(recording.id)
                }
              >
                {recording.status === 'PAUSED' ? 'Resume' : 'Pause'}
              </Button>
              <Button
                inverted
                toggled={recording.isMuted}
                onClick={() => muteRecording(recording.id)}
              >
                Mute
              </Button>
              <Button inverted onClick={() => stopRecording(recording.id)}>
                Stop
              </Button>
              <Button inverted onClick={() => cancelRecording(recording.id)}>
                Cancel
              </Button>
            </div>

            <div
              className={`${
                recording.previewRef.current?.src.startsWith('blob:')
                  ? 'visible'
                  : 'hidden'
              }`}
            >
              <p>Preview</p>
              <video ref={recording.previewRef}   style={{
                        height: "auto",
                        width: "100%",
                        display: "block"
                    }} autoPlay loop playsInline />
              <div className="space-x-2 my-2">
                <Button inverted onClick={() => download(recording.id)}>
                  Download
                </Button>
                <Button inverted onClick={() => clearPreview(recording.id)}>
                  Clear preview
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
            {/* <div>

                 <video
                    ref={activeRecordings[0].webcamRef}
                  //  onLoadedMetadata={handleLoadedMetadata}
                    style={{
                        height: "auto",
                        width: "100%",
                        display: `${activeRecordings[0].status === "OPEN" ||
                            activeRecordings[0].status === "RECORDING"
                            ? "block"
                            : "none"
                            }`
                    }}
                    muted
                    autoPlay
                    playsInline 
                />
                <video
                    ref={activeRecordings[0].previewRef}
                    onLoadedMetadata={handleLoadedMetadata}
                    style={{
                        height: "auto",
                        width: "100%",
                        display: `${activeRecordings[0].status === "PREVIEW" ? "block" : "none"}`
                    }}
                    autoPlay
                    playsInline 
                /> 
            </div> */}

        </div>
    );
}

export default VideoPlayerComponent;