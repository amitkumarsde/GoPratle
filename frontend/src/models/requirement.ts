export type Category = "Planner" | "Performer" | "Crew";

// All form fields in one object, category fields are only sent for the selected category
export interface RequirementForm {
  eventName: string;
  eventType: string;
  isMultiDay: boolean;
  startDate: string;
  endDate: string;
  location: string;
  venue: string;
  category: Category | "";
  planningScope: string;
  services: string[];
  guestCount: string;
  performerType: string;
  genre: string;
  performanceDuration: string;
  audienceSize: string;
  soundSystemAvailable: boolean;
  crewRoles: string[];
  crewSize: string;
  shiftHours: string;
  equipmentRequired: boolean;
  budget: string;
  notes: string;
}

export type FormErrors = Partial<Record<keyof RequirementForm, string>>;

export interface StepProps {
  form: RequirementForm;
  errors: FormErrors;
  onChange: (name: keyof RequirementForm, value: string | boolean | string[]) => void;
}

export type DetailValue = string | number | boolean | string[];

// Shape sent to and received from the API
export interface Requirement {
  _id?: string;
  eventName: string;
  eventType: string;
  startDate: string;
  endDate: string | null;
  location: string;
  venue: string;
  category: Category;
  budget: number;
  notes: string;
  details: Record<string, DetailValue>;
  createdAt?: string;
}

export const initialForm: RequirementForm = {
  eventName: "",
  eventType: "",
  isMultiDay: false,
  startDate: "",
  endDate: "",
  location: "",
  venue: "",
  category: "",
  planningScope: "",
  services: [],
  guestCount: "",
  performerType: "",
  genre: "",
  performanceDuration: "",
  audienceSize: "",
  soundSystemAvailable: false,
  crewRoles: [],
  crewSize: "",
  shiftHours: "",
  equipmentRequired: false,
  budget: "",
  notes: "",
};
