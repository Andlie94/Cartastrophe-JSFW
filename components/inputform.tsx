import React from "react";

interface ContactFieldsProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  errors: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
  onChange: (field: string, value: string) => void;
}

export function ContactFields({
  name,
  email,
  subject,
  message,
  errors,
  onChange,
}: ContactFieldsProps) {
  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          <p className="text-black font-extralight text-xs">Name</p>
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => onChange("name", e.target.value)}
          className={`mt-1 block w-full border rounded-md p-2 ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          <p className="text-black font-extralight text-xs">Email</p>
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => onChange("email", e.target.value)}
          className={`mt-1 block w-full border rounded-md p-2 ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700"
        >
          <p className="text-black font-extralight text-xs">Subject</p>
        </label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => onChange("subject", e.target.value)}
          className={`mt-1 block w-full border rounded-md p-2 ${
            errors.subject ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.subject && (
          <p className="text-red-500 text-sm">{errors.subject}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700"
        >
          <p className="text-black font-extralight text-xs">Message</p>
        </label>
        <textarea
          id="message"
          rows={4}
          value={message}
          onChange={(e) => onChange("message", e.target.value)}
          className={`mt-1 block w-full border rounded-md p-2 ${
            errors.message ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.message && (
          <p className="text-red-500 text-sm">{errors.message}</p>
        )}
      </div>
    </div>
  );
}
