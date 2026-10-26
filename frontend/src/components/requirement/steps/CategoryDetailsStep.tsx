import CheckboxGroup from "@/components/form/CheckboxGroup";
import Input from "@/components/form/Input";
import Select from "@/components/form/Select";
import { StepProps } from "@/models/requirement";
import { CREW_ROLES, PERFORMER_TYPES, PLANNER_SERVICES, PLANNING_SCOPES } from "@/constants/requirement";

export default function CategoryDetailsStep({ form, errors, onChange }: StepProps) {
  if (form.category === "Planner") {
    return (
      <div className="space-y-5">
        <Select
          label="Planning Scope"
          name="planningScope"
          value={form.planningScope}
          options={PLANNING_SCOPES}
          onChange={(value) => onChange("planningScope", value)}
          error={errors.planningScope}
          required
        />
        <CheckboxGroup
          label="Services Needed"
          name="services"
          options={PLANNER_SERVICES}
          selected={form.services}
          onChange={(value) => onChange("services", value)}
          error={errors.services}
        />
      </div>
    );
  }

  if (form.category === "Performer") {
    return (
      <div className="space-y-5">
        <Select
          label="Performer Type"
          name="performerType"
          value={form.performerType}
          options={PERFORMER_TYPES}
          onChange={(value) => onChange("performerType", value)}
          error={errors.performerType}
          required
        />
        <Input
          label="Genre / Style"
          name="genre"
          value={form.genre}
          onChange={(value) => onChange("genre", value)}
          error={errors.genre}
          placeholder="e.g. Bollywood, Jazz"
          required
        />
        <Input
          label="Performance Duration (hours)"
          name="performanceDuration"
          type="number"
          value={form.performanceDuration}
          onChange={(value) => onChange("performanceDuration", value)}
          error={errors.performanceDuration}
          placeholder="e.g. 2"
          required
        />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <CheckboxGroup
        label="Crew Roles Needed"
        name="crewRoles"
        options={CREW_ROLES}
        selected={form.crewRoles}
        onChange={(value) => onChange("crewRoles", value)}
        error={errors.crewRoles}
      />
      <Input
        label="Number of Crew Members"
        name="crewSize"
        type="number"
        value={form.crewSize}
        onChange={(value) => onChange("crewSize", value)}
        error={errors.crewSize}
        placeholder="e.g. 5"
        required
      />
    </div>
  );
}
