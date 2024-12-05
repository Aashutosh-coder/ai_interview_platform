"use client";
import React, { useEffect, useState, useRef } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StartInterview = () => {
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(30); // Timer state for 30 seconds
  const videoRef = useRef(null); // To reference the video element
  const mediaStreamRef = useRef(null); // To store the media stream
  const intervalRef = useRef(null); // To store interval for clearing later
  const endInterviewButtonRef = useRef(null); // Reference for the "End Interview" button

  useEffect(() => {
    // Mock data fetch or static questions
    const mockQuestions = [
      { question: "What are your strengths?" },
      { question: "What are your weaknesses?" },
      { question: "Why do you want this role?" },
    ];
    setMockInterviewQuestion(mockQuestions);

    // Request camera and microphone access when the component loads
    const startVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        mediaStreamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing media devices.", err);
      }
    };

    startVideoStream();

    // Cleanup media stream when the component unmounts
    return () => {
      if (mediaStreamRef.current) {
        const tracks = mediaStreamRef.current.getTracks();
        tracks.forEach((track) => track.stop());
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current); 
      }
    };
  }, []);

  useEffect(() => {
    
    if (activeQuestionIndex < mockInterviewQuestion.length) {
      setTimer(30); 
    }

    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
        
          clearInterval(intervalRef.current);

          if (activeQuestionIndex < mockInterviewQuestion.length - 1) {
            setActiveQuestionIndex(activeQuestionIndex + 1);
          } else {
            // Trigger "End Interview" button click for last question
            if (endInterviewButtonRef.current) {
              endInterviewButtonRef.current.click(); // Simulate click on "End Interview"
            }
          }
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000); // Update every second

    // Cleanup when the question changes or timer ends
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [activeQuestionIndex, mockInterviewQuestion.length]);

  return (
    <div className="min-h-screen bg-[#111827] text-white p-10">
      <h2 className="text-3xl font-bold text-center text-purple-400 mb-8">
        Zeko Ai Interview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions Section */}
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />


        {/* Video or Audio Recording Section */}
        <div className="p-12 rounded-lg shadow-lg flex items-center justify-center h-96 ">
          <video
            ref={videoRef}
            autoPlay
            muted
            className=" h-80 rounded-lg"
            playsInline
          />
          {/* The video element will display the live feed from the camera */}
        </div>
      </div>
      <div className="flex justify-end gap-6 mt-8">
        
        {activeQuestionIndex < mockInterviewQuestion.length - 1 && (
          <Button
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          >
            Next Question
          </Button>
        )}
        {activeQuestionIndex === mockInterviewQuestion.length - 1 && (
          <Link href="/interview/feedback">
            <Button
              ref={endInterviewButtonRef}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
            >
              End Interview
            </Button>
          </Link>
        )}
      </div>
      {/* Timer Display */}
      <div className="text-center text-xl mt-4 text-white">
        Time Remaining: {timer} seconds
      </div>
    </div>
  );
};

export default StartInterview;
