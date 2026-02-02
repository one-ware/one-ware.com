import React, { useState, useMemo, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { FAQ_DATA, FAQ_CATEGORIES, FAQ_CATEGORY_LABELS, FAQ } from "../../data/faqData";
import { translate } from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useColorMode } from "@docusaurus/theme-common";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  isDarkMode: boolean;
}

interface QuestionFormData {
  name: string;
  email: string;
  message: string;
  website: string;
  recaptcha_token: string;
}

const RECAPTCHA_SITE_KEY = "6Ldzg-orAAAAAIOc5GaUtR6gOpdqcW1EHZL7I9mp";
const API_URL = "https://contact.one-ware.com/send";

function getLocalizedField<T extends Record<string, unknown>>(obj: T, field: keyof T, locale: string): unknown {
  if (locale === "de") {
    const deKey = `${String(field)}_de` as keyof T;
    if (obj[deKey] !== undefined) {
      return obj[deKey];
    }
  }
  return obj[field];
}

function getLocalizedFAQ(faq: FAQ, locale: string): { question: string; answer: string } {
  return {
    question: getLocalizedField(faq, "question", locale) as string,
    answer: getLocalizedField(faq, "answer", locale) as string,
  };
}

function getCategoryLabel(category: string, locale: string): string {
  const labels = FAQ_CATEGORY_LABELS[category];
  if (labels) {
    return locale === "de" ? labels.de : labels.en;
  }
  return category;
}

