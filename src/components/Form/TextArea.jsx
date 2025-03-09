import React from "react";

const TextArea = ({ label, name, value, onChange, placeholder, required = false, rows = 4, disabled = false }) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        disabled={disabled}
        className="bg-secondary-100 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-secondary-900 smsm:text-sm"
      />
    </div>
  );
};

export default TextArea;