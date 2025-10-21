"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { TypewriterEffectSmooth } from "./typewriter-effect";
export function TypewriterEffectSmoothDemo() {
  const navigate = useNavigate();
  const words = [
    {
      text: "Code",
    },
    {
      text: " Chat",
    },
    {
      text: " Create",
    },
    {
      text: " with",
    },
    {
      text: " - CollabX.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black ">
      <p className="text-neutral-600 dark:text-neutral-200 text-[48px] font-bold  ">
        CollabX
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm font-medium cursor-pointer"
        onClick={()=>navigate("/login")}
        >
          Login
        </button>
        <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm font-medium"
        onClick={()=>navigate("/register")}
        >
          Signup
        </button>
      </div>
    </div>
  );
}
