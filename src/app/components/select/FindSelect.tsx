import React, { useState } from "react";
import Select from 'react-select';

interface SelectProps {
  id: string;
  label?: string;
  chooseLabel?: string;
  options: { value: string; label: string }[];
  onchange: (selectedOption: { value: string; label: string } | null) => void;
  value?: { value: string; label: string } | null;
}

const FindSelect: React.FC<SelectProps> = ({
  id,
  label,
  chooseLabel,
  options,
  onchange,
  value,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedOptions = filteredOptions.sort((a, b) =>
    a.label.localeCompare(b.label)
  );

  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={id}
          className="block mt-2 text-base font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <Select
        id={id}
        options={sortedOptions}
        onChange={onchange}
        value={value}
        placeholder={chooseLabel}
        isSearchable
      />
    </div>
  );
};

export default FindSelect;

