import { FieldValues } from "react-hook-form";

import { Common } from "../../types/types";

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Input<T extends FieldValues>({
  inputType,
  label,
  placeholder,
  register,
  required,
  minLength,
  maxLength,
}: Common.Prop.InputField<T>) {
  const capitalizedLabel = capitalizeFirstLetter(label);

  return (
    <label>
      {capitalizedLabel}:
      <input
        type={inputType}
        {...register(label, { required, minLength, maxLength })}
        placeholder={placeholder}
      ></input>
    </label>
  );
}
