import React from "react";
import { useHistory } from "@docusaurus/router";
import Translate from "@docusaurus/Translate";
import { Event } from "../../types/eventTypes";
import { useLocalizedEvent, useLocalizedDateFormat, useLocalizedPath } from "../../hooks/useLocalizedEvent";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const history = useHistory();
  const localizedEvent = useLocalizedEvent(event);
  const dateLocale = useLocalizedDateFormat();
  const seminarsPath = useLocalizedPath("/seminars");

  const handleClick = () => {
    history.push(`${seminarsPath}?event=${event.id}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(dateLocale, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
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

  const cardDescription = localizedEvent.shortDescription || localizedEvent.description;

  return (
    <div
      onClick={handleClick}
      className="group rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-[#252525] border border-white/10 hover:border-[var(--ifm-color-primary)]/50"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-black/50">
        <img
          src={localizedEvent.image}
          alt={localizedEvent.title}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute top-4 right-4 px-3 py-1 bg-[var(--ifm-color-primary)] text-black text-xs font-semibold rounded-full uppercase tracking-wider">
          {localizedEvent.category}
        </span>
      </div>

      <div className="p-6">
        <span className="text-[var(--ifm-color-primary)] text-xs font-semibold uppercase tracking-wider">
          {getTypeLabel()}
        </span>

        <h3 className="text-lg md:text-xl font-semibold mb-3 mt-2 transition-colors duration-300 group-hover:text-[var(--ifm-color-primary)] min-h-[3.5rem] line-clamp-2 text-white">
          {localizedEvent.title}
        </h3>

        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{formatDate(localizedEvent.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{localizedEvent.time}</span>
          </div>
        </div>

        {cardDescription && (
          <p className="mt-3 text-sm line-clamp-3 min-h-[3.75rem] text-gray-300">
            {cardDescription}
          </p>
        )}
      </div>
    </div>
  );
}
