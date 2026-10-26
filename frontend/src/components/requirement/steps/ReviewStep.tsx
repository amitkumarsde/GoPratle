import DetailList from "@/components/ui/DetailList";
import { RequirementForm } from "@/models/requirement";
import { DETAIL_LABELS } from "@/constants/requirement";
import { buildRequirement, getCategoryLabel } from "@/utils/requirement";
import { formatCurrency, formatDateRange, formatValue } from "@/utils/format";

export default function ReviewStep({ form }: { form: RequirementForm }) {
  const requirement = buildRequirement(form);

  const rows = [
    ["Event Name", requirement.eventName],
    ["Event Type", requirement.eventType],
    ["Date", formatDateRange(requirement.startDate, requirement.endDate)],
    ["Location", requirement.location],
    ["Venue", requirement.venue || "-"],
    ["Category", getCategoryLabel(form.category)], ...Object.entries(requirement.details).map(([key, value]) => [DETAIL_LABELS[key], formatValue(value)]),
    ["Budget", formatCurrency(requirement.budget)],
    ["Notes", requirement.notes || "-"],
  ];

  return <DetailList rows={rows} />;
}
