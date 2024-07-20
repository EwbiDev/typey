import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import Input from "../Input";
import { User } from "../../types/types";
import { userApi } from "../../utils/api";
import { FailureMessage } from "../FailureMessage";

interface ErrorDetails {
  message: string;
  error: string;
  statusCode?: number;
}

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User.RegistrationFormData>();
  const [registrationSuccess, setRegistrationSuccess] = useState<boolean>();
  const [errorDetails, setErrorDetails] = useState<ErrorDetails>();

  const onSubmit: SubmitHandler<User.RegistrationFormData> = async (data) => {
    const response = await userApi.register(data);

    if (response && response?.status >= 201 && response?.status < 400) {
      setRegistrationSuccess(true);
      return;
    }

    if (response?.data?.error) {
      setErrorDetails(response.data);
      setRegistrationSuccess(false);
      return;
    }

    setErrorDetails({
      message: "Unable to connect to server, please try again later",
      error: "No connection",
    });
    setRegistrationSuccess(false);
  };

  return (
    <>
      {!registrationSuccess && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex max-w-96 flex-col gap-4 rounded-md border p-4"
        >
          <h2>Register</h2>
          <Input
            inputType="text"
            label="username"
            placeholder=""
            register={register}
            minLength={1}
            maxLength={24}
            fieldError={errors.username}
            required
          />
          <Input
            inputType="password"
            label="password"
            placeholder=""
            register={register}
            minLength={8}
            maxLength={128}
            fieldError={errors.password}
            required
          />
          <input type="submit" className="p-2" />
        </form>
      )}
      {registrationSuccess && <SuccessMessage />}
      {!registrationSuccess && errorDetails && (
        <FailureMessage message={errorDetails.message} />
      )}
    </>
  );
}

function SuccessMessage() {
  return (
    <div>
      <h2>Success!</h2>
      <Link to="/login">Login here</Link>
    </div>
  );
}
