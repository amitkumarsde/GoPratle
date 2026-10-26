"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import CategoryTag from "@/components/ui/CategoryTag";
import DetailList from "@/components/ui/DetailList";
import Loading from "@/components/ui/Loading";
import { useRequirementDetail } from "@/controllers/useRequirements";
import { DETAIL_LABELS } from "@/constants/requirement";
import { getCategoryLabel } from "@/utils/requirement";
import { formatCurrency, formatDate, formatDateRange, formatValue } from "@/utils/format";

export default function RequirementDetail() {
  const { id } = useParams<{ id: string }>();
  const { requirement, loading, error } = useRequirementDetail(id);

  if (loading) {
    return <Loading text="Loading requirement..." />;
  }

  if (error || !requirement) {
    return (
      <div className="text-red-600">
        <p>{error || "Requirement not found"}</p>
        <Link href="/posts" className="mt-2 inline-block font-medium underline">
          Back to all posts
        </Link>
      </div>
    );
  }

  const eventRows = [
    ["Event Type", requirement.eventType],
    ["Date", formatDateRange(requirement.startDate, requirement.endDate)],
    ["Location", requirement.location],
    ["Venue", requirement.venue || "-"],
    ["Budget", formatCurrency(requirement.budget)],
    ["Posted On", requirement.createdAt ? formatDate(requirement.createdAt) : "-"],
  ];

  const detailRows = Object.entries(requirement.details).map(([key, value]) => [DETAIL_LABELS[key] || key, formatValue(value)]);

  return (
    <div>
      <Link href="/posts" className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-brand">
        <ArrowLeft size={16} /> Back to all posts
      </Link>

      <div className="mt-6">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-2xl font-bold">{requirement.eventName}</h1>
          <CategoryTag category={requirement.category} />
        </div>

        <h2 className="mt-8 mb-2 font-semibold">Event Details</h2>
        <DetailList rows={eventRows} />

        <h2 className="mt-8 mb-2 font-semibold">{getCategoryLabel(requirement.category)} Requirements</h2>
        <DetailList rows={detailRows} />

        {requirement.notes && (
          <>
            <h2 className="mt-8 mb-2 font-semibold">Notes</h2>
            <p className="text-sm whitespace-pre-line text-gray-700">{requirement.notes}</p>
          </>
        )}
      </div>
    </div>
  );
}
