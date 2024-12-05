"use client";
import React from "react";
import { Button } from "@/components/ui/button"; 

const Feedback = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#111827] text-white p-10">
      
      <h1 className="text-4xl font-bold text-center text-purple-400 mb-6">
        Test Completed Successfully! 🎉
      </h1>

     
      <p className="text-lg text-gray-400 mb-8 text-center">
        Congratulations on completing the interview! You're one step closer to your goal.
      </p>

      
    </div>
  );
};

export default Feedback;
