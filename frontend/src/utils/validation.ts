import { FormErrors, RequirementForm } from "@/models/requirement";

const STEP_1_FIELDS = ["eventName", "eventType", "isMultiDay", "startDate", "endDate", "location", "venue", "category"];
const STEP_2_FIELDS = ["planningScope", "services", "performerType", "genre", "performanceDuration", "crewRoles", "crewSize"];
const STEP_3_FIELDS = ["guestCount", "audienceSize", "soundSystemAvailable", "shiftHours", "equipmentRequired", "budget", "notes"];

// Finds which form step shows a field, so we can send the user back to fix it
export function getStepOfField(field: string) {
  if (STEP_1_FIELDS.includes(field)) return 1;
  if (STEP_2_FIELDS.includes(field)) return 2;
  if (STEP_3_FIELDS.includes(field)) return 3;
  return 4;
}

// Errors are added in the same order the fields appear on screen
export function validateStep(step: number, form: RequirementForm): FormErrors {
  const errors: FormErrors = {};
  const today = new Date().toLocaleDateString("en-CA");

  if (step === 1) {
    if (form.eventName.trim().length < 3) errors.eventName = "Event name must be at least 3 characters";
    if (!form.eventType) errors.eventType = "Please select an event type";
    if (!form.startDate) errors.startDate = "Please select a date";
    else if (form.startDate < today) errors.startDate = "Date cannot be in the past";
    if (form.isMultiDay && !form.endDate) errors.endDate = "Please select an end date";
    else if (form.isMultiDay && form.endDate <= form.startDate) errors.endDate = "End date must be after the start date";
    if (!form.location.trim()) errors.location = "Location is required";
    if (!form.category) errors.category = "Please select a category";
  }

  if (step === 2) {
    if (form.category === "Planner") {
      if (!form.planningScope) errors.planningScope = "Please select a planning scope";
      if (form.services.length === 0) errors.services = "Please select at least one service";
    }
    if (form.category === "Performer") {
      if (!form.performerType) errors.performerType = "Please select a performer type";
      if (!form.genre.trim()) errors.genre = "Genre is required";
      if (!(Number(form.performanceDuration) > 0)) errors.performanceDuration = "Enter duration in hours";
    }
    if (form.category === "Crew") {
      if (form.crewRoles.length === 0) errors.crewRoles = "Please select at least one role";
      if (!(Number(form.crewSize) > 0)) errors.crewSize = "Enter number of crew members";
    }
  }

  if (step === 3) {
    if (form.category === "Planner" && !(Number(form.guestCount) > 0)) errors.guestCount = "Enter number of guests";
    if (form.category === "Performer" && !(Number(form.audienceSize) > 0)) errors.audienceSize = "Enter audience size";
    if (form.category === "Crew" && !(Number(form.shiftHours) > 0)) errors.shiftHours = "Enter shift length in hours";
    if (!(Number(form.budget) > 0)) errors.budget = "Enter your budget";
  }

  return errors;
}
