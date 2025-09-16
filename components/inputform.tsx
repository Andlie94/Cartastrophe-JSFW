"use client";
import React, { useState } from "react";

export function ContactFields() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.length < 3) return alert("Name have to be at least 3 characters");
    if (message.length < 3) return alert("message need at least 3 characters");
    if (subject.length < 3) return alert("Subject need at least 3 characters");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return alert("Invalid email format");

    console.log({ name, email, subject, message });

    setName("");
    setEmail("");
    setMessage("");
    setSubject("");
  };

  return (
    <div className="max-w-md mx-auto p-8 rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            <p>Name</p>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            minLength={3}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#ffffff] focus:border-[#C5C4A6] bg-white"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
          <p>Email</p>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#C5C4A6] focus:border-[#C5C4A6] bg-white"
          />
        </div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700"
        >
         <p>Subject</p>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          minLength={3}
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#C5C4A6] focus:border-[#C5C4A6] bg-white"
        />

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            <p>Message</p>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            minLength={3}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-[#C5C4A6] focus:border-[#C5C4A6] bg-white"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-[#C5C4A6] text-white px-4 py-2 rounded hover:bg-[#B0AFA0] transition"
          >
            <p>Send Message</p>
          </button>
        </div>
      </form>
    </div>
  );
}