function FAQItem({ question, answer, isOpen, onToggle, isDarkMode }: FAQItemProps) {
  const primaryColor = isDarkMode ? "#00FFD1" : "#00a88a";
  const textColor = isDarkMode ? "#e0e0e0" : "#374151";
  const bgClosed = isDarkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.03)";
  const borderClosed = isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)";
  const hoverBg = isDarkMode ? "rgba(0, 255, 209, 0.05)" : "rgba(0, 168, 138, 0.05)";

  return (
    <div
      style={{
        background: isOpen
          ? isDarkMode
            ? "linear-gradient(135deg, rgba(0, 255, 209, 0.08), rgba(0, 255, 209, 0.03))"
            : "linear-gradient(135deg, rgba(0, 168, 138, 0.08), rgba(0, 168, 138, 0.03))"
          : bgClosed,
        border: isOpen
          ? isDarkMode
            ? "1px solid rgba(0, 255, 209, 0.3)"
            : "1px solid rgba(0, 168, 138, 0.3)"
          : borderClosed,
        borderRadius: "12px",
        marginBottom: "12px",
        overflow: "hidden",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: isOpen ? `inset 3px 0 0 0 ${primaryColor}` : "none",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          textAlign: "left",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          transition: "background 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = hoverBg;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
        }}
      >
        <span
          style={{
            fontWeight: "bold",
            color: isOpen ? primaryColor : textColor,
            fontSize: "18px",
            paddingRight: "16px",
            transition: "color 0.3s ease",
            lineHeight: 1.4,
          }}
        >
          {question}
        </span>
        <span
          style={{
            color: primaryColor,
            fontSize: "1.25rem",
            fontWeight: 400,
            lineHeight: 1,
            flexShrink: 0,
            width: "24px",
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <p
            style={{
              padding: "0 20px 20px 20px",
              color: textColor,
              fontSize: "18px",
              lineHeight: 1.6,
              margin: 0,
              opacity: isOpen ? 1 : 0,
              transition: "opacity 0.3s ease 0.1s",
            }}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

function QuestionForm() {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale;
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const [formData, setFormData] = useState<QuestionFormData>({
    name: "",
    email: "",
    message: "",
    website: "",
    recaptcha_token: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const primaryColor = isDarkMode ? "#00FFD1" : "#00a88a";
  const primaryColorRgba = isDarkMode ? "0, 255, 209" : "0, 168, 138";
  const textColor = isDarkMode ? "#e0e0e0" : "#374151";
  const inputBg = isDarkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.8)";
  const inputBorder = isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";

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

    setIsSubmitting(true);

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
        alert(translate({ id: "faq.form.success", message: "Your question has been sent successfully!" }));
        setFormData({ name: "", email: "", message: "", website: "", recaptcha_token: "" });
      } else {
        alert(translate({ id: "faq.form.error", message: "Failed to send your question. Please try again." }));
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert(translate({ id: "faq.form.errorGeneral", message: "An error occurred while sending your question." }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    background: inputBg,
    border: `1px solid ${inputBorder}`,
    borderRadius: "12px",
    color: isDarkMode ? "#e0e0e0" : "#1a1a1a",
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "16px",
    fontWeight: "bold",
    color: textColor,
    marginBottom: "8px",
  };

  return (
    <div
      style={{
        background: isDarkMode
          ? "linear-gradient(135deg, rgba(0, 255, 209, 0.1), rgba(0, 255, 209, 0.05))"
          : "linear-gradient(135deg, rgba(0, 168, 138, 0.1), rgba(0, 168, 138, 0.05))",
        border: isDarkMode ? "1px solid rgba(0, 255, 209, 0.2)" : "1px solid rgba(0, 168, 138, 0.2)",
        borderRadius: "20px",
        padding: "32px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
          <div>
            <label style={labelStyle}>{translate({ id: "faq.form.name", message: "Name" })}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = `rgba(${primaryColorRgba}, 0.5)`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = inputBorder;
              }}
            />
          </div>
          <div>
            <label style={labelStyle}>{translate({ id: "faq.form.email", message: "E-Mail" })}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = `rgba(${primaryColorRgba}, 0.5)`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = inputBorder;
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>{translate({ id: "faq.form.question", message: "Your Question" })}</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={2}
            style={{
              ...inputStyle,
              resize: "none",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = `rgba(${primaryColorRgba}, 0.5)`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = inputBorder;
            }}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            padding: "12px 32px",
            background: primaryColor,
            border: "none",
            borderRadius: "8px",
            color: isDarkMode ? "#000000" : "#ffffff",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
            opacity: isSubmitting ? 0.7 : 1,
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.background = isDarkMode ? "#00e6be" : "#008f75";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = primaryColor;
          }}
        >
          {isSubmitting ? translate({ id: "faq.form.sending", message: "Sending..." }) : translate({ id: "faq.form.submit", message: "Submit" })}
        </button>
      </form>
    </div>
  );
}

function FAQSearch() {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale;
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const primaryColor = isDarkMode ? "#00FFD1" : "#00a88a";
  const primaryColorRgba = isDarkMode ? "0, 255, 209" : "0, 168, 138";
  const textColor = isDarkMode ? "#e0e0e0" : "#374151";
  const mutedTextColor = isDarkMode ? "#a0a0a0" : "#6b7280";
  const inputBg = isDarkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.8)";
  const inputBorder = isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";

  const filteredFAQs = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }
    const query = searchQuery.toLowerCase();
    return FAQ_DATA.filter((faq) => {
      const localized = getLocalizedFAQ(faq, locale);
      return (
        localized.question.toLowerCase().includes(query) ||
        localized.answer.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, locale]);

  const filteredByCategory = useMemo(() => {
    const grouped: Record<string, typeof FAQ_DATA> = {};
    FAQ_CATEGORIES.forEach((category) => {
      const faqs = filteredFAQs.filter((faq) => faq.category === category);
      if (faqs.length > 0) {
        grouped[category] = faqs;
      }
    });
    return grouped;
  }, [filteredFAQs]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div style={{ marginBottom: "32px" }}>
      <div style={{ position: "relative" }}>
        <svg
          style={{
            position: "absolute",
            left: "16px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "20px",
            height: "20px",
            color: primaryColor,
          }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={translate({ id: "faq.search.placeholder", message: "Search questions..." })}
          style={{
            width: "100%",
            paddingLeft: "48px",
            paddingRight: "16px",
            paddingTop: "14px",
            paddingBottom: "14px",
            background: inputBg,
            border: `1px solid ${inputBorder}`,
            borderRadius: "12px",
            color: isDarkMode ? "#ffffff" : "#1a1a1a",
            fontSize: "1rem",
            outline: "none",
            transition: "border-color 0.2s ease",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = `rgba(${primaryColorRgba}, 0.5)`;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = inputBorder;
          }}
        />
      </div>

      {searchQuery.trim() && (
        <div style={{ marginTop: "24px" }}>
          {Object.keys(filteredByCategory).length > 0 ? (
            Object.entries(filteredByCategory).map(([category, faqs]) => (
              <div key={category} style={{ marginBottom: "32px" }}>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    color: primaryColor,
                    marginBottom: "16px",
                    paddingBottom: "8px",
                    borderBottom: `1px solid rgba(${primaryColorRgba}, 0.2)`,
                  }}
                >
                  {getCategoryLabel(category, locale)}
                </h3>
                {faqs.map((faq) => {
                  const localized = getLocalizedFAQ(faq, locale);
                  return (
                    <FAQItem
                      key={faq.id}
                      question={localized.question}
                      answer={localized.answer}
                      isOpen={openItems.has(faq.id)}
                      onToggle={() => toggleItem(faq.id)}
                      isDarkMode={isDarkMode}
                    />
                  );
                })}
              </div>
            ))
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "32px 24px",
                background: isDarkMode ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.03)",
                borderRadius: "12px",
                border: `1px solid ${inputBorder}`,
              }}
            >
              <p style={{ color: textColor, marginBottom: "8px" }}>
                {translate({ id: "faq.search.noResults", message: "No questions found for \"{searchQuery}\"" }, { searchQuery })}
              </p>
              <p style={{ color: mutedTextColor, fontSize: "0.875rem" }}>
                {translate({ id: "faq.search.tryDifferent", message: "Try a different search term or submit your question below." })}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface FAQCategoryProps {
  category: string;
}

function FAQCategory({ category }: FAQCategoryProps) {
  const { i18n } = useDocusaurusContext();
  const locale = i18n.currentLocale;
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const faqs = useMemo(() => {
    return FAQ_DATA.filter((faq) => faq.category === category);
  }, [category]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (faqs.length === 0) return null;

  return (
    <div>
      {faqs.map((faq) => {
        const localized = getLocalizedFAQ(faq, locale);
        return (
          <FAQItem
            key={faq.id}
            question={localized.question}
            answer={localized.answer}
            isOpen={openItems.has(faq.id)}
            onToggle={() => toggleItem(faq.id)}
            isDarkMode={isDarkMode}
          />
        );
      })}
    </div>
  );
}

export default function FAQSection() {
  return <FAQSearch />;
}

export { QuestionForm, FAQCategory, FAQSearch };
