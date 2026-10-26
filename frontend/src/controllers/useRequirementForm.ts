import { useState } from "react";
import { FormErrors, initialForm, RequirementForm } from "@/models/requirement";
import { ApiError, createRequirement } from "@/services/requirementService";
import { buildRequirement } from "@/utils/requirement";
import { getStepOfField, validateStep } from "@/utils/validation";

export function useRequirementForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<RequirementForm>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (name: keyof RequirementForm, value: string | boolean | string[]) => {
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // Scrolls to the first field with an error so the user can see what to fill
  const scrollToFirstError = (newErrors: FormErrors) => {
    const firstField = Object.keys(newErrors)[0];
    const element = document.querySelector<HTMLElement>(`[name="${firstField}"]`);
    if (element) {
      element.scrollIntoView({ block: "center" });
      element.focus({ preventScroll: true });
    }
  };

  const handleNext = () => {
    const newErrors = validateStep(step, form);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      scrollToFirstError(newErrors);
      return;
    }

    setApiError("");
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setApiError("");
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setApiError("");
    try {
      await createRequirement(buildRequirement(form));
      setSuccess(true);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Something went wrong");

      // Backend found invalid fields: show them and go back to the step with the first one
      if (error instanceof ApiError && Object.keys(error.errors).length > 0) {
        const fieldErrors = error.errors;
        setErrors(fieldErrors);
        setStep(getStepOfField(Object.keys(fieldErrors)[0]));
        // Wait a moment so the step is on screen before scrolling to the field
        setTimeout(() => scrollToFirstError(fieldErrors), 100);
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setErrors({});
    setStep(1);
    setSuccess(false);
  };

  return { step, form, errors, loading, apiError, success, handleChange, handleNext, handleBack, handleSubmit, resetForm };
}
