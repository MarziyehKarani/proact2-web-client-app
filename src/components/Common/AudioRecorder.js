import React, { useState, useEffect } from "react";
import AudioAnalyser from "react-audio-analyser";
import { Button } from "reactstrap";
import { useTimer } from "reactjs-countdown-hook";


const AudioRecorder = ({ props, onFileGenerated, onMediaStreamChanged }) => {

    const [status, setStatus] = useState("inactive");
    const [audioSrc, setAudioSrc] = useState();
    const [mediaStream, setMediaStream] = useState(null);

    const audioType = "audio/wav";
    const maxDurationInSeconds = 60;

    const audioProps = {
        audioType,
        status,
        audioSrc,
        timeslice: 1000
      //  startCallback: (stream) => setMediaStream(stream) // Capture the media stream when recording starts
    };


    const startRecording = async () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            setMediaStream(stream);
            setStatus("recording");
            resume();
        })
        .catch(error => {
            console.error("Error accessing the microphone", error);
        });
    };

    function processStream(stream){
      setTimeout(()=> stopStream(stream), 5000)
    }
    
    function stopStream(stream){
      stream.getTracks().forEach( track => track.stop() );
      };

    function stopRecording() {
        if (mediaStream) {
            console.log(mediaStream.getTracks());
            mediaStream.getTracks().forEach(track => track.stop());
            setMediaStream(null);
        } 
        setStatus("inactive");
        console.log(status);
        reset();
    }

/*     const stopMediaTracks = () => {
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach(track => track.stop());
            mediaStreamRef.current = null;
        }
        mediaStreamRef=null;
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
    }; */

    function HandleRecording(blob) {
        setAudioSrc(window.URL.createObjectURL(blob));
        var file = new File([blob], "patientAudio.wav", { type: audioType });
        Object.assign(file, {
            preview: URL.createObjectURL(file)
        });

        stopRecording();
        onFileGenerated(file,mediaStream);
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

    useEffect(() => {
        return () => {
            stopRecording(); // Clean up the media tracks when the component unmounts
        };
    }, []);

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