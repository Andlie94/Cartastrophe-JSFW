"use client";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;          
  onClick?: () => void;               
  className?: string;                 
  type?: "button" | "submit" | "reset"; 
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className = "", type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 bg-[#7a76ab] text-white rounded hover:bg-[#b1b08a] ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;