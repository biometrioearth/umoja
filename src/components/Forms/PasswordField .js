import React from 'react';

const PasswordField = ({ label, forgotPasswordLink }) => {
  return (
    <div>
      <label className="block text-sm 2xl:text-lg font-bold leading-6 text-gray-900">
        {label}
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
      />
            <div className="text-sm">
        <a
          href={forgotPasswordLink}
          className="font-semibold text-primary hover:text-green-800"
        >
          Forgot password?
        </a>
      </div>
    </div>
  );
};

export default PasswordField;
