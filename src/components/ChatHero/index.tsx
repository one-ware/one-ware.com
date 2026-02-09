import React, { useState, useEffect } from "react";
import Translate from "@docusaurus/Translate";
import { useColorMode } from "@docusaurus/theme-common";
import SignUpModal, { ModalTrigger } from "./SignUpModal";
import HeroBackground from "../HeroBackground";

const STORAGE_KEY = "chathero_prompt";
const STORAGE_EXPIRY_DAYS = 90;

function getStoredPrompt(): string {
  if (typeof window === "undefined") return "";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return "";
    const { value, expiry } = JSON.parse(stored);
    if (Date.now() > expiry) {
      localStorage.removeItem(STORAGE_KEY);
      return "";
    }
    return value || "";
  } catch {
    return "";
  }
}

function savePrompt(value: string) {
  if (typeof window === "undefined") return;
  try {
    const expiry = Date.now() + STORAGE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ value, expiry }));
  } catch {}
}

export default function ChatHero() {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTrigger, setModalTrigger] = useState<ModalTrigger>("send");
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    setPrompt(getStoredPrompt());
  }, []);

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setPrompt(value);
    savePrompt(value);
  };

  const handleAttachClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalTrigger("attach");
    setIsModalOpen(true);
  };

  const handleSendClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalTrigger("send");
    setIsModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 60;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <HeroBackground
      className="px-4 sm:px-6 md:px-12 lg:px-16"
      style={{
        minHeight: "100vh",
        marginTop: "calc(var(--ifm-navbar-height) * -1)",
        paddingTop: "var(--ifm-navbar-height)",
      }}
    >
      <div className="flex flex-col items-center justify-center min-h-screen relative">
        <div className="w-full max-w-3xl flex flex-col items-center text-center gap-8 sm:gap-12 relative">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--ifm-color-primary)]"
          style={{
            animation: "fadeInUp 0.8s ease-out forwards",
            opacity: 0,
          }}
        >
          <Translate id="chathero.title">Create your Custom AI</Translate>
        </h1>

        <p
          className={`text-lg sm:text-xl md:text-2xl max-w-2xl ${isDarkMode ? "text-white" : "text-gray-800"}`}
          style={{
            animation: "fadeInUp 0.8s ease-out forwards",
            animationDelay: "0.1s",
            opacity: 0,
          }}
        >
          <Translate id="chathero.subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
          </Translate>
        </p>

        <div
          className="w-full max-w-2xl"
          style={{
            animation: "fadeInUp 0.8s ease-out forwards",
            animationDelay: "0.2s",
            opacity: 0,
          }}
        >
          <div
            className="transition-all duration-300"
            style={{
              background: isDarkMode ? "rgba(40, 40, 40, 0.7)" : "rgba(245, 245, 245, 0.7)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: isDarkMode ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.1)",
              borderRadius: "12px",
              boxShadow: isDarkMode ? "0 4px 24px rgba(0, 0, 0, 0.3)" : "0 4px 24px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="p-4">
              <textarea
                value={prompt}
                onChange={handlePromptChange}
                placeholder="Describe your AI idea..."
                className={`w-full min-h-[150px] bg-transparent border-none text-base leading-relaxed resize-none focus:outline-none ${isDarkMode ? "text-white placeholder-gray-400" : "text-gray-900 placeholder-gray-500"}`}
              />

              <div className="flex items-center justify-between pt-3 mt-3" style={{ borderTop: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)" }}>
                <button
                  type="button"
                  onClick={handleAttachClick}
                  className="flex items-center justify-center p-1.5 bg-transparent border-none cursor-pointer transition-opacity hover:opacity-80"
                  aria-label="Attach files"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={isDarkMode ? "text-gray-400" : "text-gray-500"}
                  >
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={handleSendClick}
                  className="flex items-center justify-center w-8 h-8 rounded-full border-none cursor-pointer shrink-0 transition-all duration-200 hover:opacity-90 bg-[var(--ifm-color-primary)]"
                  aria-label="Send message"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-black"
                  >
                    <line x1="12" y1="19" x2="12" y2="5" />
                    <polyline points="5 12 12 5 19 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12 mt-4"
          style={{
            animation: "fadeInUp 0.8s ease-out forwards",
            animationDelay: "0.3s",
            opacity: 0,
          }}
        >
          <button
            onClick={() => scrollToSection("demo")}
            className="chathero-btn-outline button button--primary button--outline button--lg"
            style={{ background: isDarkMode ? "#161616" : "#ffffff" }}
          >
            <Translate id="chathero.button.howitworks">See How It Works</Translate>
          </button>
          <button
            onClick={() => scrollToSection("video")}
            className="chathero-btn-filled button button--primary button--lg"
          >
            <Translate id="chathero.button.showcase">Showcase</Translate>
          </button>
        </div>
        </div>

        <div
          className="absolute right-6 md:right-12 lg:right-16 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-start gap-3 max-w-[250px]"
          style={{
            animation: "fadeInUp 0.8s ease-out forwards",
            animationDelay: "0.4s",
            opacity: 0,
          }}
        >
          <span className={`text-base font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            <Translate id="chathero.professional.prefix">Already an AI expert?</Translate>
          </span>
          <a
            href="/studio"
            className={`text-base no-underline cursor-pointer transition-opacity hover:opacity-80 p-0 flex items-center gap-2 text-left ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}
          >
            <Translate id="chathero.professional.link">Explore our Tools for Professionals</Translate>
            <svg className="shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </a>
        </div>
      </div>

      <SignUpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        trigger={modalTrigger}
      />

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .chathero-btn-outline:hover {
          background: var(--ifm-color-primary) !important;
          color: #000 !important;
        }
        .chathero-btn-filled:hover {
          background: transparent !important;
          border: 1px solid var(--ifm-color-primary) !important;
          color: var(--ifm-color-primary) !important;
        }
      `}</style>
    </HeroBackground>
  );
}
