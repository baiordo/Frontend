import React from "react";

interface InputProps {
  type: string;
  id: string;
  value?: string;
  label?: string;
  onchange?: (key: string, value: string) => void;
  autocomplete: string;
}

const Input: React.FC<InputProps> = ({
  type,
  id,
  label,
  value,
  onchange,
  autocomplete,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = event.target;
    if (onchange) {
      onchange(id, value);
    }
  };
  return (
    <>
      {label ? (
        <label
          htmlFor={id}
          className='block mt-2 text-base font-medium text-gray-900 dark:text-white'
        >
          {label}
        </label>
      ) : undefined}

      <input
        type={type}
        id={id}
        value={value}
        onChange={handleInputChange}
        autoComplete={autocomplete}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      />
    </>
  );
};

export default Input;
