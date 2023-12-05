import React from "react";

interface TextAreaProps {
  id: string;
  label: string;
  height?: string;
  value?: string;
  onchange?: (key: string, value: string) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ id, label, height, value, onchange }) => {
  const handleAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, id } = event.target;
    if (onchange) {
      onchange(id, value);
    }
  };
  return (
    <div>
      <label htmlFor={id} className="block mt-2 text-base font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={handleAreaChange}
        className={"block p-2.5 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " + height}
      ></textarea>
    </div>
  );
};

export default TextArea;