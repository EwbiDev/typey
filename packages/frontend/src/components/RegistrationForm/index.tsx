import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import Input from "../Input";
import { User } from "../../types/types";
import { userApi } from "../../utils/api";
import { FailureMessage } from "../FailureMessage";
import Container from "../Container";
import SubmitInput from "../SubmitInput";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/auth/authActions";
import { RootState } from "../../app/store";

interface ErrorDetails {
  message: string;
  error: string;
  statusCode?: number;
}

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const { loading, success, user, error } = useSelector(
    (state: RootState) => state.auth,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User.RegistrationFormData>();

  const onSubmit: SubmitHandler<User.RegistrationFormData> = async (data) => {
    dispatch(registerUser(data));
  };

  return (
    <Container>
      {!success && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-1/2 max-w-96 flex-col gap-4 rounded-md p-4"
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
          <SubmitInput type="secondaryFull" errors={errors} />
        </form>
      )}
      {success && <SuccessMessage />}
      {!success && error && <FailureMessage message={error.message} />}
      {!success && <LoginLink />}
    </Container>
  );
}

function SuccessMessage() {
  return (
    <div>
      <h2>Registration success!</h2>
      <p>
        You may now login{" "}
        <Link to="/login" className=" text-typey-primary underline">
          here
        </Link>
      </p>
    </div>
  );
}

function LoginLink() {
  return (
    <div>
      Have an account? Login{" "}
      <Link to="/login" className=" text-typey-primary underline">
        here
      </Link>
    </div>
  );
}
