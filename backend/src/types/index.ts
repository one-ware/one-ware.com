export interface RegistrationRequest {
  eventId: string;
  eventTitle: string;
  name: string;
  email: string;
  website: string;
  fields: Record<string, string | string[] | boolean>;
}

export interface EventConfig {
  link: string;
}

export interface EventsConfig {
  [eventId: string]: EventConfig;
}
