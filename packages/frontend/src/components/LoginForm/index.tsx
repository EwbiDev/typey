import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Input from "../Input";
import SubmitInput from "../SubmitInput";

import { authApi } from "../../utils/api";

import { User } from "../../types/types";
import Container from "../Container";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User.LoginFormData>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const onSubmit: SubmitHandler<User.LoginFormData> = async (data) => {
    const response = await authApi.login(data);

    if (response && response?.status >= 201 && response?.status < 400) {
      setErrorMessage(undefined);
      return;
    }

    if (response && response?.status == 401) {
      setErrorMessage("Username and password does not match");
      return;
    }

    setErrorMessage("Unknown error, please try again later");
  };

  return (
    <>
      <Container>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-typey-default px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {errorMessage && <ErrorMessage message={errorMessage} />}
              <Input
                inputType="text"
                label="username"
                placeholder=""
                register={register}
                maxLength={24}
                fieldError={errors.username}
                required
              />
              <Input
                inputType="password"
                label="password"
                placeholder=""
                register={register}
                maxLength={128}
                fieldError={errors.password}
                required
              />
              <SubmitInput type="secondaryFull" errors={errors} text="Log in" />
            </form>
          </div>

          <p className="mt-10 text-center text-sm text-typey-primary">
            No account?{" "}
            <a
              href="/register"
              className="font-semibold leading-6 text-typey-secondary hover:text-typey-default"
            >
              Register here!
            </a>
          </p>
        </div>
      </Container>
    </>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex justify-center gap-2 text-typey-bad">
      <span className="material-symbols-outlined">Error</span>
      {message}
    </div>
  );
}
