import { useState, useEffect, useRef } from "react";

interface MultiSelectOption {
  id: string | number;
  name: string;
}

interface MultiSelectProps {
  label?: string;
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export default function MultiSelect({
  label,
  options,
  value,
  onChange,
  placeholder = "Select options",
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleOption = (id: string | number) => {
    const stringId = String(id);

    if (value.includes(stringId)) {
      onChange(value.filter((item) => item !== stringId));
    } else {
      onChange([...value, stringId]);
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      {label && (
        <label className="mb-1 block text-xs font-medium text-gray-400">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-left text-sm text-white outline-none focus:border-[#00C853]">
        <span className={value.length === 0 ? "text-gray-500" : "text-white"}>
          {value.length === 0 ? placeholder : `${value.length} selected`}
        </span>

        <svg
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-gray-700 bg-gray-900 shadow-xl">
          <div className="max-h-60 overflow-y-auto py-1">
            {options.map((option) => {
              const id = String(option.id);
              const isSelected = value.includes(id);

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => toggleOption(option.id)}
                  className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm text-white hover:bg-gray-800">
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded border ${
                      isSelected
                        ? "border-[#00C853] bg-[#00C853]"
                        : "border-gray-600 bg-gray-800"
                    }`}>
                    {isSelected && (
                      <svg
                        className="h-3 w-3 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </span>

                  <span>{option.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
