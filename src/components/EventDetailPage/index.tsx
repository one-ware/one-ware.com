import React, { useState, useEffect, ReactNode } from "react";
import Translate from "@docusaurus/Translate";
import { Event, SectionKey } from "../../types/eventTypes";
import { useLocalizedEvent, useLocalizedDateFormat } from "../../hooks/useLocalizedEvent";
import EventRegistrationForm from "../EventRegistrationForm";

const DEFAULT_SECTION_ORDER: SectionKey[] = ['highlights', 'description', 'agenda', 'sections', 'tables', 'registration'];

interface EventDetailPageProps {
  event: Event;
  onBack: () => void;
}

export default function EventDetailPage({ event, onBack }: EventDetailPageProps) {
  const localizedEvent = useLocalizedEvent(event);
  const dateLocale = useLocalizedDateFormat();
  const [videoConsent, setVideoConsent] = useState<string | null>(null);

  const isPastEvent = new Date(event.date) < new Date(new Date().toDateString());

  const getYouTubeId = (url: string): string => {
    if (url.includes('youtube.com/watch?v=')) {
      return url.split('v=')[1]?.split('&')[0] || url;
    }
    if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1]?.split('?')[0] || url;
    }
    return url;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setVideoConsent(null);
  }, [localizedEvent.id]);

  const formatDate = (dateString: string) => {
    if (dateString.toLowerCase().includes("multiple") || dateString.toLowerCase().includes("tbd")) {
      return dateString;
    }
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

  const getTypeLabel = () => {
    switch (localizedEvent.type) {
      case "workshop":
        return <Translate id="seminars.type.workshop">Workshop</Translate>;
      case "webinar":
        return <Translate id="seminars.type.webinar">Webinar</Translate>;
      case "event":
      default:
        return <Translate id="seminars.type.event">Event</Translate>;
    }
  };

  return (
    <div className="min-h-screen bg-[#161616]">
      <section
        className="relative flex items-center py-12 md:py-16 2xl:py-0"
        style={{
          minHeight: "auto",
          paddingTop: "calc(var(--ifm-navbar-height) + 2rem)",
        }}
      >
        <style>{`
          @media (min-width: 1536px) {
            .event-hero-section {
              min-height: 100vh !important;
              padding-top: var(--ifm-navbar-height) !important;
              padding-bottom: 0 !important;
            }
          }
        `}</style>
        <div className="event-hero-section w-full max-w-[95%] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="flex flex-col 2xl:flex-row 2xl:items-center gap-6 md:gap-8 2xl:gap-16">
            <div className="w-full 2xl:w-[45%] flex flex-col justify-center space-y-4 md:space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[var(--ifm-color-primary)] text-black text-xs font-bold rounded-full uppercase tracking-wider">
                  {localizedEvent.category}
                </span>
                <span className="px-3 py-1 bg-white/10 text-white text-xs font-medium rounded-full">
                  {getTypeLabel()}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--ifm-color-primary)] leading-tight">
                {localizedEvent.title}
              </h1>

              {localizedEvent.subtitle && (
                <p className="text-lg md:text-xl text-white leading-relaxed">
                  {localizedEvent.subtitle}
                </p>
              )}

              <div className="block 2xl:hidden w-full">
                <img
                  src={localizedEvent.image}
                  alt={localizedEvent.title}
                  className="max-w-full max-h-full object-contain rounded-2xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2 2xl:pt-6">
                <div className="px-4 py-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-baseline gap-2 mb-1">
                    <svg className="w-3.5 h-3.5 text-[var(--ifm-color-primary)] relative top-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-400 text-xs uppercase tracking-wider">
                      <Translate id="seminars.detail.date">Date</Translate>
                    </span>
                  </div>
                  <span className="text-white text-sm block">{formatDate(localizedEvent.date)}</span>
                </div>

                {localizedEvent.time && (
                  <div className="px-4 py-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-baseline gap-2 mb-1">
                      <svg className="w-3.5 h-3.5 text-[var(--ifm-color-primary)] relative top-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-400 text-xs uppercase tracking-wider">
                        <Translate id="seminars.detail.time">Time</Translate>
                      </span>
                    </div>
                    <span className="text-white text-sm block">{localizedEvent.time}</span>
                  </div>
                )}

                {localizedEvent.location && (
                  <div className="px-4 py-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-baseline gap-2 mb-1">
                      <svg className="w-3.5 h-3.5 text-[var(--ifm-color-primary)] relative top-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-400 text-xs uppercase tracking-wider">
                        <Translate id="seminars.detail.location">Location</Translate>
                      </span>
                    </div>
                    <span className="text-white text-sm block">{localizedEvent.location}</span>
                  </div>
                )}

                {localizedEvent.language && (
                  <div className="px-4 py-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-baseline gap-2 mb-1">
                      <svg className="w-3.5 h-3.5 text-[var(--ifm-color-primary)] relative top-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                      <span className="text-gray-400 text-xs uppercase tracking-wider">
                        <Translate id="seminars.detail.language">Language</Translate>
                      </span>
                    </div>
                    <span className="text-white text-sm block">{localizedEvent.language}</span>
                  </div>
                )}

                {localizedEvent.speakers && localizedEvent.speakers.length > 0 && (
                  <div className="px-4 py-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-baseline gap-2 mb-1">
                      <svg className="w-3.5 h-3.5 text-[var(--ifm-color-primary)] relative top-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-gray-400 text-xs uppercase tracking-wider">
                        <Translate id="seminars.detail.speaker">Speaker</Translate>
                      </span>
                    </div>
                    <span className="text-white text-sm block">{localizedEvent.speakers[0]}</span>
                  </div>
                )}

                <a
                  href="mailto:info@one-ware.com"
                  className="px-4 py-3 bg-white/5 rounded-lg border border-white/10 block hover:border-[var(--ifm-color-primary)]/50 transition-colors"
                >
                  <div className="flex items-baseline gap-2 mb-1">
                    <svg className="w-3.5 h-3.5 text-[var(--ifm-color-primary)] relative top-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-400 text-xs uppercase tracking-wider">
                      <Translate id="seminars.detail.contact">Contact</Translate>
                    </span>
                  </div>
                  <span className="text-white text-sm block">info@one-ware.com</span>
                </a>
              </div>

              {!isPastEvent && (
                <button
                  onClick={() => document.getElementById('registration-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative mt-6 px-8 py-3.5 rounded-xl font-medium overflow-hidden transition-all duration-300 w-fit"
                  style={{
                    background: "rgba(0, 255, 209, 0.05)",
                    border: "1px solid rgba(0, 255, 209, 0.3)"
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2 text-[var(--ifm-color-primary)] group-hover:text-[var(--ifm-color-primary-lighter)] transition-colors">
                    <Translate id="seminars.detail.registerNow">Register Now</Translate>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </span>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "rgba(0, 255, 209, 0.08)" }}
                  />
                </button>
              )}
            </div>

            <div className="hidden 2xl:flex w-full 2xl:w-[55%] 2xl:h-[70vh] items-center justify-center">
              <img
                src={localizedEvent.image}
                alt={localizedEvent.title}
                className="max-w-full max-h-full object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="w-full max-w-[95%] mx-auto px-6 md:px-12 lg:px-16 py-16">
        <div className="max-w-6xl mx-auto space-y-12">
          {(localizedEvent.sectionOrder || DEFAULT_SECTION_ORDER).map((sectionKey) => {
            switch (sectionKey) {
              case 'highlights':
                return localizedEvent.highlights && localizedEvent.highlights.length > 0 ? (
                  <div key="highlights" className="p-6 md:p-8 bg-white/5 rounded-2xl border border-white/10">
                    <h2 className="text-2xl font-bold text-[var(--ifm-color-primary)] mb-6">
                      <Translate id="seminars.detail.highlights">What You'll Learn</Translate>
                    </h2>
                    <ul className="space-y-2 pl-4">
                      {localizedEvent.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-3 text-white">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--ifm-color-primary)] mt-2 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null;

              case 'description':
                return localizedEvent.description ? (
                  <div key="description" className="p-6 md:p-8 bg-white/5 rounded-2xl border border-white/10">
                    <h2 className="text-2xl font-bold text-[var(--ifm-color-primary)] mb-4">
                      <Translate id="seminars.detail.about">About this Event</Translate>
                    </h2>
                    <p className="text-white leading-relaxed whitespace-pre-line text-lg">
                      {localizedEvent.description}
                    </p>
                  </div>
                ) : null;

              case 'agenda':
                return localizedEvent.agenda && localizedEvent.agenda.length > 0 ? (
                  <div key="agenda" className="p-6 md:p-8 bg-white/5 rounded-2xl border border-white/10">
                    <h2 className="text-2xl font-bold text-[var(--ifm-color-primary)] mb-6">
                      <Translate id="seminars.detail.agenda">Agenda</Translate>
                    </h2>
                    <div className="space-y-6">
                      {localizedEvent.agenda.map((item, index) => (
                        <div key={index}>
                          <h3 className="text-lg font-semibold text-[var(--ifm-color-primary)] mb-3">
                            {item.title}
                          </h3>
                          <ul className="space-y-2 pl-4">
                            {item.points.map((point, pIndex) => (
                              <li key={pIndex} className="flex items-start gap-3 text-white">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--ifm-color-primary)] mt-2 flex-shrink-0" />
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null;

              case 'sections':
                return localizedEvent.sections && localizedEvent.sections.length > 0 ? (
                  <React.Fragment key="sections">
                    {localizedEvent.sections.map((section, index) => (
                      <div key={`section-${index}`} className="p-6 md:p-8 bg-white/5 rounded-2xl border border-white/10">
                        <h2 className="text-2xl font-bold text-[var(--ifm-color-primary)] mb-4">{section.title}</h2>
                        {section.image && (
                          <img
                            src={section.image}
                            alt={section.title}
                            className="max-w-full h-auto rounded-xl mb-4"
                          />
                        )}
                        {section.video && (() => {
                          const videoId = getYouTubeId(section.video);
                          return (
                            <div className="aspect-video rounded-xl overflow-hidden mb-4 relative">
                              {videoConsent === videoId ? (
                                <iframe
                                  src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
                                  className="w-full h-full"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  tabIndex={-1}
                                  title={section.title}
                                />
                              ) : (
                                <>
                                  <img
                                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                                    alt={section.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                                    }}
                                  />
                                  <button
                                    onClick={() => setVideoConsent(videoId)}
                                    className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 hover:bg-black/40 transition-colors group"
                                  >
                                    <div className="w-20 h-20 rounded-full bg-[var(--ifm-color-primary)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                      <svg className="w-10 h-10 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                      </svg>
                                    </div>
                                    <span className="text-white font-medium text-lg">
                                      <Translate id="seminars.detail.playVideo">Play Video</Translate>
                                    </span>
                                    <span className="text-white/70 text-sm mt-2 max-w-xs text-center px-4">
                                      <Translate id="seminars.detail.videoConsent">By clicking, you accept YouTube's privacy policy</Translate>
                                    </span>
                                  </button>
                                </>
                              )}
                            </div>
                          );
                        })()}
                        {section.content && (
                          <p className="text-white leading-relaxed whitespace-pre-line mb-4">
                            {section.content}
                          </p>
                        )}
                        {section.points && section.points.length > 0 && (
                          <ul className="space-y-2 pl-4">
                            {section.points.map((point, pIndex) => (
                              <li key={pIndex} className="flex items-start gap-3 text-white">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--ifm-color-primary)] mt-2 flex-shrink-0" />
                                {point}
                              </li>
                            ))}
                          </ul>
                        )}
                        {section.resources && section.resources.length > 0 && (
                          <div className="grid md:grid-cols-2 gap-4 mt-4">
                            {section.resources.map((resource, rIndex) => (
                              <a
                                key={rIndex}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--ifm-color-primary)]/50 transition-all group"
                              >
                                <div className="w-10 h-10 rounded-lg bg-[var(--ifm-color-primary)]/10 flex items-center justify-center flex-shrink-0">
                                  <svg className="w-5 h-5 text-[var(--ifm-color-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                  </svg>
                                </div>
                                <div>
                                  <h3 className="text-white font-medium group-hover:text-[var(--ifm-color-primary)] transition-colors">
                                    {resource.title}
                                  </h3>
                                  {resource.description && (
                                    <p className="text-white text-sm mt-1">{resource.description}</p>
                                  )}
                                </div>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </React.Fragment>
                ) : null;

              case 'tables':
                return localizedEvent.tables && localizedEvent.tables.length > 0 ? (
                  <div key="tables" className="p-6 md:p-8 bg-white/5 rounded-2xl border border-white/10">
                    <h2 className="text-2xl font-bold text-[var(--ifm-color-primary)] mb-6">
                      <Translate id="seminars.detail.dates">Dates & Locations</Translate>
                    </h2>
                    <div className="space-y-8">
                      {localizedEvent.tables.map((table, tableIdx) => (
                        <div key={tableIdx}>
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                            <span className="text-lg font-semibold text-white">{table.title}</span>
                            {table.buttonUrl && (
                              <a
                                href={table.buttonUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--ifm-color-primary)] text-black text-sm font-medium rounded-lg hover:bg-[var(--ifm-color-primary-dark)] transition-colors w-fit"
                              >
                                {table.buttonLabel || <Translate id="seminars.detail.learnMore">Learn more</Translate>}
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            )}
                          </div>

                          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                            <table className="w-full text-left min-w-[500px] sm:min-w-0">
                              <thead>
                                <tr className="border-b border-white/10">
                                  {table.columns.map((col, colIdx) => (
                                    <th
                                      key={col.key}
                                      className={`py-4 text-[var(--ifm-color-primary)] font-medium text-sm ${
                                        col.format === "date"
                                          ? "pr-4 whitespace-nowrap"
                                          : colIdx === 1
                                            ? "px-4 whitespace-nowrap"
                                            : "pl-4"
                                      }`}
                                    >
                                      {col.header}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {table.rows.map((row, rowIdx) => (
                                  <tr key={rowIdx} className="border-b border-white/10 last:border-b-0">
                                    {table.columns.map((col, colIdx) => (
                                      <td
                                        key={col.key}
                                        className={`py-4 text-white ${
                                          col.format === "date"
                                            ? "pr-4 whitespace-nowrap"
                                            : colIdx === 1
                                              ? "px-4 whitespace-nowrap"
                                              : "pl-4"
                                        }`}
                                      >
                                        {col.format === "date"
                                          ? formatDate(row[col.key] || "")
                                          : row[col.key] || ""}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null;

              case 'registration':
                return !isPastEvent ? (
                  <div key="registration" id="registration-section">
                    <EventRegistrationForm event={event} />
                  </div>
                ) : null;

              default:
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );
}
