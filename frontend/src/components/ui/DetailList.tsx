// Shows label / value rows, used on the review step and the post detail page
export default function DetailList({ rows }: { rows: string[][] }) {
  return (
    <div className="divide-y divide-gray-200 border-y border-gray-200">
      {rows.map(([label, value]) => (
        <div key={label} className="grid gap-1 py-3 sm:grid-cols-3">
          <p className="text-sm text-gray-500">{label}</p>
          <p className="break-words text-sm font-medium whitespace-pre-line sm:col-span-2">{value}</p>
        </div>
      ))}
    </div>
  );
}
