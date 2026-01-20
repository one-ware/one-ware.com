import React, { useState, useEffect, useMemo } from "react";
import Layout from "@theme/Layout";
import Translate, { translate } from "@docusaurus/Translate";
import { useLocation, useHistory } from "@docusaurus/router";
import { UPCOMING_EVENTS, PAST_EVENTS } from "../data/eventsData";
import EventCard from "../components/EventCard";
import EventDetailPage from "../components/EventDetailPage";
import { useLocale, useLocalizedPath } from "../hooks/useLocalizedEvent";
import { JSX } from "react";

const EVENTS_PER_PAGE = 6;

export default function SeminarsPage(): JSX.Element {
  const location = useLocation();
  const history = useHistory();
  const locale = useLocale();
  const seminarsPath = useLocalizedPath("/seminars");

  const searchParams = new URLSearchParams(location.search);
  const eventId = searchParams.get("event");

  const allEvents = [...UPCOMING_EVENTS, ...PAST_EVENTS];
  const selectedEvent = eventId ? allEvents.find(e => e.id === eventId) : null;

  const [heroVisible, setHeroVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [displayedPage, setDisplayedPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [slidePhase, setSlidePhase] = useState<'idle' | 'exit' | 'enter'>('idle');

  const [pastCurrentPage, setPastCurrentPage] = useState(0);
  const [pastDisplayedPage, setPastDisplayedPage] = useState(0);
  const [pastSlideDirection, setPastSlideDirection] = useState<'left' | 'right'>('right');
  const [pastSlidePhase, setPastSlidePhase] = useState<'idle' | 'exit' | 'enter'>('idle');

  const [searchTitle, setSearchTitle] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);

  const availableCategories = useMemo(() =>
    [...new Set(allEvents.map(e => e.category))].sort(),
    []
  );

  const availableTypes = useMemo(() =>
    [...new Set(allEvents.map(e => e.type))].sort(),
    []
  );

  const filterEvents = (events: typeof UPCOMING_EVENTS) => {
    return events.filter(event => {
      if (searchTitle && !event.title.toLowerCase().includes(searchTitle.toLowerCase())) {
        return false;
      }
      if (selectedCategories.length > 0 && !selectedCategories.includes(event.category)) {
        return false;
      }
      if (selectedTypes.length > 0 && !selectedTypes.includes(event.type)) {
        return false;
      }
      if (dateFrom && event.date < dateFrom) {
        return false;
      }
      if (dateTo && event.date > dateTo) {
        return false;
      }
      return true;
    });
  };

  const filteredUpcoming = useMemo(() => filterEvents(UPCOMING_EVENTS),
    [searchTitle, selectedCategories, selectedTypes, dateFrom, dateTo]);

  const filteredPast = useMemo(() => filterEvents(PAST_EVENTS),
    [searchTitle, selectedCategories, selectedTypes, dateFrom, dateTo]);

  const totalPages = Math.ceil(filteredUpcoming.length / EVENTS_PER_PAGE);
  const pastTotalPages = Math.ceil(filteredPast.length / EVENTS_PER_PAGE);

  const currentEvents = filteredUpcoming.slice(
    displayedPage * EVENTS_PER_PAGE,
    (displayedPage + 1) * EVENTS_PER_PAGE
  );

  const pastCurrentEvents = filteredPast.slice(
    pastDisplayedPage * EVENTS_PER_PAGE,
    (pastDisplayedPage + 1) * EVENTS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(0);
    setDisplayedPage(0);
    setPastCurrentPage(0);
    setPastDisplayedPage(0);
  }, [searchTitle, selectedCategories, selectedTypes, dateFrom, dateTo]);

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.category-dropdown')) {
        setCategoryDropdownOpen(false);
      }
      if (!target.closest('.type-dropdown')) {
        setTypeDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handlePageChange = (pageIndex: number) => {
    if (pageIndex === currentPage || slidePhase !== 'idle') return;

    setSlideDirection(pageIndex > currentPage ? 'right' : 'left');
    setCurrentPage(pageIndex);
    setSlidePhase('exit');

    setTimeout(() => {
      setDisplayedPage(pageIndex);
      setSlidePhase('enter');

      setTimeout(() => {
        setSlidePhase('idle');
      }, 500);
    }, 300);
  };

  const handlePastPageChange = (pageIndex: number) => {
    if (pageIndex === pastCurrentPage || pastSlidePhase !== 'idle') return;

    setPastSlideDirection(pageIndex > pastCurrentPage ? 'right' : 'left');
    setPastCurrentPage(pageIndex);
    setPastSlidePhase('exit');

    setTimeout(() => {
      setPastDisplayedPage(pageIndex);
      setPastSlidePhase('enter');

      setTimeout(() => {
        setPastSlidePhase('idle');
      }, 500);
    }, 300);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSearchTitle("");
    setSelectedCategories([]);
    setSelectedTypes([]);
    setDateFrom("");
    setDateTo("");
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "workshop": return locale === "de" ? "Workshop" : "Workshop";
      case "webinar": return locale === "de" ? "Webinar" : "Webinar";
      case "event": return locale === "de" ? "Event" : "Event";
      default: return type;
    }
  };

  const handleBack = () => {
    history.push(seminarsPath);
  };

  if (selectedEvent) {
    return (
      <Layout
        title={selectedEvent.title}
        description={selectedEvent.shortDescription || selectedEvent.description || "Event Details"}
      >
        <div style={{ marginTop: "calc(var(--ifm-navbar-height) * -1)" }}>
          <EventDetailPage event={selectedEvent} onBack={handleBack} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={translate({id: 'seminars.page.title', message: 'Events and Webinars'})}
      description={translate({id: 'seminars.page.description', message: 'Sometimes virtual. Sometimes live. Always inspiring. Discover our events here.'})}
    >
      <section
        className="relative min-h-[66vh] flex items-center overflow-hidden"
        style={{
          marginTop: "calc(var(--ifm-navbar-height) * -1)",
          paddingTop: "var(--ifm-navbar-height)",
        }}
      >
        <div className="absolute inset-0">
          <img
            src={require("@site/static/img/background.webp").default}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div
              className="flex items-center gap-3 mb-6 transition-all duration-700"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'translateX(0)' : 'translateX(-20px)',
              }}
            >
              <div className="h-px w-12 bg-[var(--ifm-color-primary)]" />
              <span className="text-[var(--ifm-color-primary)] text-sm font-semibold uppercase tracking-widest">
                <Translate id="seminars.hero.overline">Events & Seminars</Translate>
              </span>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 transition-all duration-700"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'translateX(0)' : 'translateX(-30px)',
                transitionDelay: '100ms',
              }}
            >
              <Translate id="seminars.hero.title.line1">Share knowledge,</Translate><br />
              <span className="text-[var(--ifm-color-primary)]">
                <Translate id="seminars.hero.title.line2">Shape the future</Translate>
              </span>
            </h1>

            <p
              className="text-lg text-gray-300 max-w-xl leading-relaxed transition-all duration-700"
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'translateX(0)' : 'translateX(-20px)',
                transitionDelay: '200ms',
              }}
            >
              <Translate id="seminars.hero.description">Hands-on workshops, inspiring webinars, and exciting events - expand your expertise with our specialists.</Translate>
            </p>
          </div>
        </div>
      </section>

      <section id="events" className="bg-[#161616] pt-8 md:pt-12 pb-16 md:pb-24">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">

            <div className="rounded-2xl p-4 md:p-5 mb-12 overflow-visible bg-[#252525] border border-white/10">
              <div className="flex flex-col lg:flex-row lg:items-end gap-3 md:gap-4">
                <div className="w-full lg:flex-[2]">
                  <label className="block text-xs font-medium text-gray-300 uppercase tracking-wide mb-1.5">
                    <Translate id="seminars.filter.search.label">Search</Translate>
                  </label>
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      value={searchTitle}
                      onChange={(e) => setSearchTitle(e.target.value)}
                      placeholder={translate({id: 'seminars.filter.search.placeholder', message: 'Search titles...'})}
                      className="w-full h-10 pl-10 pr-4 bg-black/30 border-0 rounded-md text-sm text-white placeholder-gray-400 outline-none shadow-none ring-0 focus:ring-0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:contents gap-3 md:gap-4">
                  <div className="relative category-dropdown lg:flex-1">
                    <label className="block text-xs font-medium text-gray-300 uppercase tracking-wide mb-1.5">
                      <Translate id="seminars.filter.category.label">Category</Translate>
                    </label>
                    <button
                      onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                      className="w-full h-10 px-3 bg-black/30 border-0 rounded-md text-left text-sm flex items-center justify-between hover:bg-black/40 shadow-none ring-0 focus:ring-0 focus:outline-none"
                    >
                      <span className="text-white truncate">
                        {selectedCategories.length === 0
                          ? <Translate id="seminars.filter.category.all">All</Translate>
                          : selectedCategories.length === 1
                          ? selectedCategories[0]
                          : `${selectedCategories.length} ${locale === "de" ? "gewählt" : "selected"}`}
                      </span>
                      <svg className={`w-4 h-4 text-gray-400 ml-2 flex-shrink-0 transition-transform duration-200 ${categoryDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {categoryDropdownOpen && (
                      <div className="absolute z-20 mt-1 w-full bg-[#1a1a1a] rounded-md shadow-lg max-h-60 overflow-y-auto border border-white/10">
                        {availableCategories.map(category => (
                          <label
                            key={category}
                            className="flex items-center px-3 py-2 hover:bg-white/10 cursor-pointer text-sm"
                          >
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(category)}
                              onChange={() => toggleCategory(category)}
                              className="w-4 h-4 rounded border-gray-500 text-[var(--ifm-color-primary)] shadow-none ring-0 focus:ring-0"
                            />
                            <span className="ml-2 text-white">{category}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="relative type-dropdown lg:flex-1">
                    <label className="block text-xs font-medium text-gray-300 uppercase tracking-wide mb-1.5">
                      <Translate id="seminars.filter.type.label">Type</Translate>
                    </label>
                    <button
                      onClick={() => setTypeDropdownOpen(!typeDropdownOpen)}
                      className="w-full h-10 px-3 bg-black/30 border-0 rounded-md text-left text-sm flex items-center justify-between hover:bg-black/40 shadow-none ring-0 focus:ring-0 focus:outline-none"
                    >
                      <span className="text-white truncate">
                        {selectedTypes.length === 0
                          ? <Translate id="seminars.filter.type.all">All</Translate>
                          : selectedTypes.length === 1
                          ? getTypeLabel(selectedTypes[0])
                          : `${selectedTypes.length} ${locale === "de" ? "gewählt" : "selected"}`}
                      </span>
                      <svg className={`w-4 h-4 text-gray-400 ml-2 flex-shrink-0 transition-transform duration-200 ${typeDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {typeDropdownOpen && (
                      <div className="absolute z-20 mt-1 w-full bg-[#1a1a1a] rounded-md shadow-lg max-h-60 overflow-y-auto border border-white/10">
                        {availableTypes.map(type => (
                          <label
                            key={type}
                            className="flex items-center px-3 py-2 hover:bg-white/10 cursor-pointer text-sm"
                          >
                            <input
                              type="checkbox"
                              checked={selectedTypes.includes(type)}
                              onChange={() => toggleType(type)}
                              className="w-4 h-4 rounded border-gray-500 text-[var(--ifm-color-primary)] shadow-none ring-0 focus:ring-0"
                            />
                            <span className="ml-2 text-white">{getTypeLabel(type)}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="lg:flex-1">
                    <label className="block text-xs font-medium text-gray-300 uppercase tracking-wide mb-1.5">
                      <Translate id="seminars.filter.dateFrom.label">From</Translate>
                    </label>
                    <input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      onClick={(e) => (e.target as HTMLInputElement).showPicker()}
                      className={`date-input w-full h-10 px-3 bg-black/30 border-0 rounded-md text-sm hover:bg-black/40 focus:bg-black/40 outline-none shadow-none ring-0 focus:ring-0 cursor-pointer ${dateFrom ? 'text-white' : 'text-gray-400'}`}
                    />
                  </div>

                  <div className="lg:flex-1">
                    <label className="block text-xs font-medium text-gray-300 uppercase tracking-wide mb-1.5">
                      <Translate id="seminars.filter.dateTo.label">To</Translate>
                    </label>
                    <input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      onClick={(e) => (e.target as HTMLInputElement).showPicker()}
                      className={`date-input w-full h-10 px-3 bg-black/30 border-0 rounded-md text-sm hover:bg-black/40 focus:bg-black/40 outline-none shadow-none ring-0 focus:ring-0 cursor-pointer ${dateTo ? 'text-white' : 'text-gray-400'}`}
                    />
                  </div>
                </div>

                <button
                  onClick={clearFilters}
                  className="button button--primary h-10 w-full lg:w-10 p-0 flex items-center justify-center flex-shrink-0"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span className="ml-2 lg:hidden">
                    <Translate id="seminars.filter.clear">Clear Filters</Translate>
                  </span>
                </button>
              </div>
            </div>

            <h2 className="text-gray-200 text-3xl md:text-4xl font-normal text-center mb-12">
              <Translate id="seminars.section.upcoming">Upcoming Events</Translate>
            </h2>

            {filteredUpcoming.length > 0 ? (
              <>
                <div className="py-4 px-2 -mx-2">
                  <div
                    className={`events-grid-content ${
                      slidePhase === 'exit'
                        ? slideDirection === 'right' ? 'slide-exit-left' : 'slide-exit-right'
                        : slidePhase === 'enter'
                        ? slideDirection === 'right' ? 'slide-enter-right' : 'slide-enter-left'
                        : ''
                    }`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {currentEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  </div>
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center gap-3 mt-8">
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <div
                        key={index}
                        onClick={() => handlePageChange(index)}
                        className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 hover:scale-125 ${
                          index === currentPage
                            ? "bg-[var(--ifm-color-primary)]"
                            : "bg-gray-600 hover:bg-gray-500"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-400 text-lg text-center">
                <Translate id="seminars.empty.upcoming">No upcoming events found.</Translate>
              </p>
            )}

            <div className="my-24 border-t border-gray-700" />

            <h2 className="text-gray-200 text-3xl md:text-4xl font-normal text-center mb-12">
              <Translate id="seminars.section.past">Past Events</Translate>
            </h2>

            {filteredPast.length > 0 ? (
              <>
                <div className="py-4 px-2 -mx-2">
                  <div
                    className={`events-grid-content ${
                      pastSlidePhase === 'exit'
                        ? pastSlideDirection === 'right' ? 'slide-exit-left' : 'slide-exit-right'
                        : pastSlidePhase === 'enter'
                        ? pastSlideDirection === 'right' ? 'slide-enter-right' : 'slide-enter-left'
                        : ''
                    }`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {pastCurrentEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  </div>
                </div>

                {pastTotalPages > 1 && (
                  <div className="flex justify-center gap-3 mt-8">
                    {Array.from({ length: pastTotalPages }).map((_, index) => (
                      <div
                        key={index}
                        onClick={() => handlePastPageChange(index)}
                        className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 hover:scale-125 ${
                          index === pastCurrentPage
                            ? "bg-[var(--ifm-color-primary)]"
                            : "bg-gray-600 hover:bg-gray-500"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-400 text-lg text-center">
                <Translate id="seminars.empty.past">No past events found.</Translate>
              </p>
            )}

          </div>
        </div>
      </section>

      <style>{`
        .date-input:not(:focus):invalid::-webkit-datetime-edit,
        .date-input[value=""]:not(:focus)::-webkit-datetime-edit {
          color: transparent;
        }
        .date-input:not(:focus):invalid::before,
        .date-input[value=""]:not(:focus)::before {
          content: "Datum";
          color: #9ca3af;
          position: absolute;
          left: 12px;
        }
        .date-input {
          position: relative;
        }

        .events-grid-content {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
        }

        .slide-exit-left {
          transform: translateX(-60px);
          opacity: 0;
        }

        .slide-exit-right {
          transform: translateX(60px);
          opacity: 0;
        }

        .slide-enter-right {
          animation: enterFromRight 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .slide-enter-left {
          animation: enterFromLeft 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes enterFromRight {
          from {
            transform: translateX(60px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes enterFromLeft {
          from {
            transform: translateX(-60px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </Layout>
  );
}
