import React from "react";

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
  return (
    <>
      {label ? (
        <label
          htmlFor={id}
          className="block mt-2 text-base font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      ) : undefined}
      <select
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={onChange}
        value={value}
      >
        {chooseLabel ? (
          <option value={""}>{chooseLabel}</option>
        ) : undefined}
        {options.map((opt, index) => (
          <option key={index} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;