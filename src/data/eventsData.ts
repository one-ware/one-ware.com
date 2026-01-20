import { Event } from "../types/eventTypes";
import { arrowAgilex3_2025_12_23 } from "./events/2025-12-23_arrowAgilex3";
import {qualityControl_2025_11_27} from "@site/src/data/events/2025-11-27_qualityControl";
import {qualityControl_2025_12_18} from "@site/src/data/events/2025-12-18_qualityControl";
import {qualityControl_2026_01_28} from "@site/src/data/events/2026-01-28_qualityControl";

export const EVENTS: Event[] = [
    arrowAgilex3_2025_12_23, 
  qualityControl_2025_11_27, 
  qualityControl_2025_12_18,
  qualityControl_2026_01_28
];

const today = new Date();
today.setHours(0, 0, 0, 0);

export const UPCOMING_EVENTS = EVENTS
  .filter(e => new Date(e.date) >= today)
  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

export const PAST_EVENTS = EVENTS
  .filter(e => new Date(e.date) < today)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const EVENTS_DATA = UPCOMING_EVENTS;
