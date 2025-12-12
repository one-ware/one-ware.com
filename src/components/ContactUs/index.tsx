import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { CiLinkedin } from "react-icons/ci";
import Translate, { translate } from "@docusaurus/Translate";

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
const API_URL = "https://contact.one-ware.com/send";

type ContactMode = "select" | "form" | "booking";

export default function ContactUs() {
  const [mode, setMode] = useState<ContactMode>("select");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    website: "",
    recaptcha_token: "",
  });

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

      const { status } = response.data;

      if (status === "success") {
        alert(translate({ id: "contactus.success", message: "Message sent successfully!" }));
        setFormData({ name: "", email: "", message: "", website: "", recaptcha_token: "" });
      } else {
        alert(translate({ id: "contactus.failed", message: "Message failed to send." }));
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert(translate({ id: "contactus.error", message: "An error occurred while sending your message." }));
    }
  };

  return (
    <div className="text-center w-full">
      <div className="max-w-4xl mx-auto mb-8">
        <h2 className="text-3xl md:text-5xl font-bold">
          <Translate id="contactus.headline">Interested? Contact us!</Translate>
        </h2>
      </div>

      <div className="mt-12 mb-4 w-full px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch max-w-7xl mx-auto">
          <div className="w-full lg:w-1/2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700 h-full text-center">
              <img
                src={require("@site/static/img/AboutUs/Leo.png").default}
                alt="Leo Wiegand - Sales Representative"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-[#00FFD1]/20 mx-auto mb-6"
              />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Leo Wiegand</h3>
              <p className="text-[#00FFD1] font-semibold mb-4 text-lg">
                <Translate id="contactus.leo.role">Your Sales Contact</Translate>
              </p>
              <p className="text-gray-300 mb-8 leading-relaxed text-base md:text-lg max-w-md mx-auto">
                <Translate id="contactus.leo.description">
                  Leo is our sales expert who takes care of projects of all kinds. Whether you need evaluations for ideas,
                  custom quotes, partnership opportunities, or strategic consulting — Leo is your go-to contact for
                  business inquiries.
                </Translate>
              </p>
              <a
                href="https://www.linkedin.com/in/leo-wiegand-b27aa0272/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-[#00FFD1] text-[#00FFD1] font-semibold rounded-lg hover:bg-[#00FFD1]/10 transition-colors duration-300"
              >
                <CiLinkedin className="w-5 h-5 mr-2" />
                LinkedIn
              </a>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700 h-full flex flex-col">
              {mode === "select" && (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-200">
                    <Translate id="contactus.select.title">How would you like to reach us?</Translate>
                  </h3>
                  <p className="text-gray-400 mb-8 max-w-md">
                    <Translate id="contactus.select.description">
                      Send us a quick message for general inquiries, or book a meeting directly to discuss your project in detail with our team.
                    </Translate>
                  </p>
                  <div className="flex flex-col gap-4 w-full max-w-sm">
                    <button
                      onClick={() => setMode("form")}
                      className="group relative px-8 py-4 rounded-xl font-medium overflow-hidden transition-all duration-300 w-full"
                      style={{
                        background: "rgba(0, 255, 209, 0.05)",
                        border: "1px solid rgba(0, 255, 209, 0.3)"
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3 text-[var(--ifm-color-primary)] group-hover:text-[var(--ifm-color-primary-lighter)] transition-colors">
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
                    <button
                      onClick={() => setMode("booking")}
                      className="group relative px-8 py-4 rounded-xl font-medium overflow-hidden transition-all duration-300 w-full"
                      style={{
                        background: "rgba(0, 255, 209, 0.05)",
                        border: "1px solid rgba(0, 255, 209, 0.3)"
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3 text-[var(--ifm-color-primary)] group-hover:text-[var(--ifm-color-primary-lighter)] transition-colors">
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

              {mode === "form" && (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-200">
                      <Translate id="contactus.form.title">Send us a message directly</Translate>
                    </h3>
                    <button
                      onClick={() => setMode("select")}
                      className="group relative p-2 rounded-lg overflow-hidden transition-all duration-300"
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

                  <form onSubmit={handleSubmit} className="flex-1">
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      style={{ display: "none" }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <label className="block mb-6">
                      <span className="block text-sm font-bold mb-2 text-gray-300">Name</span>
                      <input
                        type="text"
                        name="name"
                        className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:border-[#00FFD1] transition-colors"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </label>

                    <label className="block mb-6">
                      <span className="block text-sm font-bold mb-2 text-gray-300">E-Mail</span>
                      <input
                        type="email"
                        name="email"
                        className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:border-[#00FFD1] transition-colors"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </label>

                    <label className="block mb-8">
                      <span className="block text-sm font-bold mb-2 text-gray-300">
                        <Translate id="contactus.form.1">Message</Translate>
                      </span>
                      <textarea
                        name="message"
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:border-[#00FFD1] transition-colors resize-none"
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
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-200">
                      <Translate id="contactus.booking.title">Schedule a Meeting</Translate>
                    </h3>
                    <button
                      onClick={() => setMode("select")}
                      className="group relative p-2 rounded-lg overflow-hidden transition-all duration-300"
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
        </div>
      </div>
    </div>
  );
}
