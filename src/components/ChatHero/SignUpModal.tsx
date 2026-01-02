import React, { useEffect } from "react";
import Translate from "@docusaurus/Translate";

export type ModalTrigger = "attach" | "send";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  trigger: ModalTrigger;
}

export default function SignUpModal({ isOpen, onClose, trigger }: SignUpModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0, 0, 0, 0.8)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md p-8 flex flex-col items-center gap-6"
        style={{
          background: "rgba(30, 30, 30, 0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          animation: "modalFadeIn 0.2s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          {trigger === "attach" ? (
            <>
              <h2 className="text-2xl font-bold text-white">
                <Translate id="signupmodal.attach.title">Sign in to upload files</Translate>
              </h2>
              <p className="text-gray-400">
                <Translate id="signupmodal.attach.subtitle">
                  Support for up to 10 files of any file type
                </Translate>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-white">
                <Translate id="signupmodal.send.title">Sign in to create your AI</Translate>
              </h2>
              <p className="text-gray-400">
                <Translate id="signupmodal.send.subtitle">
                  Get started with your custom AI model
                </Translate>
              </p>
            </>
          )}
        </div>

        <div className="flex items-center gap-4 w-full">
          <button className="button button--primary button--lg flex-1">
            <Translate id="signupmodal.button.signin">Sign In</Translate>
          </button>
          <button
            onClick={onClose}
            className="button button--secondary button--lg flex-1"
            style={{
              background: "transparent",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "white",
            }}
          >
            <Translate id="signupmodal.button.cancel">Cancel</Translate>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
