import { Category } from "@/models/requirement";
import { getCategoryLabel } from "@/utils/requirement";

export default function CategoryTag({ category }: { category: Category }) {
  return <span className="rounded-full bg-brand-light px-3 py-1 text-xs font-medium text-brand">{getCategoryLabel(category)}</span>;
}
