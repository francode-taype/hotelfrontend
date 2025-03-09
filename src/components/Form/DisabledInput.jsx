import React from "react";

const DisabledInput = ({ label, type = "text", name, value, placeholder }) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        disabled
        className="bg-secondary-100 mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-secondary-900 sm:text-sm cursor-not-allowed"
      />
    </div>
  );
};

export default DisabledInput;