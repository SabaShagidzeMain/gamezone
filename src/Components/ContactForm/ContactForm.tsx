"use client";

import { useState } from "react";
import emailjs from "emailjs-com";
import { useTranslations } from "next-intl";

const ContactForm: React.FC = () => {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState("");

  const validate = () => {
    const newErrors = { name: "", email: "", message: "" };
    let isValid = true;

    if (!formData.name) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
      isValid = false;
    }

    if (!formData.message) {
      newErrors.message = "Message is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        const form = e.target as HTMLFormElement;

        const formDataToSend = new FormData(form);

        formDataToSend.append("to_name", "Recipient Name");
        formDataToSend.append("from_name", formData.name);
        formDataToSend.append("from_email", formData.email);
        formDataToSend.append("message", formData.message);

        const result = await emailjs.sendForm(
          "service_5k6uc9k",
          "template_nhv8dmx",
          form,
          "XwOZDqN1GPGybtpCp"
        );

        console.log(result);
        setFormStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } catch (error) {
        console.error(error);
        setFormStatus("Failed to send message. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="max-w-lg w-[25rem] p-6 border rounded-md shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold mb-2">
            {t("contact-page.c3")}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold mb-2">
            {t("contact-page.c4")}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-semibold mb-2">
            {t("contact-page.c5")}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border rounded-md"
          />
          {errors.message && (
            <p className="text-red-500 text-sm">{errors.message}</p>
          )}
        </div>

        <div className="mb-4">
          {formStatus && (
            <p
              className={
                formStatus.includes("success")
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {formStatus}
            </p>
          )}
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? `${t("contact-page.c12")}`
            : `${t("contact-page.c11")}`}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
