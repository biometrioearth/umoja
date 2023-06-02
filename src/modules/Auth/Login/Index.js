/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";

import InputField from "../../../components/Forms/InputField";
import Button from "../../../components/Forms/Button";
import PasswordField from "../../../components/Forms/PasswordField ";

import Logo from "../../../components/Logo/Logo";
import "./login.style.css";

function LoginIndex() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <section className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-5xl">
        <Logo />
        <h2 className="mt-10 text-center text-2xl 2xl:text-3xl font-bold leading-9 tracking-tight text-primary">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 py-5 px-10 bg-white rounded-lg shadow-lg  sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <InputField
              id="email"
              name="email"
              type="email"
              label="Email address"
              required
            />
          </div>

          <div>
            <PasswordField label="Password" forgotPasswordLink="#" />
          </div>

          <div>
            <Button
              type="submit"
              className="bg-primary px-3 py-1.5 2xl:px-4 2xl:py-2.5 text-sm 2xl:text-lg tracking-widest font-semibold leading-6 text-white shadow-sm hover:bg-green-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              loading={isLoading}
            >
              {isLoading ? "Loading..." : "Sign in"}
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">Not a member?</p>
      </div>
    </section>
  );
}

export default LoginIndex;
