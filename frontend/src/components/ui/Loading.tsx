import { LoaderCircle } from "lucide-react";

export default function Loading({ text }: { text: string }) {
  return (
    <p className="flex items-center gap-2 text-gray-500">
      <LoaderCircle size={18} className="animate-spin" /> {text}
    </p>
  );
}
