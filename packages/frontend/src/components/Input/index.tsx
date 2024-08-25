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
  fieldError,
}: Common.Prop.InputField<T>) {
  const capitalizedLabel = capitalizeFirstLetter(label);

  const errorClass = "outline-typey-bad focus:outline-typey-bad";

  function populateErrorMessage() {
    switch (fieldError!.type) {
      case "minLength":
        return `minimum ${minLength} characters`;
      case "maxLength":
        return `maximum ${maxLength} characters`;
      case "required":
        return `required`;
      case "custom":
        return fieldError?.message || "";
      default:
        return "unknown error";
    }
  }

  return (
    <div className="relative">
      <label className="text-typey-primary">
        {capitalizedLabel}:
        <input
          className={`block w-full rounded-md border-0 p-2 text-typey-primary outline outline-1 outline-typey-secondary ring-1 focus:ring-2 focus:ring-inset focus:ring-typey-primary-light ${fieldError && errorClass}`}
          type={inputType}
          {...register(label, { required, minLength, maxLength })}
          placeholder={placeholder}
        ></input>
      </label>
      {fieldError && <ErrorTooltip message={populateErrorMessage()} />}
    </div>
  );
}

function ErrorTooltip({ message }: { message: string }) {
  return <div className="absolute right-0 top-0 text-typey-bad">{message}</div>;
}
