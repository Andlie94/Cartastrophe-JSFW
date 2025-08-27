"use client";
import React from "react";
import Button from "../components/Button"; 

export default function Home() {
  const handleClick = () => {
    alert("Knappen ble trykket!");
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold underline text-[#7A7AD2]">Hello world!</h1>
      <h2>Test for h2</h2>
      <p>This is a test to see the paragraph.</p>
      <Button onClick={handleClick}>Trykk meg</Button>
    </div>
  );
}