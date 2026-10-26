"use client";

import { useState } from "react";
import Link from "next/link";
import RequirementListItem from "@/components/requirement/RequirementListItem";
import Loading from "@/components/ui/Loading";
import { CATEGORIES } from "@/constants/requirement";
import { useRequirements } from "@/controllers/useRequirements";

// "All" plus one filter per category, using the same labels as the category tags
const filters = [{ value: "All", label: "All" }, ...CATEGORIES];

export default function AllPostsPage() {
  const { requirements, loading, error, retry } = useRequirements();
  const [filter, setFilter] = useState("All");

  const filteredRequirements = filter === "All" ? requirements : requirements.filter((item) => item.category === filter);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold">All Posts</h1>
      <p className="mt-1 text-gray-500">All posted event requirements, newest first. Click a post to see full details.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setFilter(item.value)}
            className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium ${
              filter === item.value ? "bg-brand text-white" : "bg-brand-light text-brand hover:bg-brand-light-hover"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {loading && <Loading text="Loading posts..." />}

        {!loading && error && (
          <div className="text-red-600">
            <p>{error}</p>
            <button type="button" onClick={retry} className="mt-2 cursor-pointer font-medium underline">
              Try again
            </button>
          </div>
        )}

        {!loading && !error && filteredRequirements.length === 0 && (
          <div className="py-10 text-center text-gray-500">
            <p>No posts found.</p>
            <Link href="/post" className="mt-3 inline-block font-medium text-brand">
              Post a requirement
            </Link>
          </div>
        )}

        {!loading && !error && filteredRequirements.length > 0 && (
          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {filteredRequirements.map((requirement) => (
              <RequirementListItem key={requirement._id} requirement={requirement} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
