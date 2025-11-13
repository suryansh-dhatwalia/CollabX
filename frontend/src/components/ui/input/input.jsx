import React from "react";

export default function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none bg-gray-900 border-gray-700 text-white placeholder-gray-500 ${className}`}
      {...props}
    />
  );
}