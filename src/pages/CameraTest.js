import React, { useRef, useState } from 'react';

const CameraTest = () => {

  const videoRef = useRef(null);
  const recordedVideoRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null); // To store the recorded video
  const [mediaRecorder, setMediaRecorder] = useState(null); // To store the MediaRecorder instance

  const startRecording = async () => {
    try 
    {
        setRecordedBlob(null); // Reset the recorded blob when starting a new recording
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setIsRecording(true);

      // Initialize MediaRecorder to capture the stream
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      const chunks = [];
      recorder.ondataavailable = (event) => {
        chunks.push(event.data); // Store data as chunks
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        setRecordedBlob(URL.createObjectURL(blob)); // Set the video blob URL for preview
      };

      recorder.start();
    } catch (error) {
      console.error('Error accessing camera: ', error);
    }
  };

  const stopRecording = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      let tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    mediaRecorder.stop(); // Stop the recording
    setIsRecording(false);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline />

      <div>
                <video
                    ref={videoRef}
                    muted
                    autoPlay
                    playsInline 
                />              
            </div>

      {!isRecording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}

       {/* Display the preview of the recorded video */}
       {recordedBlob && (
        <div>
          <h3>Recorded Video Preview:</h3>
          <video ref={recordedVideoRef} controls>
            <source src={recordedBlob} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

    </div>
  );
};

export default CameraTest;
