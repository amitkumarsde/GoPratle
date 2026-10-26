interface CheckboxProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function Checkbox({ label, name, checked, onChange }: CheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 cursor-pointer accent-brand"
      />
      {label}
    </label>
  );
}
