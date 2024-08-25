import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import Container from "../Container";
import { ErrorIcon } from "../Icons";
import Input from "../Input";
import SubmitInput from "../SubmitInput";

import { RootState } from "../../app/store";
import { loginUser } from "../../features/auth/authActions";

import { User } from "../../types/types";

export default function LoginForm() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<User.LoginFormData>();

  const onSubmit: SubmitHandler<User.LoginFormData> = async (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (auth.error?.statusCode === 401) {
      // Unauthorized
      setError("username", { type: "custom" });
      setError("password", { type: "custom" });
    }
  }, [auth.error, setError]);

  return (
    <>
      <Container>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-typey-default px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {auth.error && <ErrorMessage message={auth.error.message} />}
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
              <SubmitInput type="secondaryFull" text="Log in" />
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
      <ErrorIcon />
      {message}
    </div>
  );
}
