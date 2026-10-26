import RequirementForm from "@/components/requirement/RequirementForm";

export default function PostPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">Post a Requirement</h1>
      <p className="mt-1 mb-8 text-gray-500">Fill in your event details in 4 simple steps.</p>
      <RequirementForm />
    </div>
  );
}
