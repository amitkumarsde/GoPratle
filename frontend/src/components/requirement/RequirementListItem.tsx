import Link from "next/link";
import { CalendarDays, ChevronRight, MapPin } from "lucide-react";
import CategoryTag from "@/components/ui/CategoryTag";
import { Requirement } from "@/models/requirement";
import { formatCurrency, formatDateRange } from "@/utils/format";

export default function RequirementListItem({ requirement }: { requirement: Requirement }) {
  return (
    <Link href={`/posts/${requirement._id}`} className="group flex items-center gap-4 py-4">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-semibold group-hover:text-brand">{requirement.eventName}</h3>
          <CategoryTag category={requirement.category} />
        </div>
        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
          <span>{requirement.eventType}</span>
          <span className="flex items-center gap-1">
            <CalendarDays size={14} /> {formatDateRange(requirement.startDate, requirement.endDate)}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={14} /> {requirement.location}
          </span>
        </div>
      </div>

      <p className="hidden font-semibold sm:block">{formatCurrency(requirement.budget)}</p>
      <ChevronRight size={20} className="shrink-0 text-gray-400 group-hover:text-brand" />
    </Link>
  );
}
