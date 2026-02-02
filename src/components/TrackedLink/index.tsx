import React, { ReactNode } from "react";
import Link from "@docusaurus/Link";
import { trackEvent, TrackingEvent } from "../../utils/tracking";

interface TrackedLinkProps {
  href: string;
  eventType: TrackingEvent;
  eventLabel?: string;
  className?: string;
  children: ReactNode;
}

export default function TrackedLink({
  href,
  eventType,
  eventLabel,
  className,
  children,
}: TrackedLinkProps) {
  const handleClick = () => {
    trackEvent(eventType, { label: eventLabel });
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
