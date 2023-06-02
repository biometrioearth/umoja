import React from 'react';

const InputField = ({ id, name, type, label, required }) => {
  return (
    <div className="mt-2">
      <label className="block  text-sm 2xl:text-lg font-bold leading-6 text-gray-900">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
      />
    </div>
  );
};

export default InputField;
