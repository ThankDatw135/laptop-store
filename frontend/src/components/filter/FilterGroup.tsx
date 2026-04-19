import { useState } from 'react';

interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface FilterGroupProps {
  title: string;
  options: FilterOption[];
  selectedValues: string[];
  onChange: (value: string, checked: boolean) => void;
  defaultExpanded?: boolean;
}

export const FilterGroup = ({ title, options, selectedValues, onChange, defaultExpanded = true }: FilterGroupProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  if (options.length === 0) return null;

  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        type="button"
        className="flex w-full items-center justify-between text-sm font-medium text-gray-900"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>{title}</span>
        <span className="ml-6 flex items-center">
          {isExpanded ? (
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
          )}
        </span>
      </button>

      {isExpanded && (
        <div className="pt-4 space-y-3">
          {options.map((option) => (
            <div key={option.value} className="flex items-center">
              <input
                id={`filter-${title}-${option.value}`}
                name={`${title}[]`}
                value={option.value}
                type="checkbox"
                checked={selectedValues.includes(option.value)}
                onChange={(e) => onChange(option.value, e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label
                htmlFor={`filter-${title}-${option.value}`}
                className="ml-3 text-sm text-gray-600 flex-1 cursor-pointer select-none flex justify-between"
              >
                <span>{option.label}</span>
                {option.count !== undefined && <span className="text-gray-400 text-xs">({option.count})</span>}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
