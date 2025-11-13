import React from "react";

export default function Button({ children, variant, size, className = "", onClick, ...props }) {
  const baseStyles =
    "flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none";
  const variants = {
    default: "bg-blue-600 hover:bg-blue-700 text-white",
    outline: "border border-gray-700 text-gray-300 hover:bg-gray-800",
    ghost: "text-gray-300 hover:bg-gray-900",
  };
  const sizes = {
    default: "px-4 py-2 text-sm",
    icon: "p-2 h-8 w-8",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.default} ${
        sizes[size] || sizes.default
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}