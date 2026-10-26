"use client";

import { CircleCheck, LoaderCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import LinkButton from "@/components/ui/LinkButton";
import StepIndicator from "@/components/requirement/StepIndicator";
import BudgetStep from "@/components/requirement/steps/BudgetStep";
import CategoryDetailsStep from "@/components/requirement/steps/CategoryDetailsStep";
import EventBasicsStep from "@/components/requirement/steps/EventBasicsStep";
import ReviewStep from "@/components/requirement/steps/ReviewStep";
import { useRequirementForm } from "@/controllers/useRequirementForm";
import { STEPS } from "@/constants/requirement";

export default function RequirementForm() {
  const { step, form, errors, loading, apiError, success, handleChange, handleNext, handleBack, handleSubmit, resetForm } =
    useRequirementForm();

  if (success) {
    return (
      <div className="py-10 text-center">
        <CircleCheck size={48} className="mx-auto text-brand" />
        <h2 className="mt-4 text-2xl font-bold">Requirement Posted!</h2>
        <p className="mt-2 text-gray-500">Your requirement has been saved successfully.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button onClick={resetForm}>Post Another</Button>
          <LinkButton href="/posts" variant="secondary">
            View All Posts
          </LinkButton>
        </div>
      </div>
    );
  }

  return (
    <div>
      <StepIndicator currentStep={step} />

      <h2 className="mb-6 text-xl font-semibold">{STEPS[step - 1]}</h2>

      {step === 1 && <EventBasicsStep form={form} errors={errors} onChange={handleChange} />}
      {step === 2 && <CategoryDetailsStep form={form} errors={errors} onChange={handleChange} />}
      {step === 3 && <BudgetStep form={form} errors={errors} onChange={handleChange} />}
      {step === 4 && <ReviewStep form={form} />}

      {apiError && <p className="mt-6 text-sm text-red-600">{apiError}</p>}

      <div className="mt-8 flex justify-between">
        {step > 1 ? (
          <Button variant="secondary" onClick={handleBack} disabled={loading}>
            Back
          </Button>
        ) : (
          <div />
        )}

        {step < STEPS.length ? (
          <Button onClick={handleNext}>Continue</Button>
        ) : (
          <Button onClick={handleSubmit} disabled={loading}>
            {loading && <LoaderCircle size={18} className="animate-spin" />}
            {loading ? "Submitting..." : "Submit Requirement"}
          </Button>
        )}
      </div>
    </div>
  );
}
