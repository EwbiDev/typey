import { SubmitHandler, useForm } from "react-hook-form";

import Input from "../Input";
import { User } from "../../types/types";
import { userApi } from "../../utils/api";

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User.RegistrationFormData>();

  const onSubmit: SubmitHandler<User.RegistrationFormData> = async (data) => {
    const response = await userApi.register(data);
    console.log(response);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Register</h2>
      <Input
        inputType="text"
        label="username"
        placeholder="Typey McTypeFace"
        register={register}
        minLength={1}
        maxLength={24}
        required
      />
      <Input
        inputType="email"
        label="email"
        placeholder="typey@mctype.face"
        register={register}
        required
      />
      <Input
        inputType="password"
        label="password"
        placeholder=""
        register={register}
        minLength={8}
        maxLength={128}
        required
      />
      <input type="submit" />
      {errors.email && <div>Email error</div>}
      {errors.username && <div>Username error</div>}
      {errors.password && <div>Password error</div>}
    </form>
  );
}
