import React, { useEffect } from "react";
import Translate from "@docusaurus/Translate";
import { JobDetail, JobSectionKey, JobContentSection } from "../../types/jobTypes";
import { useLocalizedJob } from "../../hooks/useLocalizedJob";
import JobApplicationForm from "../JobApplicationForm";

const DEFAULT_SECTION_ORDER: JobSectionKey[] = ["tasks", "profile", "benefits", "mission", "application"];

interface JobDetailPageProps {
  job: JobDetail;
  onBack: () => void;
}

export default function JobDetailPage({ job, onBack }: JobDetailPageProps) {
  const localizedJob = useLocalizedJob(job);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [localizedJob.id]);

  const renderContentSection = (section: JobContentSection | undefined, key: string) => {
    if (!section) return null;

    return (
      <div key={key} className="p-6 md:p-8 bg-white/5 rounded-2xl border border-white/10">
        <h2 className="text-2xl font-bold text-[var(--ifm-color-primary)] mb-6">
          {section.title}
        </h2>

        {section.content && (
          <p className="text-white leading-relaxed whitespace-pre-line mb-4">
            {section.content}
          </p>
        )}

        {section.points && section.points.length > 0 && !section.subsections && (
          <ul className="space-y-2 pl-4">
            {section.points.map((point, index) => (
              <li key={index} className="flex items-start gap-3 text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--ifm-color-primary)] mt-2 flex-shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        )}

        {section.subsections && section.subsections.length > 0 && (
          <div className="space-y-6">
            {section.subsections.map((subsection, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-[var(--ifm-color-primary)] mb-3">
                  {subsection.title}
                </h3>
                <ul className="space-y-2 pl-4">
                  {subsection.points.map((point, pIndex) => (
                    <li key={pIndex} className="flex items-start gap-3 text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--ifm-color-primary)] mt-2 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#161616]">
      <section
        className="relative flex items-center py-6 md:py-10 lg:py-12 2xl:py-8"
        style={{
          minHeight: "auto",
          paddingTop: "calc(var(--ifm-navbar-height) + 1rem)",
        }}
      >
        <style>{`
          @media (min-width: 1536px) {
            .job-hero-section {
              min-height: auto !important;
              padding-top: var(--ifm-navbar-height) !important;
              padding-bottom: 0 !important;
            }
          }
        `}</style>
        <div className="job-hero-section w-full max-w-[95%] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="flex flex-col items-center gap-4 md:gap-6 lg:gap-8">
            <div className="w-full max-w-4xl flex flex-col items-center text-center space-y-3 md:space-y-4 lg:space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[var(--ifm-color-primary)] text-black text-xs font-bold rounded-full uppercase tracking-wider">
                  {localizedJob.category}
                </span>
                <span className="px-3 py-1 bg-white/10 text-white text-xs font-medium rounded-full">
                  {localizedJob.type}
                </span>
              </div>

              {localizedJob.heroTitle && (
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--ifm-color-primary)] leading-tight">
                  {localizedJob.heroTitle}
                </h1>
              )}

              <h2 className="text-xl md:text-2xl text-white font-semibold">
                {localizedJob.title}
              </h2>

              {localizedJob.shortDescription && (
                <p className="text-lg text-white/80 leading-relaxed">
                  {localizedJob.shortDescription}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2 2xl:pt-6 w-full max-w-2xl text-left">
                <div className="px-4 py-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-baseline gap-2 mb-1">
                    <svg className="w-3.5 h-3.5 text-[var(--ifm-color-primary)] relative top-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-400 text-xs uppercase tracking-wider">
                      <Translate id="careers.detail.location">Location</Translate>
                    </span>
                  </div>
                  <span className="text-white text-sm block">{localizedJob.location}</span>
                </div>

                {localizedJob.startDate && (
                  <div className="px-4 py-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-baseline gap-2 mb-1">
                      <svg className="w-3.5 h-3.5 text-[var(--ifm-color-primary)] relative top-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-400 text-xs uppercase tracking-wider">
                        <Translate id="careers.detail.startDate">Start</Translate>
                      </span>
                    </div>
                    <span className="text-white text-sm block">{localizedJob.startDate}</span>
                  </div>
                )}

                <div className="px-4 py-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-baseline gap-2 mb-1">
                    <svg className="w-3.5 h-3.5 text-[var(--ifm-color-primary)] relative top-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-400 text-xs uppercase tracking-wider">
                      <Translate id="careers.detail.type">Type</Translate>
                    </span>
                  </div>
                  <span className="text-white text-sm block">{localizedJob.type}</span>
                </div>

                <a
                  href="mailto:career@one-ware.com"
                  className="px-4 py-3 bg-white/5 rounded-lg border border-white/10 block hover:border-[var(--ifm-color-primary)]/50 transition-colors"
                >
                  <div className="flex items-baseline gap-2 mb-1">
                    <svg className="w-3.5 h-3.5 text-[var(--ifm-color-primary)] relative top-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-400 text-xs uppercase tracking-wider">
                      <Translate id="careers.detail.contact">Contact</Translate>
                    </span>
                  </div>
                  <span className="text-white text-sm block">career@one-ware.com</span>
                </a>
              </div>

              <button
                onClick={() => document.getElementById("application-section")?.scrollIntoView({ behavior: "smooth" })}
                className="group relative mt-4 md:mt-6 px-8 py-3.5 rounded-xl font-medium overflow-hidden transition-all duration-300"
                style={{
                  background: "rgba(0, 255, 209, 0.05)",
                  border: "1px solid rgba(0, 255, 209, 0.3)"
                }}
              >
                <span className="relative z-10 flex items-center gap-2 text-[var(--ifm-color-primary)] group-hover:text-[var(--ifm-color-primary-lighter)] transition-colors">
                  <Translate id="careers.detail.applyNow">Apply Now</Translate>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </span>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(0, 255, 209, 0.08)" }}
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full max-w-[95%] mx-auto px-6 md:px-12 lg:px-16 py-8 md:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto space-y-6 md:space-y-8 lg:space-y-12">
          {localizedJob.customSections && localizedJob.customSections.length > 0 && (
            <>
              {localizedJob.customSections.map((section, index) =>
                renderContentSection(section, `custom-${index}`)
              )}
            </>
          )}

          {(localizedJob.sectionOrder || DEFAULT_SECTION_ORDER).map((sectionKey) => {
            switch (sectionKey) {
              case "tasks":
                return renderContentSection(localizedJob.tasks, "tasks");

              case "profile":
                return renderContentSection(localizedJob.profile, "profile");

              case "benefits":
                return renderContentSection(localizedJob.benefits, "benefits");

              case "mission":
                return renderContentSection(localizedJob.mission, "mission");

              case "application":
                return (
                  <div key="application" id="application-section">
                    <JobApplicationForm job={job} />
                  </div>
                );

              default:
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );
}
