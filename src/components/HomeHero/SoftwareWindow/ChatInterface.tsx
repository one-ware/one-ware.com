import React, { useState, useEffect, useRef } from "react";
import Translate, { translate } from "@docusaurus/Translate";

interface ChatMessage {
  id: number;
  sender: "user" | "ai";
  contentId: string;
  defaultContent: string;
  delay: number;
  hasButton?: boolean;
}

const chatMessages: ChatMessage[] = [
  {
    id: 1,
    sender: "user",
    contentId: "homehero.chat.user1",
    defaultContent: "Make Apple QC",
    delay: 600,
  },
  {
    id: 2,
    sender: "ai",
    contentId: "homehero.chat.ai1",
    defaultContent: "Should I help with dataset or hardware for recording?",
    delay: 2000,
  },
  {
    id: 3,
    sender: "user",
    contentId: "homehero.chat.user2",
    defaultContent: "I already have training data",
    delay: 3500,
  },
  {
    id: 4,
    sender: "ai",
    contentId: "homehero.chat.ai2",
    defaultContent: "Here is your finished ONE AI project",
    delay: 5200,
    hasButton: true,
  },
];

interface ChatHistoryItem {
  id: string;
  titleId: string;
  defaultTitle: string;
  isCurrent?: boolean;
}

const chatHistory: ChatHistoryItem[] = [
  { id: "apple", titleId: "homehero.chat.history.apple", defaultTitle: "Apple QC", isCurrent: true },
  { id: "fruit", titleId: "homehero.chat.history.fruit", defaultTitle: "Fruit Sorting" },
  { id: "pcb", titleId: "homehero.chat.history.pcb", defaultTitle: "PCB Inspection" },
];

interface ChatInterfaceProps {
  onComplete: () => void;
  isActive: boolean;
}

