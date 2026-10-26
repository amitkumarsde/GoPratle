import { Suspense } from "react";
import RequirementDetail from "@/components/requirement/RequirementDetail";

export default function PostDetailPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* The id is only known at request time, so the detail view needs a Suspense boundary */}
      <Suspense fallback={<p className="text-gray-500">Loading...</p>}>
        <RequirementDetail />
      </Suspense>
    </div>
  );
}
