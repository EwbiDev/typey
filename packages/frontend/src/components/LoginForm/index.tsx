import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Container from "../Container";
import Input from "../Input";
import SubmitInput from "../SubmitInput";

import { authApi } from "../../utils/api";

import { User } from "../../types/types";

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
    <Container>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-1/2 max-w-96 flex-col gap-4 rounded-md p-4"
      >
        <h2>Login</h2>
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
        {errorMessage && <ErrorMessage message={errorMessage} />}
        <SubmitInput type="secondaryFull" errors={errors} />
      </form>
    </Container>
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