export default function ChatInterface({ onComplete, isActive }: ChatInterfaceProps) {
  const [conversationStarted, setConversationStarted] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messageTimersRef = useRef<NodeJS.Timeout[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const startConversation = () => {
    setConversationStarted(true);
  };

  useEffect(() => {
    if (messagesEndRef.current && messagesEndRef.current.parentElement) {
      const container = messagesEndRef.current.parentElement;
      container.scrollTop = container.scrollHeight;
    }
  }, [visibleMessages]);

  useEffect(() => {
    if (!isActive || !conversationStarted) {
      return;
    }

    chatMessages.forEach((msg) => {
      if (msg.sender === "ai") {
        const typingTimer = setTimeout(() => {
          setIsTyping(true);
        }, msg.delay - 800);
        messageTimersRef.current.push(typingTimer);
      }

      const timer = setTimeout(() => {
        setIsTyping(false);
        setVisibleMessages((prev) => [...prev, msg.id]);
      }, msg.delay);
      messageTimersRef.current.push(timer);
    });

    return () => {
      messageTimersRef.current.forEach(timer => clearTimeout(timer));
      messageTimersRef.current = [];
    };
  }, [isActive, conversationStarted]);

  const handleButtonClick = () => {
    onComplete();
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        gap: "clamp(8px, 1.5vw, 16px)",
        alignItems: "stretch",
        overflow: "hidden",
      }}
    >
      <div
        className="chat-history-panel"
        style={{
          minWidth: 0,
          flexShrink: 0,
          height: "100%",
          background: "var(--glass-surface)",
          borderRadius: "8px",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(var(--blur-strength))",
          WebkitBackdropFilter: "blur(var(--blur-strength))",
          display: "flex",
          flexDirection: "column",
          padding: "clamp(8px, 1.5vw, 14px)",
          boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.03)",
          overflow: "hidden",
        }}
      >
        <div className="oneware-section-header" style={{ marginBottom: "12px" }}>
          <Translate id="homehero.chat.history.title">History</Translate>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
          {chatHistory.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 10px",
                borderRadius: "6px",
                fontSize: "11px",
                color: item.isCurrent ? "var(--ifm-color-primary)" : "rgba(255, 255, 255, 0.5)",
                background: item.isCurrent ? "rgba(255, 255, 255, 0.06)" : "transparent",
                fontWeight: item.isCurrent ? 500 : 400,
                cursor: "default",
                transition: "all 0.2s ease",
                border: item.isCurrent ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid transparent",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: item.isCurrent ? "var(--ifm-color-primary)" : "rgba(255, 255, 255, 0.2)",
                  boxShadow: item.isCurrent ? "0 0 8px var(--ifm-color-primary)" : "none",
                  flexShrink: 0,
                }}
              />
              <span style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                flex: 1,
              }}>
                <Translate id={item.titleId}>{item.defaultTitle}</Translate>
              </span>
            </div>
          ))}
        </div>

        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            padding: "8px",
            marginTop: "auto",
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "6px",
            color: "rgba(255, 255, 255, 0.5)",
            fontSize: "10px",
            fontWeight: 500,
            cursor: "default",
            transition: "all 0.2s ease",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            pointerEvents: "none",
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <Translate id="homehero.chat.newchat">New</Translate>
        </button>
      </div>

      <div
        style={{
          flex: 1,
          minWidth: 0,
          height: "100%",
          background: "var(--glass-surface)",
          borderRadius: "8px",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(var(--blur-strength))",
          WebkitBackdropFilter: "blur(var(--blur-strength))",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.03)",
        }}
      >
        <div
          style={{
            flex: 1,
            padding: "clamp(12px, 2vw, 20px)",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
          className="scrollbar-thin"
        >
          {!conversationStarted ? (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ifm-color-primary)" strokeWidth="1.5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{
                  fontSize: "12px",
                  color: "rgba(255, 255, 255, 0.4)",
                  margin: 0,
                  maxWidth: "200px",
                }}>
                  <Translate id="homehero.chat.welcome.desc">
                    Describe what you want to build
                  </Translate>
                </p>
              </div>
              <button
                onClick={startConversation}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 24px",
                  background: "var(--ifm-color-primary)",
                  border: "none",
                  borderRadius: "8px",
                  color: "#000",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "transform 0.2s ease",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <Translate id="homehero.chat.welcome.button">Start Demo</Translate>
              </button>
            </div>
          ) : (
            <>
              {chatMessages.map((msg) => {
                const isVisible = visibleMessages.includes(msg.id);
                const isUser = msg.sender === "user";

                if (!isVisible) return null;

                return (
                  <div
                    key={msg.id}
                    style={{
                      display: "flex",
                      justifyContent: isUser ? "flex-end" : "flex-start",
                      alignItems: "flex-start",
                      gap: "8px",
                      animation: "chatMessageIn 0.3s ease-out",
                    }}
                  >
                    {!isUser && (
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "6px",
                          background: "var(--ifm-color-primary)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="3" />
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                        </svg>
                      </div>
                    )}
                    <div
                      style={{
                        maxWidth: "70%",
                        padding: "10px 14px",
                        borderRadius: isUser ? "10px 10px 2px 10px" : "10px 10px 10px 2px",
                        background: isUser
                          ? "var(--ifm-color-primary)"
                          : "rgba(255, 255, 255, 0.06)",
                        border: isUser ? "none" : "1px solid rgba(255, 255, 255, 0.08)",
                        color: isUser ? "#000" : "rgba(255, 255, 255, 0.85)",
                        fontSize: "12px",
                        lineHeight: 1.5,
                        fontWeight: isUser ? 500 : 400,
                      }}
                    >
                      <Translate id={msg.contentId}>{msg.defaultContent}</Translate>

                      {msg.hasButton && (
                        <button
                          onClick={handleButtonClick}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "6px",
                            marginTop: "10px",
                            padding: "8px 14px",
                            background: "var(--ifm-color-primary)",
                            color: "#000",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "11px",
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            width: "100%",
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                          <Translate id="homehero.chat.button.open">Open Project</Translate>
                        </button>
                      )}
                    </div>
                    {isUser && (
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "6px",
                          background: "rgba(255, 255, 255, 0.08)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}

              {isTyping && (
                <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", animation: "chatMessageIn 0.3s ease-out" }}>
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "6px",
                      background: "var(--ifm-color-primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                  </div>
                  <div
                    style={{
                      padding: "12px 16px",
                      borderRadius: "10px 10px 10px 2px",
                      background: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      display: "flex",
                      gap: "4px",
                      alignItems: "center",
                    }}
                  >
                    <span className="chat-typing-dot" style={{ animationDelay: "0ms" }} />
                    <span className="chat-typing-dot" style={{ animationDelay: "150ms" }} />
                    <span className="chat-typing-dot" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <div
          style={{
            padding: "clamp(6px, 1.2vw, 10px)",
            borderTop: "1px solid rgba(255, 255, 255, 0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "6px",
              padding: "2px 2px 2px 10px",
            }}
          >
            <input
              type="text"
              disabled
              placeholder={translate({
                id: "homehero.chat.input.placeholder",
                message: "Type a message...",
              })}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                padding: "8px 0",
                fontSize: "11px",
                color: "rgba(255, 255, 255, 0.4)",
                outline: "none",
              }}
            />
            <button
              disabled
              style={{
                width: "clamp(22px, 3vw, 28px)",
                height: "clamp(22px, 3vw, 28px)",
                borderRadius: "4px",
                background: "rgba(255, 255, 255, 0.06)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "not-allowed",
                opacity: 0.5,
                flexShrink: 0,
              }}
            >
              <svg
                style={{
                  width: "clamp(10px, 1.2vw, 12px)",
                  height: "clamp(10px, 1.2vw, 12px)",
                  color: "rgba(255, 255, 255, 0.5)",
                }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .chat-history-panel {
          width: clamp(100px, 18%, 180px);
        }
        @media (min-width: 768px) {
          .chat-history-panel {
            width: clamp(120px, 20%, 180px);
          }
        }
        @media (min-width: 1536px) {
          .chat-history-panel {
            width: clamp(140px, 22%, 200px);
          }
        }
        @keyframes chatMessageIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .chat-typing-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          animation: chatTypingBounce 1.4s ease-in-out infinite;
        }
        @keyframes chatTypingBounce {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </div>
  );
}
