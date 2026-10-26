import { Category, DetailValue, Requirement, RequirementForm } from "@/models/requirement";
import { CATEGORIES } from "@/constants/requirement";

// Converts the form into the object the API expects
export function buildRequirement(form: RequirementForm): Requirement {
  let details: Record<string, DetailValue> = {};

  if (form.category === "Planner") {
    details = { planningScope: form.planningScope, services: form.services, guestCount: Number(form.guestCount) };
  } else if (form.category === "Performer") {
    details = {
      performerType: form.performerType,
      genre: form.genre.trim(),
      performanceDuration: Number(form.performanceDuration),
      audienceSize: Number(form.audienceSize),
      soundSystemAvailable: form.soundSystemAvailable,
    };
  } else if (form.category === "Crew") {
    details = {
      crewRoles: form.crewRoles,
      crewSize: Number(form.crewSize),
      shiftHours: Number(form.shiftHours),
      equipmentRequired: form.equipmentRequired,
    };
  }

  return {
    eventName: form.eventName.trim(),
    eventType: form.eventType,
    startDate: form.startDate,
    endDate: form.isMultiDay ? form.endDate : null,
    location: form.location.trim(),
    venue: form.venue.trim(),
    category: form.category as Requirement["category"],
    budget: Number(form.budget),
    notes: form.notes.trim(),
    details,
  };
}

export function getCategoryLabel(category: Category | "") {
  return CATEGORIES.find((item) => item.value === category)?.label || category;
}
