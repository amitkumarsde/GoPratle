import Checkbox from "@/components/form/Checkbox";
import Input from "@/components/form/Input";
import TextArea from "@/components/form/TextArea";
import { StepProps } from "@/models/requirement";

export default function BudgetStep({ form, errors, onChange }: StepProps) {
  return (
    <div className="space-y-5">
      {form.category === "Planner" && (
        <Input
          label="Number of Guests"
          name="guestCount"
          type="number"
          value={form.guestCount}
          onChange={(value) => onChange("guestCount", value)}
          error={errors.guestCount}
          placeholder="e.g. 150"
          required
        />
      )}

      {form.category === "Performer" && (
        <>
          <Input
            label="Audience Size"
            name="audienceSize"
            type="number"
            value={form.audienceSize}
            onChange={(value) => onChange("audienceSize", value)}
            error={errors.audienceSize}
            placeholder="e.g. 200"
            required
          />
          <Checkbox
            label="Sound system is available at the venue"
            name="soundSystemAvailable"
            checked={form.soundSystemAvailable}
            onChange={(checked) => onChange("soundSystemAvailable", checked)}
          />
        </>
      )}

      {form.category === "Crew" && (
        <>
          <Input
            label="Shift Length (hours)"
            name="shiftHours"
            type="number"
            value={form.shiftHours}
            onChange={(value) => onChange("shiftHours", value)}
            error={errors.shiftHours}
            placeholder="e.g. 8"
            required
          />
          <Checkbox
            label="Crew should bring their own equipment"
            name="equipmentRequired"
            checked={form.equipmentRequired}
            onChange={(checked) => onChange("equipmentRequired", checked)}
          />
        </>
      )}

      <Input
        label="Budget (₹)"
        name="budget"
        type="number"
        value={form.budget}
        onChange={(value) => onChange("budget", value)}
        error={errors.budget}
        placeholder="e.g. 50000"
        required
      />

      <TextArea
        label="Additional Notes (optional)"
        name="notes"
        value={form.notes}
        onChange={(value) => onChange("notes", value)}
        placeholder="Any other details or special requests"
      />
    </div>
  );
}
