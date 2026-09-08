import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function Input({ label, id, error, className = "", ...props }: InputProps) {
  const inputId = id ?? props.name;
  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="block text-xs font-medium text-gray-400">
        {label}
        {props.required && <span className="ml-1 text-[#00C853]">*</span>}
      </label>
      <input
        id={inputId}
        {...props}
        className={`w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-gray-600 focus:border-[#00C853] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
