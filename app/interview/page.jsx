"use client";
import { Button } from "@/components/ui/button";
import { Lightbulb, WebcamIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Webcam from "react-webcam";

export default function Interview() {
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [shakeEffect, setShakeEffect] = useState(false);

  const interviewRules = [
    "Ensure stable internet and choose a clean, quiet location.",
    "Permission for access of camera, microphone, entire screen sharing is required.",
    "Be in professional attire and avoid distractions.",
    "Give a detailed response, providing as much information as you can.",
    "Answer the question with examples and projects you’ve worked on.",
  ];

  // Handle Start Now button click
  const handleStartClick = () => {
    if (!webCamEnabled) {
      setShakeEffect(true);
      setTimeout(() => setShakeEffect(false), 500); // Remove shake effect after 500ms
    }
  };

  return (
    <div className="min-h-screen bg-[#111827] text-white p-10">
      {/* Title */}
      <h2 className="font-bold text-3xl mb-10">Trainee Interview</h2>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Instructions Section */}
        <div className="flex flex-col gap-5">
          <div className="p-5 bg-[#1F2937] rounded-lg shadow-lg">
            <h2 className="font-semibold text-xl mb-5">Instructions</h2>
            {interviewRules.map((rule, index) => (
              <h2 key={index} className="text-lg">
                <strong>{index + 1}. </strong>
                {rule}
              </h2>
            ))}
          </div>

          {/* Information Section */}
          <div className="p-5 bg-[#F59E0B1A] border border-yellow-400 rounded-lg">
            <h2 className="flex gap-2 items-center text-yellow-400 text-lg">
              <Lightbulb />
              <span>Information</span>
            </h2>
            <h2 className="mt-3 text-yellow-300">
              <span className="text-blue-400 underline">
                <a href="#">Click here</a>
              </span>{" "}
              to try a mock interview with Avya, our AI interviewer, and build
              your confidence before the main interview!
            </h2>
          </div>
        </div>

        {/* Webcam Section */}
        <div className="flex flex-col items-center">
          {/* Webcam or Placeholder */}
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => setWebCamEnabled(true)}
              onUserMediaError={() => setWebCamEnabled(false)}
              mirrored={true}
              className="border border-gray-700 rounded-lg shadow-lg"
              style={{ height: 300, width: 300 }}
            />
          ) : (
            <div className="flex items-center justify-center h-72 w-full border border-gray-600 rounded-lg bg-[#374151]">
              <WebcamIcon className="h-20 w-20 text-gray-400" />
            </div>
          )}

          {/* Enable Button */}
          <div className={`w-full mt-5 ${shakeEffect ? "shake" : ""}`}>
            {!webCamEnabled && (
              <Button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => setWebCamEnabled(true)}
              >
                Enable Web Cam and Microphone
              </Button>
            )}
          </div>

          {/* Start Button */}
          <div className="w-full mt-5">
            <Link href={webCamEnabled ? `/interview/checkstart` : "#"}>
              <Button
                className={`w-full bg-purple-500 hover:bg-purple-600 text-white ${
                  !webCamEnabled ? "cursor-not-allowed opacity-50" : ""
                }`}
                onClick={handleStartClick}
                disabled={!webCamEnabled}
              >
                Start Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

