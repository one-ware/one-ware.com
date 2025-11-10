import React, { useState, useEffect, ChangeEvent, FormEvent, JSX } from "react";
import axios from "axios";
import { CiLinkedin, CiMail } from "react-icons/ci";
import Translate, { translate } from "@docusaurus/Translate";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

interface FormData {
  name: string;
  email: string;
  message: string;
  website: string; // honeypot
  recaptcha_token: string;
}

export default function ContactUs() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    website: "",
    recaptcha_token: "",
  });

  // 🧠 Load reCAPTCHA safely for SSR + TypeScript
  useEffect(() => {
    if (typeof window === "undefined") return; // skip SSR entirely

    const RECAPTCHA_SITE_KEY = "6Ldzg-orAAAAAIOc5GaUtR6gOpdqcW1EHZL7I9mp";

    // ✅ Helper: Wait until grecaptcha is defined (poll every 200ms)
    const waitForRecaptcha = (maxAttempts = 20) =>
      new Promise<void>((resolve, reject) => {
        let attempts = 0;
        const check = () => {
          if (typeof window !== "undefined" && window.grecaptcha) {
            resolve();
          } else if (attempts++ < maxAttempts) {
            setTimeout(check, 200);
          } else {
            reject(new Error("reCAPTCHA not loaded after waiting"));
          }
        };
        check();
      });

    const executeRecaptcha = async () => {
      try {
        await waitForRecaptcha(); // wait until grecaptcha is available
        if (!window.grecaptcha) throw new Error("grecaptcha missing after load");

        await new Promise<void>((resolve) => {
          window.grecaptcha.ready(() => {
            window.grecaptcha
              ?.execute(RECAPTCHA_SITE_KEY, { action: "submit" })
              .then((token) => {
                setFormData((prev) => ({ ...prev, recaptcha_token: token }));
                resolve();
              })
              .catch((err) => {
                console.warn("reCAPTCHA execute failed:", err);
                resolve(); // don't crash app
              });
          });
        });
      } catch (err) {
        console.warn("reCAPTCHA init failed:", err);
      }
    };

    // --- Safe script injection (no unhandled rejection) ---
    if (!document.querySelector("#recaptcha-script")) {

      if (process.env.NODE_ENV === "development") return;
      
      try {
        const script = document.createElement("script");
        script.id = "recaptcha-script";
        script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
        script.async = true;
        script.defer = true;

        // Never call an async fn directly here — wrap it
        script.onload = () => {
          executeRecaptcha().catch((err) =>
            console.warn("reCAPTCHA onload error:", err)
          );
        };
        
        script.onerror = (err) =>
          console.warn("reCAPTCHA script load error:", err);
        
        document.body.appendChild(script);
      } catch (err) {
        console.warn("reCAPTCHA append failed:", err);
      }
    } else {
      executeRecaptcha().catch((err) =>
        console.warn("reCAPTCHA execute error:", err)
      );
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.website.trim() !== "") {
      console.warn("Bot detected — submission ignored.");
      return;
    }

    try {
      const response = await axios.post("https://contact.one-ware.com/send", formData);
      const status = response.data.status;

      if (status === "success") {
        alert(translate({ id: "contactus.success", message: "Message sent successfully!" }));
        setFormData({ name: "", email: "", message: "", website: "", recaptcha_token: "" });
      } else {
        alert(translate({ id: "contactus.failed", message: "Message failed to send." + status }));
      }
    } catch (err: unknown) {
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
        <div className="flex flex-col lg:flex-row gap-8 items-start max-w-7xl mx-auto">
          {/* --- Leo Sales Section --- */}
          <div className="w-full lg:w-1/2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700 h-full text-center">
              <div className="mb-6">
                <img
                  src={require("@site/static/img/AboutUs/Leo.png").default}
                  alt="Leo Wiegand - Sales Representative"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-[#00FFD1]/20 mx-auto"
                />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Leo Wiegand</h3>
              <p className="text-[#00FFD1] font-semibold mb-4 text-lg">
                <Translate id="contactus.leo.role">Your Sales Contact</Translate>
              </p>
              <p className="text-gray-300 mb-8 leading-relaxed text-base md:text-lg max-w-md mx-auto">
                <Translate id="contactus.leo.description">
                  Leo is our sales expert who takes care of projects of all kinds. Whether you need evaluations for ideas, custom quotes, partnership opportunities, or strategic consulting - Leo is your go-to contact for business inquiries.
                </Translate>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:sales@one-ware.com?subject=Business Inquiry"
                  className="inline-flex items-center justify-center px-6 py-3 bg-[#00FFD1] text-black font-semibold rounded-lg hover:bg-[#00FFD1]/90 transition-colors duration-300"
                >
                  <CiMail className="w-5 h-5 mr-2" />
                  <Translate id="contactus.leo.cta">Send E-Mail</Translate>
                </a>
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
          </div>

          {/* --- Contact Form --- */}
          <div className="w-full lg:w-1/2">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700 h-full">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-200">
                <Translate id="contactus.form.title">Send us a message directly</Translate>
              </h3>

              <form onSubmit={handleSubmit}>
                {/* 🪤 Honeypot field */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-bold mb-2 text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:border-[#00FFD1] transition-colors"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-bold mb-2 text-gray-300">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:border-[#00FFD1] transition-colors"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-8">
                  <label htmlFor="message" className="block text-sm font-bold mb-2 text-gray-300">
                    <Translate id="contactus.form.1">Message</Translate>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:border-[#00FFD1] transition-colors resize-none"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="text-black w-full font-bold py-4 px-6 button button--primary button--md transition-all hover:scale-[1.02]"
                >
                  <Translate id="contactus.buttonsend">Send</Translate>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
