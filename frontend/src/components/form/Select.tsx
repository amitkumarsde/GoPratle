import FieldError from "@/components/form/FieldError";

interface SelectProps {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

export default function Select({ label, name, value, options, onChange, error, required }: SelectProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium">
        {label} {required && <span className="text-brand">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full cursor-pointer rounded-lg border bg-white px-3 py-2 outline-none focus:border-brand ${error ? "border-red-500" : "border-gray-300"}`}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <FieldError message={error} />
    </div>
  );
}
