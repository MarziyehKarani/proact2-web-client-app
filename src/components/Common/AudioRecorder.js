import React, { useState, useEffect } from "react";
import AudioAnalyser from "react-audio-analyser";
import { Button } from "reactstrap";
import { useTimer } from "reactjs-countdown-hook";


const AudioRecorder = ({ props, onFileGenerated, onRecordingStarted }) => {

    const [status, setStatus] = useState("inactive");
    const [audioSrc, setAudioSrc] = useState();
    const [recorder, setRecorder] = useState(null);

    const audioType = "audio/wav";
    const maxDurationInSeconds = 60;

    const audioProps = {
        audioType,
        status,
        audioSrc,
        timeslice: 1000,
        startCallback: (e) => {
            setRecorder(e.target)
            onRecordingStarted(e.target)
        }
    };


    const startRecording = async () => {
        setStatus("recording")
        resume();
    };

    function stopRecording() {
       if(recorder)
        {
            recorder.stream.getAudioTracks().forEach((track) => track.stop());
            setRecorder(null);
        }
        setStatus("inactive");
        reset();
    }

    function HandleRecording(blob) {
        setAudioSrc(window.URL.createObjectURL(blob));
        var file = new File([blob], "patientAudio.wav", { type: audioType });
        Object.assign(file, {
            preview: URL.createObjectURL(file)
        });

        onFileGenerated(file);
    }

    function IsRecording() {
        return status == "recording"
    }

    const {
        seconds,
        minutes,
        pause,
        resume,
        reset,
    } = useTimer(maxDurationInSeconds, handleTimerFinish);

    function handleTimerFinish() {
        stopRecording();
    }

    useEffect(() => {
        if (!IsRecording() && minutes == "01") {
            pause();
        }
    }, [pause, minutes, status]);


    return (
        <div className="text-center">

            <h1 className="text-white">{minutes}.{seconds}</h1>

            <AudioAnalyser
                {...audioProps}
                stopCallback={HandleRecording}
                backgroundColor="transparent"
                strokeColor="white">
                <div className="text-center mb-5">
                    {
                        IsRecording() ?
                            <>
                                <Button
                                    className='rounded-circle'
                                    color="danger"
                                    onClick={stopRecording}
                                    style={{ height: "80px", width: "80px", border: "0" }}>
                                    <i className="fas fa-stop fa-2x"></i>
                                </Button>
                                <h3 className="text-white text-center p-2">{props.t("TapToStopRecording")}</h3>
                            </>
                            :
                            <>
                                <Button
                                    className='rounded-circle text-center'
                                    onClick={startRecording}
                                    style={{ height: "80px", width: "80px", background: "#596AFA", border: "0" }}>
                                    <i className="fas fa-microphone fa-2x"></i>
                                </Button>
                                <h3 className="text-white text-center p-2">{props.t("TapToStartRecording")}</h3>
                            </>
                    }
                </div>
            </AudioAnalyser>
        </div>
    );
}

export default AudioRecorder;