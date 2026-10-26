import FieldError from "@/components/form/FieldError";

interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

export default function Input({ label, name, value, onChange, error, type = "text", placeholder, required }: InputProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium">
        {label} {required && <span className="text-brand">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg border px-3 py-2 outline-none focus:border-brand ${error ? "border-red-500" : "border-gray-300"}`}
      />
      <FieldError message={error} />
    </div>
  );
}
