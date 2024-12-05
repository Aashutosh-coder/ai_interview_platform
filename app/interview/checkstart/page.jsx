"use client";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Mic, Speaker, Monitor, Check } from "lucide-react";
import Link from "next/link";

function CheckStart() {
  const [cameraReady, setCameraReady] = useState(false);
  const [microphoneReady, setMicrophoneReady] = useState(false);
  const [speakerReady, setSpeakerReady] = useState(false);
  const [screenShareReady, setScreenShareReady] = useState(false);

  const videoRef = useRef(null); // Reference for the video element
  const [cameraStream, setCameraStream] = useState(null); // Store the camera stream

  const isAllReady = cameraReady && microphoneReady && speakerReady && screenShareReady;

  // Function to check and enable the camera
  const handleCameraCheck = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraReady(true);
      setCameraStream(stream); // Store the camera stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream; // Display the video stream in the video element
      }
    } catch (error) {
      alert("Camera access is denied or not available!");
      setCameraReady(false);
    }
  };

  // Stop camera stream (useful when leaving the page)
  const stopCameraStream = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
  };

  const handleMicrophoneCheck = () => setMicrophoneReady(true);
  const handleSpeakerCheck = () => {
    const audio = new Audio("/test-sound.mp3");
    audio.play();
    setSpeakerReady(true);
  };
  const handleScreenShareCheck = async () => {
    try {
      await navigator.mediaDevices.getDisplayMedia();
      setScreenShareReady(true);
    } catch (error) {
      alert("Screen sharing permission denied!");
    }
  };

  return (
    <div className="min-h-screen bg-[#111827] text-white p-10">
      <h2 className="font-bold text-3xl mb-10">Ready to join?</h2>
      <p className="mb-5 text-gray-400">
        Please make sure your device is properly configured.
      </p>

      <div className="flex flex-col gap-5">
        {/* Camera Check */}
        <div className="flex flex-col gap-3 p-4 bg-[#1F2937] rounded-lg">
          <div className="flex items-center gap-3">
            <Camera className="text-white" />
            <span>Check Camera</span>
            <Button
              className={`ml-auto ${cameraReady ? "bg-green-500" : "bg-blue-500"}`}
              onClick={handleCameraCheck}
            >
              {cameraReady ? <Check className="text-white" /> : "Check"}
            </Button>
          </div>
         
        </div>

        {/* Microphone Check */}
        <div className="flex flex-col gap-2 p-4 bg-[#1F2937] rounded-lg">
          <div className="flex items-center gap-3">
            <Mic className="text-white" />
            <span>Check Microphone</span>
            <Button
              className={`ml-auto ${microphoneReady ? "bg-green-500" : "bg-blue-500"}`}
              onClick={handleMicrophoneCheck}
            >
              {microphoneReady ? <Check className="text-white" /> : "Check"}
            </Button>
          </div>
          {/* Microphone Testing */}
          {microphoneReady && (
            <div className="mt-3 text-gray-400 text-sm">
              <p>Testing Microphone</p>
              <p>Say hello! Let's make sure we can hear you properly.</p>
              <div className="mt-1 bg-blue-500 h-1 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>

        {/* Speaker Check */}
        <div className="flex items-center gap-3 p-4 bg-[#1F2937] rounded-lg">
          <Speaker className="text-white" />
          <span>Check Speaker</span>
          <Button
            className={`ml-auto ${speakerReady ? "bg-green-500" : "bg-blue-500"}`}
            onClick={handleSpeakerCheck}
          >
            {speakerReady ? <Check className="text-white" /> : "Check"}
          </Button>
        </div>

        {/* Screen Share Check */}
        <div className="flex items-center gap-3 p-4 bg-[#1F2937] rounded-lg">
          <Monitor className="text-white" />
          <span>Enable Screen Share</span>
          <Button
            className={`ml-auto ${screenShareReady ? "bg-green-500" : "bg-blue-500"}`}
            onClick={handleScreenShareCheck}
          >
            {screenShareReady ? <Check className="text-white" /> : "Enable"}
          </Button>
        </div>
      </div>

      {/* Start Interview Button */}
      <div className="relative mt-10">
        <Link href={isAllReady ? "/interview/start" : "#"}>
          <Button
            className={`w-full text-white ${
              isAllReady ? "bg-purple-500 hover:bg-purple-600" : "bg-gray-500 cursor-not-allowed"
            }`}
            disabled={!isAllReady}
          >
            Start Interview
          </Button>
        </Link>
        {!isAllReady && (
          <p className="absolute left-0 top-12 text-sm text-gray-400">
            Complete all checks to enable the Start Interview button.
          </p>
        )}
      </div>
    </div>
  );
}

export default CheckStart;
