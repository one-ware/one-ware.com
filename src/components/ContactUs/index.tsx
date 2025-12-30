import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";

import Translate, { translate } from "@docusaurus/Translate";
import { trackEvent } from "../../utils/tracking";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

interface FormData {
  name: string;
  email: string;
  message: string;
  website: string;
  recaptcha_token: string;
}

const RECAPTCHA_SITE_KEY = "6Ldzg-orAAAAAIOc5GaUtR6gOpdqcW1EHZL7I9mp";
const API_URL = "https://backend.one-ware.com/api/contact";

type ContactMode = "select" | "form" | "booking";

interface ContactUsProps {
  compact?: boolean;
  subtitle?: React.ReactNode;
}

export default function ContactUs({ compact = false, subtitle }: ContactUsProps) {
  const [mode, setMode] = useState<ContactMode>("select");
  const [christopherMode, setChristopherMode] = useState<ContactMode>("select");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    website: "",
    recaptcha_token: "",
  });
  const [christopherFormData, setChristopherFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    website: "",
    recaptcha_token: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const [christopherFormStatus, setChristopherFormStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    if (typeof window === "undefined" || process.env.NODE_ENV === "development") return;

    if (!document.querySelector("#recaptcha-script")) {
      const script = document.createElement("script");
      script.id = "recaptcha-script";
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      script.onerror = (err) => console.warn("reCAPTCHA load error:", err);
      document.body.appendChild(script);
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChristopherChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setChristopherFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChristopherSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (christopherFormData.website.trim()) {
      console.warn("Bot detected — submission ignored.");
      return;
    }

    let token = "";
    try {
      if (window.grecaptcha) {
        token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: "submit" });
      }
    } catch (err) {
      console.warn("reCAPTCHA execution failed:", err);
    }

    try {
      const response = await axios.post(API_URL, {
        ...christopherFormData,
        recaptcha_token: token,
      });

      const { success } = response.data;
      if (success === true) {
        setChristopherFormStatus("success");
        setChristopherFormData({ name: "", email: "", message: "", website: "", recaptcha_token: "" });
        trackEvent("contact_form_submit", { label: "Christopher Contact Form" });
      } else {
        setChristopherFormStatus("error");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setChristopherFormStatus("error");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.website.trim()) {
      console.warn("Bot detected — submission ignored.");
      return;
    }

    let token = "";
    try {
      if (window.grecaptcha) {
        token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: "submit" });
      }
    } catch (err) {
      console.warn("reCAPTCHA execution failed:", err);
    }

    try {
      const response = await axios.post(API_URL, {
        ...formData,
        recaptcha_token: token,
      });

      const { success } = response.data;
      if (success === true) {
        setFormStatus("success");
        setFormData({ name: "", email: "", message: "", website: "", recaptcha_token: "" });
        trackEvent("contact_form_submit", { label: "Helmut Contact Form" });
      } else {
        setFormStatus("error");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setFormStatus("error");
    }
  };

  return (
    <div className="text-center w-full">
      <div className="max-w-4xl mx-auto mb-8">
        <h2 className="text-3xl md:text-5xl font-bold">
          <Translate id="contactus.headline">Interested? Contact us!</Translate>
        </h2>
        {subtitle && (
          <p className="text-xl text-gray-300 mt-4">{subtitle}</p>
        )}
      </div>

      <div className={`mt-12 mb-4 w-full ${compact ? '' : 'px-6 lg:px-12'}`}>
        <div className={`flex flex-col lg:flex-row gap-8 items-stretch ${compact ? '' : 'max-w-7xl mx-auto'}`}>
          <div className="w-full lg:w-1/2">
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 md:p-12 border border-gray-700 h-full flex flex-col">
              {mode === "select" && (
                <div className="flex-1 flex flex-col text-center">
                  <img
                    src={require("@site/static/img/AboutUs/helmut.png").default}
                    alt="Helmut Plötz - Vice President of Global Sales"
                    loading="lazy"
                    decoding="async"
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-[#00FFD1]/20 mx-auto mb-6"
                  />
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Helmut Plötz</h3>
                  <p className="text-[#00FFD1] font-semibold mb-4 text-lg">
                    <Translate id="contactus.helmut.role">Vice President of Global Sales</Translate>
                  </p>
                  <p className="text-gray-300 mb-6 leading-relaxed text-base max-w-md mx-auto">
                    <Translate id="contactus.helmut.description">
                      Helmut is our sales expert who takes care of projects of all kinds. Whether you need evaluations for ideas,
                      custom quotes, partnership opportunities, or strategic consulting — Helmut is your go-to contact for
                      business inquiries.
                    </Translate>
                  </p>
                  <div className="flex flex-col gap-3 w-full max-w-sm mx-auto mt-auto">
                    <button
                      onClick={() => setMode("form")}
                      className="group relative px-6 py-3 font-medium overflow-hidden transition-all duration-300 w-full"
                      style={{
                        background: "rgba(0, 255, 209, 0.05)",
                        border: "1px solid rgba(0, 255, 209, 0.3)"
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3 text-base text-[var(--ifm-color-primary)] group-hover:text-[var(--ifm-color-primary-lighter)] transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <Translate id="contactus.select.form">Send a Message</Translate>
                      </span>
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "rgba(0, 255, 209, 0.08)" }}
                      />
                    </button>
                    <a
                      href="mailto:sales@one-ware.com"
                      onClick={() => trackEvent("email_click", { label: "Helmut Email" })}
                      className="group relative px-6 py-3 font-medium overflow-hidden transition-all duration-300 w-full"
                      style={{
                        background: "rgba(0, 255, 209, 0.05)",
                        border: "1px solid rgba(0, 255, 209, 0.3)"
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3 text-base text-[var(--ifm-color-primary)] group-hover:text-[var(--ifm-color-primary-lighter)] transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        sales@one-ware.com
                      </span>
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "rgba(0, 255, 209, 0.08)" }}
                      />
                    </a>
                    <button
                      onClick={() => {
                        setMode("booking");
                        trackEvent("schedule_meeting", { label: "Helmut Meeting" });
                      }}
                      className="group relative px-6 py-3 font-medium overflow-hidden transition-all duration-300 w-full"
                      style={{
                        background: "rgba(0, 255, 209, 0.05)",
                        border: "1px solid rgba(0, 255, 209, 0.3)"
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3 text-base text-[var(--ifm-color-primary)] group-hover:text-[var(--ifm-color-primary-lighter)] transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <Translate id="contactus.select.booking">Schedule a Meeting</Translate>
                      </span>
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "rgba(0, 255, 209, 0.08)" }}
                      />
                    </button>
                    
                  </div>
                </div>
              )}

              {mode === "form" && formStatus === "success" && (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-[#00FFD1]/20 flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-[#00FFD1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-200">
                    <Translate id="contactus.success">Message sent successfully!</Translate>
                  </h3>
                  <p className="text-gray-400 mb-8">
                    <Translate id="contactus.success.description">We will get back to you as soon as possible.</Translate>
                  </p>
                  <button
                    onClick={() => { setFormStatus("idle"); setMode("select"); }}
                    className="group relative px-8 py-4 font-medium overflow-hidden transition-all duration-300"
                    style={{
                      background: "rgba(0, 255, 209, 0.05)",
                      border: "1px solid rgba(0, 255, 209, 0.3)"
                    }}
                  >
                    <span className="relative z-10 text-[var(--ifm-color-primary)] group-hover:text-[var(--ifm-color-primary-lighter)] transition-colors">
                      <Translate id="contactus.back">Back</Translate>
                    </span>
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "rgba(0, 255, 209, 0.08)" }}
                    />
                  </button>
                </div>
              )}

              {mode === "form" && formStatus !== "success" && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-200">
                      <Translate id="contactus.form.title">Send us a message directly</Translate>
                    </h3>
                    <button
                      onClick={() => { setFormStatus("idle"); setMode("select"); }}
                      className="group relative p-2 overflow-hidden transition-all duration-300"
                      style={{
                        background: "rgba(0, 255, 209, 0.05)",
                        border: "1px solid rgba(0, 255, 209, 0.3)"
                      }}
                    >
                      <svg className="w-5 h-5 relative z-10 text-[var(--ifm-color-primary)] group-hover:text-[var(--ifm-color-primary-lighter)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "rgba(0, 255, 209, 0.08)" }}
                      />
                    </button>
                  </div>

                  {formStatus === "error" && (
                    <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30">
                      <p className="text-red-400 text-sm">
                        <Translate id="contactus.error">An error occurred while sending your message.</Translate>
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      style={{ display: "none" }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <label className="block mb-4">
                      <span className="block text-sm font-bold mb-2 text-gray-300">Name</span>
                      <input
                        type="text"
                        name="name"
                        className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-[#00FFD1] transition-colors"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </label>

                    <label className="block mb-4">
                      <span className="block text-sm font-bold mb-2 text-gray-300">E-Mail</span>
                      <input
                        type="email"
                        name="email"
                        className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-[#00FFD1] transition-colors"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </label>

                    <label className="flex-1 flex flex-col mb-6">
                      <span className="block text-sm font-bold mb-2 text-gray-300">
                        <Translate id="contactus.form.1">Message</Translate>
                      </span>
                      <textarea
                        name="message"
                        className="flex-1 w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-[#00FFD1] transition-colors resize-none min-h-[100px]"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </label>

                    <button
                      type="submit"
                      className="text-black w-full font-bold py-4 px-6 button button--primary button--md transition-all hover:scale-[1.02]"
                    >
                      <Translate id="contactus.buttonsend">Send</Translate>
                    </button>
                  </form>
                </>
              )}

              {mode === "booking" && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-200">
                      <Translate id="contactus.booking.title">Schedule a Meeting</Translate>
                    </h3>
                    <button
                      onClick={() => setMode("select")}
                      className="group relative p-2 overflow-hidden transition-all duration-300"
                      style={{
                        background: "rgba(0, 255, 209, 0.05)",
                        border: "1px solid rgba(0, 255, 209, 0.3)"
                      }}
                    >
                      <svg className="w-5 h-5 relative z-10 text-[var(--ifm-color-primary)] group-hover:text-[var(--ifm-color-primary-lighter)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "rgba(0, 255, 209, 0.08)" }}
                      />
                    </button>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <iframe
                      src="https://outlook.office.com/book/ONEWARECustomerMeetingRequest@one-ware.com/?ismsaljsauthenabled"
                      width="100%"
                      height="100%"
                      scrolling="yes"
                      style={{ border: 0, minHeight: "400px" }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 md:p-12 border border-gray-700 h-full flex flex-col">
              {christopherMode === "select" && (
                <div className="flex-1 flex flex-col text-center">
                  <img
                    src={require("@site/static/img/support_christopher.webp").default}
                    alt="Christopher - Development Support Specialist"
                    loading="lazy"
                    decoding="async"
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-[#00FFD1]/20 mx-auto mb-6"
                  />
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Christopher</h3>
                  <p className="text-[#00FFD1] font-semibold mb-4 text-lg">
                    <Translate id="oneai.support.role">Development Support Specialist</Translate>
                  </p>
                  <p className="text-gray-300 mb-6 leading-relaxed text-base max-w-md mx-auto">
                    <Translate id="oneai.support.description">
                      Christopher specializes in supporting the development process with ONE AI. He helps you with
                      technical questions, integration challenges, and guides you through the implementation of our
                      AI solutions.
                    </Translate>
                  </p>
                  <div className="flex flex-col gap-3 w-full max-w-sm mx-auto mt-auto">
                    <button
                      onClick={() => setChristopherMode("form")}
                      className="group relative px-6 py-3 font-medium overflow-hidden transition-all duration-300 w-full"
                      style={{
                        background: "rgba(0, 255, 209, 0.05)",
                        border: "1px solid rgba(0, 255, 209, 0.3)"
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3 text-base text-[var(--ifm-color-primary)] group-hover:text-[var(--ifm-color-primary-lighter)] transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <Translate id="contactus.select.form">Send a Message</Translate>
                      </span>
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "rgba(0, 255, 209, 0.08)" }}
                      />
                    </button>
                    <a
                      href="mailto:support@one-ware.com"
                      onClick={() => trackEvent("email_click", { label: "Christopher Email" })}
                      className="group relative px-6 py-3 font-medium overflow-hidden transition-all duration-300 w-full"
                      style={{
                        background: "rgba(0, 255, 209, 0.05)",
                        border: "1px solid rgba(0, 255, 209, 0.3)"
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3 text-base text-[var(--ifm-color-primary)] group-hover:text-[var(--ifm-color-primary-lighter)] transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        support@one-ware.com
                      </span>
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "rgba(0, 255, 209, 0.08)" }}
                      />
                    </a>
                    {/* Spacer to align with Helmut's 2 buttons */}
                    <div className="px-6 py-3 w-full opacity-0 pointer-events-none">
                      <span className="flex items-center justify-center gap-3 text-base">
                        Placeholder
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {christopherMode === "form" && christopherFormStatus === "success" && (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-[#00FFD1]/20 flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-[#00FFD1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-200">
                    <Translate id="contactus.success">Message sent successfully!</Translate>
                  </h3>
                  <p className="text-gray-400 mb-8">
                    <Translate id="contactus.success.description">We will get back to you as soon as possible.</Translate>
                  </p>
                  <button
                    onClick={() => { setChristopherFormStatus("idle"); setChristopherMode("select"); }}
                    className="group relative px-8 py-4 font-medium overflow-hidden transition-all duration-300"
                    style={{
                      background: "rgba(0, 255, 209, 0.05)",
                      border: "1px solid rgba(0, 255, 209, 0.3)"
                    }}
                  >
                    <span className="relative z-10 text-[var(--ifm-color-primary)] group-hover:text-[var(--ifm-color-primary-lighter)] transition-colors">
                      <Translate id="contactus.back">Back</Translate>
                    </span>
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "rgba(0, 255, 209, 0.08)" }}
                    />
                  </button>
                </div>
              )}

              {christopherMode === "form" && christopherFormStatus !== "success" && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-200">
                      <Translate id="contactus.form.title">Send us a message directly</Translate>
                    </h3>
                    <button
                      onClick={() => { setChristopherFormStatus("idle"); setChristopherMode("select"); }}
                      className="group relative p-2 overflow-hidden transition-all duration-300"
                      style={{
                        background: "rgba(0, 255, 209, 0.05)",
                        border: "1px solid rgba(0, 255, 209, 0.3)"
                      }}
                    >
                      <svg className="w-5 h-5 relative z-10 text-[var(--ifm-color-primary)] group-hover:text-[var(--ifm-color-primary-lighter)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "rgba(0, 255, 209, 0.08)" }}
                      />
                    </button>
                  </div>

                  {christopherFormStatus === "error" && (
                    <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30">
                      <p className="text-red-400 text-sm">
                        <Translate id="contactus.error">An error occurred while sending your message.</Translate>
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleChristopherSubmit} className="flex-1 flex flex-col">
                    <input
                      type="text"
                      name="website"
                      value={christopherFormData.website}
                      onChange={handleChristopherChange}
                      style={{ display: "none" }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <label className="block mb-4">
                      <span className="block text-sm font-bold mb-2 text-gray-300">Name</span>
                      <input
                        type="text"
                        name="name"
                        className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-[#00FFD1] transition-colors"
                        value={christopherFormData.name}
                        onChange={handleChristopherChange}
                        required
                      />
                    </label>

                    <label className="block mb-4">
                      <span className="block text-sm font-bold mb-2 text-gray-300">E-Mail</span>
                      <input
                        type="email"
                        name="email"
                        className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-[#00FFD1] transition-colors"
                        value={christopherFormData.email}
                        onChange={handleChristopherChange}
                        required
                      />
                    </label>

                    <label className="flex-1 flex flex-col mb-6">
                      <span className="block text-sm font-bold mb-2 text-gray-300">
                        <Translate id="contactus.form.1">Message</Translate>
                      </span>
                      <textarea
                        name="message"
                        className="flex-1 w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-[#00FFD1] transition-colors resize-none min-h-[100px]"
                        value={christopherFormData.message}
                        onChange={handleChristopherChange}
                        required
                      ></textarea>
                    </label>

                    <button
                      type="submit"
                      className="text-black w-full font-bold py-4 px-6 button button--primary button--md transition-all hover:scale-[1.02]"
                    >
                      <Translate id="contactus.buttonsend">Send</Translate>
                    </button>
                  </form>
                </>
              )}

              {christopherMode === "booking" && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-200">
                      <Translate id="contactus.booking.title">Schedule a Meeting</Translate>
                    </h3>
                    <button
                      onClick={() => setChristopherMode("select")}
                      className="group relative p-2 overflow-hidden transition-all duration-300"
                      style={{
                        background: "rgba(0, 255, 209, 0.05)",
                        border: "1px solid rgba(0, 255, 209, 0.3)"
                      }}
                    >
                      <svg className="w-5 h-5 relative z-10 text-[var(--ifm-color-primary)] group-hover:text-[var(--ifm-color-primary-lighter)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "rgba(0, 255, 209, 0.08)" }}
                      />
                    </button>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-400">
                      <Translate id="contactus.christopher.booking.coming">Meeting scheduling coming soon</Translate>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
