import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Translate, { translate } from "@docusaurus/Translate";
import { Event, FormField } from "../../types/eventTypes";
import { useLocalizedEvent, useLocalizedDateFormat } from "../../hooks/useLocalizedEvent";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

interface EventRegistrationFormProps {
  event: Event;
}

interface FormData {
  name: string;
  email: string;
  website: string;
  company: string;
  [key: string]: string | string[] | boolean;
}

const RECAPTCHA_SITE_KEY = "6Ldzg-orAAAAAIOc5GaUtR6gOpdqcW1EHZL7I9mp";
const API_URL = process.env.NODE_ENV === "development"
  ? "http://localhost:3001/api/register"
  : "https://backend.one-ware.com/api/register";

export default function EventRegistrationForm({ event }: EventRegistrationFormProps) {
  const localizedEvent = useLocalizedEvent(event);
  const dateLocale = useLocalizedDateFormat();

  const initialFormData: FormData = {
    name: "",
    email: "",
    website: "",
    company: "",
  };

  if (event.formFields) {
    event.formFields.forEach((field) => {
      if (field.type === "multiselect") {
        initialFormData[field.name] = [];
      } else if (field.type === "boolean") {
        initialFormData[field.name] = false;
      } else {
        initialFormData[field.name] = "";
      }
    });
  }

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | "already_registered">("idle");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Set<string>>(new Set());
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdown && dropdownRefs.current[openDropdown] && !dropdownRefs.current[openDropdown]?.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

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

  const clearFieldError = (fieldName: string) => {
    if (fieldErrors.has(fieldName)) {
      setFieldErrors((prev) => {
        const next = new Set(prev);
        next.delete(fieldName);
        return next;
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearFieldError(name);
  };

  const handleMultiselectChange = (fieldName: string, option: string) => {
    setFormData((prev) => {
      const currentValues = (prev[fieldName] as string[]) || [];
      const newValues = currentValues.includes(option)
        ? currentValues.filter((v) => v !== option)
        : [...currentValues, option];
      return { ...prev, [fieldName]: newValues };
    });
    clearFieldError(fieldName);
  };

  const handleBooleanChange = (fieldName: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: !prev[fieldName] }));
    clearFieldError(fieldName);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString(dateLocale, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formData.website.trim()) {
      console.warn("Bot detected — submission ignored.");
      return;
    }

    const errors = new Set<string>();
    if (event.formFields) {
      event.formFields.forEach((field) => {
        if (field.required) {
          const value = formData[field.name];
          if (field.type === "multiselect") {
            if (!Array.isArray(value) || value.length === 0) {
              errors.add(field.name);
            }
          } else if (field.type === "boolean") {
            if (!value) {
              errors.add(field.name);
            }
          } else {
            if (!value || (typeof value === "string" && !value.trim())) {
              errors.add(field.name);
            }
          }
        }
      });
    }

    if (errors.size > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors(new Set());
    setIsSubmitting(true);
    setSubmitStatus("idle");

    let token = "";
    try {
      if (window.grecaptcha) {
        token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: "submit" });
      }
    } catch (err) {
      console.warn("reCAPTCHA execution failed:", err);
    }

    try {
      const fields: Record<string, string | string[] | boolean> = {};
      if (event.formFields) {
        event.formFields.forEach((field) => {
          fields[field.name] = formData[field.name];
        });
      }

      const response = await axios.post(API_URL, {
        eventId: event.id,
        eventTitle: localizedEvent.title,
        name: formData.name,
        email: formData.email,
        company: formData.company,
        recaptcha_token: token,
        fields,
      });

      if (response.data.success) {
        setSubmitStatus("success");
        setFormData(initialFormData);
      } else if (response.data.error === "already_registered") {
        setSubmitStatus("already_registered");
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLocalizedLabel = (field: FormField): string => {
    if (dateLocale === "de-DE" && field.label_de) {
      return field.label_de;
    }
    return field.label;
  };

  const getLocalizedOptions = (field: FormField): string[] => {
    if (dateLocale === "de-DE" && field.options_de && field.options_de.length === field.options?.length) {
      return field.options_de;
    }
    return field.options || [];
  };

  if (submitStatus === "success") {
    return (
      <div className="relative p-8 md:p-12 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(0, 255, 209, 0.1), rgba(0, 255, 209, 0.05))", border: "1px solid rgba(0, 255, 209, 0.2)" }}>
        <div className="text-center py-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--ifm-color-primary)]/20 flex items-center justify-center">
            <svg className="w-10 h-10 text-[var(--ifm-color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">
            <Translate id="seminars.form.success.title">Registration Successful!</Translate>
          </h3>
          <p className="text-gray-400 text-lg max-w-md mx-auto">
            <Translate id="seminars.form.success.message">
              Thank you for registering. You will receive an email with the meeting link shortly.
            </Translate>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative p-6 md:p-8 lg:p-10 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(0, 255, 209, 0.1), rgba(0, 255, 209, 0.05))", border: "1px solid rgba(0, 255, 209, 0.2)" }}>

      <div className="relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
          <Translate id="seminars.detail.registration">Registration</Translate>
        </h2>

        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">
          <div className="lg:w-[40%] space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-[var(--ifm-color-primary)] mb-4">
                {localizedEvent.title}
              </h3>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-[var(--ifm-color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span>{formatDate(localizedEvent.date)}</span>
                </div>

                {localizedEvent.time && (
                  <div className="flex items-center gap-3 text-white">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[var(--ifm-color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span>{localizedEvent.time}</span>
                  </div>
                )}

                {localizedEvent.location && (
                  <div className="flex items-center gap-3 text-white">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[var(--ifm-color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span>{localizedEvent.location}</span>
                  </div>
                )}

                {localizedEvent.language && (
                  <div className="flex items-center gap-3 text-white">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[var(--ifm-color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                    </div>
                    <span>{localizedEvent.language}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />

          <div className="lg:w-[55%]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-white/50 group-focus-within:text-[var(--ifm-color-primary)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={translate({ id: "seminars.form.name", message: "Name" }) + " *"}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/50 outline-none focus:bg-white/[0.05] focus:border-[var(--ifm-color-primary)] focus:shadow-[0_0_0_3px_rgba(0,202,165,0.15)] transition-all duration-200"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-white/50 group-focus-within:text-[var(--ifm-color-primary)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={translate({ id: "seminars.form.email", message: "E-Mail" }) + " *"}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/50 outline-none focus:bg-white/[0.05] focus:border-[var(--ifm-color-primary)] focus:shadow-[0_0_0_3px_rgba(0,202,165,0.15)] transition-all duration-200"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                      className="w-5 h-5 text-white/50 group-focus-within:text-[var(--ifm-color-primary)] transition-colors"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M10 12h4"/>
                      <path d="M10 8h4"/>
                      <path d="M14 21v-3a2 2 0 0 0-4 0v3"/>
                      <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"/>
                      <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/>
                  </svg>
                </div>
                <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={translate({id: "seminars.form.company", message: "Company"}) + " (optional)"}
                    className="w-full pl-12 pr-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/50 outline-none focus:bg-white/[0.05] focus:border-[var(--ifm-color-primary)] focus:shadow-[0_0_0_3px_rgba(0,202,165,0.15)] transition-all duration-200"
                />
              </div>

              {event.formFields && event.formFields.map((field) => (
                  <div key={field.name} className="relative group">
                    {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name] as string || ""}
                      onChange={handleChange}
                      required={field.required}
                      rows={4}
                      placeholder={getLocalizedLabel(field) + (field.required ? " *" : "")}
                      className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/50 outline-none focus:bg-white/[0.05] focus:border-[var(--ifm-color-primary)] focus:shadow-[0_0_0_3px_rgba(0,202,165,0.15)] transition-all duration-200 resize-none"
                    />
                  ) : field.type === "select" && field.options ? (
                    <div ref={(el) => { dropdownRefs.current[field.name] = el; }} className="relative">
                      <button
                        type="button"
                        onClick={() => setOpenDropdown(openDropdown === field.name ? null : field.name)}
                        className={`w-full px-4 py-3.5 text-left transition-all duration-200 flex items-center justify-between rounded-xl ${
                          fieldErrors.has(field.name)
                            ? "bg-red-500/10 border border-red-500/50"
                            : openDropdown === field.name
                              ? "bg-white/[0.05] border border-[var(--ifm-color-primary)] shadow-[0_0_0_3px_rgba(0,202,165,0.15)]"
                              : "bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] hover:border-white/20"
                        }`}
                      >
                        <span className={formData[field.name] ? "text-white" : "text-white/50"}>
                          {formData[field.name]
                            ? getLocalizedOptions(field)[field.options.indexOf(formData[field.name] as string)] || formData[field.name]
                            : getLocalizedLabel(field) + (field.required ? " *" : "")}
                        </span>
                        <svg
                          className={`w-4 h-4 text-white/50 transition-transform duration-200 ${openDropdown === field.name ? "rotate-180 text-[var(--ifm-color-primary)]" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openDropdown === field.name && (
                        <div
                          className="absolute top-[calc(100%+4px)] left-0 right-0 rounded-xl overflow-hidden z-50"
                          style={{ background: "#0d0d0d", boxShadow: "0 10px 40px rgba(0, 0, 0, 0.6)" }}
                        >
                          {(() => {
                            const options = getLocalizedOptions(field);
                            return options.map((option, idx) => {
                              const originalValue = field.options?.[idx] || option;
                              const isSelected = formData[field.name] === originalValue;
                              const isLast = idx === options.length - 1;
                              return (
                                <button
                                  key={option}
                                  type="button"
                                  onClick={() => {
                                    setFormData((prev) => ({ ...prev, [field.name]: originalValue }));
                                    setOpenDropdown(null);
                                    clearFieldError(field.name);
                                  }}
                                  className={`w-full px-4 py-2.5 text-left text-sm transition-all duration-150 flex items-center justify-between ${
                                    isSelected
                                      ? "bg-[var(--ifm-color-primary)]/10 text-[var(--ifm-color-primary)]"
                                      : "bg-white/[0.05] text-white/70 hover:bg-white/[0.08] hover:text-white"
                                  }`}
                                  style={isLast ? { border: "none" } : { border: "none", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                                >
                                  <span>{option}</span>
                                  {isSelected && (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </button>
                              );
                            });
                          })()}
                        </div>
                      )}
                    </div>
                  ) : field.type === "multiselect" && field.options ? (
                    <div className="w-full">
                      <div className={`text-sm mb-2 ${fieldErrors.has(field.name) ? "text-red-400" : "text-white/70"}`}>
                        {getLocalizedLabel(field)}{field.required ? " *" : ""}
                      </div>
                      <div className={`flex flex-wrap gap-2 ${fieldErrors.has(field.name) ? "p-2 rounded-lg border border-red-500/50 bg-red-500/10" : ""}`}>
                        {getLocalizedOptions(field).map((option, idx) => {
                          const originalOption = field.options?.[idx] || option;
                          const isSelected = ((formData[field.name] as string[]) || []).includes(originalOption);
                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => handleMultiselectChange(field.name, originalOption)}
                              className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                                isSelected
                                  ? "bg-[var(--ifm-color-primary)]/20 border border-[var(--ifm-color-primary)] text-[var(--ifm-color-primary)]"
                                  : "bg-white/[0.03] border border-white/10 text-white/70 hover:bg-white/[0.05] hover:border-white/20"
                              }`}
                            >
                              {isSelected && (
                                <svg className="w-3 h-3 inline mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : field.type === "boolean" ? (
                    <label className={`flex items-center gap-3 cursor-pointer group/checkbox ${fieldErrors.has(field.name) ? "p-2 rounded-lg border border-red-500/50 bg-red-500/10" : ""}`}>
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={!!formData[field.name]}
                          onChange={() => handleBooleanChange(field.name)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                          formData[field.name]
                            ? "bg-[var(--ifm-color-primary)] border-[var(--ifm-color-primary)]"
                            : fieldErrors.has(field.name)
                              ? "bg-white/[0.03] border-red-500/50"
                              : "bg-white/[0.03] border-white/30 group-hover/checkbox:border-white/50"
                        }`}>
                          {formData[field.name] && (
                            <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className={`text-sm group-hover/checkbox:text-white transition-colors ${fieldErrors.has(field.name) ? "text-red-400" : "text-white/80"}`}>
                        {getLocalizedLabel(field)}{field.required ? " *" : ""}
                      </span>
                    </label>
                  ) : (
                    <input
                      type="text"
                      name={field.name}
                      value={formData[field.name] as string || ""}
                      onChange={handleChange}
                      required={field.required}
                      placeholder={getLocalizedLabel(field) + (field.required ? " *" : "")}
                      className="w-full px-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/50 outline-none focus:bg-white/[0.05] focus:border-[var(--ifm-color-primary)] focus:shadow-[0_0_0_3px_rgba(0,202,165,0.15)] transition-all duration-200"
                    />
                  )}
                </div>
              ))}

              {submitStatus === "already_registered" && (
                <div className="flex items-center gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-300 text-sm">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <Translate id="seminars.form.error.already_registered">
                    You are already registered for this event.
                  </Translate>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <Translate id="seminars.form.error">
                    An error occurred. Please try again or contact us at info@one-ware.com.
                  </Translate>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full mt-4 px-6 py-3.5 rounded-xl font-medium text-sm overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: "rgba(0, 255, 209, 0.05)",
                  border: "1px solid rgba(0, 255, 209, 0.3)"
                }}
              >
                <span className="relative z-10 text-[var(--ifm-color-primary)] group-hover:text-[var(--ifm-color-primary-lighter)] transition-colors">
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <Translate id="seminars.form.submitting">Submitting...</Translate>
                    </span>
                  ) : (
                    <Translate id="seminars.form.submit">Register Now</Translate>
                  )}
                </span>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(0, 255, 209, 0.08)" }}
                />
              </button>
              <p className="text-xs">By continuing, you are indicating that you accept our <a href="/docs/contact/privacy">Privacy policy</a></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
