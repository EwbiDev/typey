import { FieldValues } from "react-hook-form";

import { Common } from "../../types/types";

export default function Input<T extends FieldValues>({
  inputType,
  label,
  placeholder,
  register,
  required,
  minLength,
  maxLength,
}: Common.Prop.InputField<T>) {
  return (
    <label>
      {label}:
      <input
        type={inputType}
        {...register(label, { required, minLength, maxLength })}
        placeholder={placeholder}
      ></input>
    </label>
  );
}
