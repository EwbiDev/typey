import { SubmitHandler, useForm } from "react-hook-form";

import Input from "../Input";

interface RegistrationFormData {
  Username: string;
  Email: string;
  Password: string;
}

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>();

  const onSubmit: SubmitHandler<RegistrationFormData> = (data) => {
    return console.log(data, errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Register</h2>
      <Input
        inputType="text"
        label="Username"
        placeholder="Typey McTypeFace"
        register={register}
        minLength={1}
        maxLength={24}
        required
      />
      <Input
        inputType="email"
        label="Email"
        placeholder="typey@mctype.face"
        register={register}
        required
      />
      <Input
        inputType="password"
        label="Password"
        placeholder=""
        register={register}
        minLength={8}
        maxLength={128}
        required
      />
      <input type="submit" />
    </form>
  );
}
