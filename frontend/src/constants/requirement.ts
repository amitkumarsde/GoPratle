import { Category } from "@/models/requirement";

export const STEPS = ["Event Basics", "Category Details", "Budget & More", "Review"];

export const CATEGORIES: { value: Category; label: string; description: string }[] = [
  { value: "Planner", label: "Event Planner", description: "Plan and manage the whole event" },
  { value: "Performer", label: "Performer", description: "Singer, DJ, band, dancer or host" },
  { value: "Crew", label: "Crew", description: "Photographer, sound, lights, staff" },
];

export const EVENT_TYPES = ["Wedding", "Corporate", "Birthday", "Concert", "Festival", "Conference", "Private Party", "Other"];
export const PLANNING_SCOPES = ["Full planning", "Partial planning", "Day-of coordination"];
export const PLANNER_SERVICES = ["Venue sourcing", "Decor & theme", "Catering", "Entertainment", "Guest management", "Logistics"];
export const PERFORMER_TYPES = ["Singer", "Band", "DJ", "Dancer", "Comedian", "Emcee / Anchor", "Magician", "Other"];
export const CREW_ROLES = ["Photographer", "Videographer", "Sound technician", "Lighting technician", "Stage manager", "Security", "Hospitality staff", "Decorator"];

// Labels used when showing saved details on the review step and posts pages
export const DETAIL_LABELS: Record<string, string> = {
  planningScope: "Planning Scope",
  services: "Services",
  guestCount: "Guests",
  performerType: "Performer Type",
  genre: "Genre",
  performanceDuration: "Duration (hours)",
  audienceSize: "Audience Size",
  soundSystemAvailable: "Sound System at Venue",
  crewRoles: "Crew Roles",
  crewSize: "Crew Size",
  shiftHours: "Shift (hours)",
  equipmentRequired: "Crew Brings Equipment",
};
