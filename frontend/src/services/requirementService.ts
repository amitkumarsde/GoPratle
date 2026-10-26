import { FormErrors, Requirement } from "@/models/requirement";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Error from the API that can also carry field errors, e.g. { budget: "Enter your budget" }
export class ApiError extends Error {
  errors: FormErrors;

  constructor(message: string, errors: FormErrors = {}) {
    super(message);
    this.errors = errors;
  }
}

async function request(path: string, options?: RequestInit) {
  let response;
  try {
    response = await fetch(`${API_URL}/api/requirements${path}`, {
      ...options,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    throw new ApiError("Cannot connect to the server. Please try again.");
  }

  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new ApiError(result.message || "Something went wrong", result.errors);
  return result.data;
}

export async function createRequirement(requirement: Requirement): Promise<Requirement> {
  return request("", { method: "POST", body: JSON.stringify(requirement) });
}

export async function getRequirements(): Promise<Requirement[]> {
  return request("");
}

export async function getRequirementById(id: string): Promise<Requirement> {
  return request(`/${id}`);
}
