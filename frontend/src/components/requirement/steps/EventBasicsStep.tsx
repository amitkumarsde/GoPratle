import Checkbox from "@/components/form/Checkbox";
import FieldError from "@/components/form/FieldError";
import Input from "@/components/form/Input";
import Select from "@/components/form/Select";
import { StepProps } from "@/models/requirement";
import { CATEGORIES, EVENT_TYPES } from "@/constants/requirement";

export default function EventBasicsStep({ form, errors, onChange }: StepProps) {
  return (
    <div className="space-y-5">
      <Input
        label="Event Name"
        name="eventName"
        value={form.eventName}
        onChange={(value) => onChange("eventName", value)}
        error={errors.eventName}
        placeholder="e.g. Annual Company Party"
        required
      />

      <Select
        label="Event Type"
        name="eventType"
        value={form.eventType}
        options={EVENT_TYPES}
        onChange={(value) => onChange("eventType", value)}
        error={errors.eventType}
        required
      />

      <Checkbox
        label="This is a multi-day event"
        name="isMultiDay"
        checked={form.isMultiDay}
        onChange={(checked) => onChange("isMultiDay", checked)}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label={form.isMultiDay ? "Start Date" : "Event Date"}
          name="startDate"
          type="date"
          value={form.startDate}
          onChange={(value) => onChange("startDate", value)}
          error={errors.startDate}
          required
        />
        {form.isMultiDay && (
          <Input
            label="End Date"
            name="endDate"
            type="date"
            value={form.endDate}
            onChange={(value) => onChange("endDate", value)}
            error={errors.endDate}
            required
          />
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Location"
          name="location"
          value={form.location}
          onChange={(value) => onChange("location", value)}
          error={errors.location}
          placeholder="e.g. Mumbai"
          required
        />
        <Input
          label="Venue (optional)"
          name="venue"
          value={form.venue}
          onChange={(value) => onChange("venue", value)}
          placeholder="e.g. Taj Hotel"
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">
          What are you looking for? <span className="text-brand">*</span>
        </p>
        <div className="space-y-3">
          {CATEGORIES.map((category) => (
            <label key={category.value} className="flex cursor-pointer gap-2">
              <input
                type="radio"
                name="category"
                value={category.value}
                checked={form.category === category.value}
                onChange={() => onChange("category", category.value)}
                className="mt-1 cursor-pointer accent-brand"
              />
              <span>
                <span className="font-medium">{category.label}</span>
                <span className="text-sm text-gray-500"> - {category.description}</span>
              </span>
            </label>
          ))}
        </div>
        <FieldError message={errors.category} />
      </div>
    </div>
  );
}
