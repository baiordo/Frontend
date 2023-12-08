import React, { useState } from "react";

interface SelectProps {
  id: string;
  label?: string;
  chooseLabel?: string;
  options: { value: string; label: string }[];
  onchange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
}

const Select: React.FC<SelectProps> = ({
  id,
  label,
  chooseLabel,
  options,
  onchange: onChange,
  value,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const sortedOptions = options
    .filter((opt) =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.label.localeCompare(b.label));

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setIsOpen(true);
  };

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {label ? (
        <label
          htmlFor={id}
          className="block mt-2 text-base font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      ) : undefined}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          onClick={handleSelectClick}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg dark:bg-gray-800`}
        >
          <select
            id={id}
            className="w-full p-2.5 dark:text-white"
            onChange={onChange}
            value={value}
          >
            {chooseLabel ? (
              <option value={""}>{chooseLabel}</option>
            ) : undefined}
            {sortedOptions.map((opt, index) => (
              <option key={index} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Select;
