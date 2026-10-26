import { CREW_ROLES, EVENT_TYPES, PERFORMER_TYPES, PLANNER_SERVICES, PLANNING_SCOPES } from "../constants/requirement";

// Checks the form data and returns an error message for each invalid field
export const validateRequirement = (body: any) => {
  const errors: Record<string, string> = {};
  const details = body.details || {};

  // Start of yesterday (UTC), so users in time zones ahead of the server can still pick their "today"
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setUTCHours(0, 0, 0, 0);

  if (String(body.eventName || "").trim().length < 3) {
    errors.eventName = "Event name must be at least 3 characters";
  }

  if (!EVENT_TYPES.includes(body.eventType)) {
    errors.eventType = "Please select a valid event type";
  }

  if (!body.startDate) {
    errors.startDate = "Start date is required";
  }
  else if (isNaN(new Date(body.startDate).getTime())) {
    errors.startDate = "Start date is not valid";
  }
  else if (new Date(body.startDate) < yesterday) {
    errors.startDate = "Start date cannot be in the past";
  }

  if (body.endDate && body.endDate <= body.startDate) {
    errors.endDate = "End date must be after the start date";
  }

  if (!String(body.location || "").trim()) {
    errors.location = "Location is required";
  }

  if (!(Number(body.budget) > 0)) {
    errors.budget = "Budget must be greater than 0";
  }


  if (body.category === "Planner") {
    if (!PLANNING_SCOPES.includes(details.planningScope)) {
      errors.planningScope = "Please select a valid planning scope";
    }

    if (!Array.isArray(details.services) || details.services.length === 0) {
      errors.services = "Select at least one service";
    }
    else if (!details.services.every((service: string) => PLANNER_SERVICES.includes(service))) {
      errors.services = "Invalid service selected";
    }

    if (!(Number(details.guestCount) > 0)) {
      errors.guestCount = "Guest count must be greater than 0";
    }
  }

  else if (body.category === "Performer") {
    if (!PERFORMER_TYPES.includes(details.performerType)) {
      errors.performerType = "Please select a valid performer type";
    }

    if (!String(details.genre || "").trim()) {
      errors.genre = "Genre is required";
    }

    if (!(Number(details.performanceDuration) > 0)) {
      errors.performanceDuration = "Duration must be greater than 0";
    }

    if (!(Number(details.audienceSize) > 0)) {
      errors.audienceSize = "Audience size must be greater than 0";
    }
  }

  else if (body.category === "Crew") {
    if (!Array.isArray(details.crewRoles) || details.crewRoles.length === 0) {
      errors.crewRoles = "Select at least one crew role";
    }
    else if (!details.crewRoles.every((role: string) => CREW_ROLES.includes(role))) {
      errors.crewRoles = "Invalid crew role selected";
    }

    if (!(Number(details.crewSize) > 0)) {
      errors.crewSize = "Crew size must be greater than 0";
    }

    if (!(Number(details.shiftHours) > 0)) {
      errors.shiftHours = "Shift length must be greater than 0";
    }
  }

  else {
    errors.category = "Category must be Planner, Performer or Crew";
  }

  return errors;
};
