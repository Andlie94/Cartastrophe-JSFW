"use client";
import React, { useState } from "react";
import { ContactFields } from "../../components/inputform";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

    const [isSubmitted, setIsSubmitted] = useState(false); 

  const successMessage = () => (
    <div className="text-green-800 text-sm mt-10 bg-white p-2 rounded border-2 shadow-md">
      Your message has been sent!
    </div>
  );

  const validateField = (field: string, value: string) => {
    let error = "";
    if ((field === "name" || field === "subject" || field === "message") && value.length < 3) {
      error = `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least 3 characters.`;
    }
    if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = "Invalid email format.";
      }
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error;
  };

 const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
    setIsSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;

    const nameError = validateField("name", name);
    const emailError = validateField("email", email);
    const subjectError = validateField("subject", subject);
    const messageError = validateField("message", message);

    if (nameError || emailError || subjectError || messageError) return;

    setFormData({ name: "", email: "", subject: "", message: "" });
    setErrors({ name: "", email: "", subject: "", message: "" });
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-md mx-auto p-8 rounded">
      <h1 className="text-black text-lg text-center">Contact Us</h1>
      <p className="text-black text-xs text-center mt-4 mb-4">Please fill out the form below and we will get <br /> back to you shortly.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <ContactFields
          name={formData.name}
          email={formData.email}
          subject={formData.subject}
          message={formData.message}
          errors={errors}
          onChange={handleChange}
        />
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#C5C4A6] text-white px-4 py-2 rounded hover:bg-[#B0AFA0] transition"
          >
            <p className="text-black font-extralight text-xs">SEND MESSAGE</p>
          </button>
          {isSubmitted && successMessage()}
        </div>
        <div className="mb-20">

        </div>
      </form>
    </div>
  );
}