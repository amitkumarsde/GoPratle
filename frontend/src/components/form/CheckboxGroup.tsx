import FieldError from "@/components/form/FieldError";

interface CheckboxGroupProps {
  label: string;
  name: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  error?: string;
}

export default function CheckboxGroup({ label, name, options, selected, onChange, error }: CheckboxGroupProps) {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div>
      <p className="mb-2 text-sm font-medium">
        {label} <span className="text-brand">*</span>
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label key={option} className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              name={name}
              checked={selected.includes(option)}
              onChange={() => toggleOption(option)}
              className="cursor-pointer accent-brand"
            />
            {option}
          </label>
        ))}
      </div>
      <FieldError message={error} />
    </div>
  );
}
