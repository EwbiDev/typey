import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Container from "../Container";
import Card from "../Card";
import Center from "../Center";
import Input from "../Input";
import SubmitInput from "../SubmitInput";

import { AppDispatch, RootState } from "../../app/store";
import { registerUser } from "../../features/auth/authActions";

import { User } from "../../types/types";
import { ErrorMessage } from "../ErrorMessage";

export default function RegistrationForm() {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);
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
      <Center>
        <h2 className="mb-10 text-center text-2xl font-semibold text-typey-primary">
          Register
        </h2>
        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {auth.error && <ErrorMessage message={auth.error.message} />}
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
            <SubmitInput type="secondaryFull" text="Register" />
          </form>
        </Card>
        <p className="mt-10 text-center text-sm text-typey-primary">
          Have an account?{" "}
          <Link
            to="/register"
            className="font-semibold leading-6 text-typey-secondary hover:text-typey-default"
          >
            Log in here!
          </Link>
        </p>
      </Center>
    </Container>
  );
}
