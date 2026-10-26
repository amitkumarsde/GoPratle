import { Check } from "lucide-react";
import { STEPS } from "@/constants/requirement";

export default function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-8 flex">
      {STEPS.map((title, index) => {
        const stepNumber = index + 1;
        const isDone = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <div key={title} className="flex flex-1 flex-col items-center text-center">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
                isDone || isActive ? "bg-brand text-white" : "bg-brand-light text-brand"
              }`}
            >
              {isDone ? <Check size={16} /> : stepNumber}
            </div>
            <p className={`mt-2 text-xs sm:text-sm ${isActive ? "font-semibold" : "text-gray-500"}`}>{title}</p>
          </div>
        );
      })}
    </div>
  );
}
