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

  const errorClass = 'outline-typey-bad focus:outline-typey-bad'

  function populateErrorMessage() {
    switch (fieldError!.type) {
      case "minLength":
        return `minimum ${minLength} characters`;
      case "maxLength":
        return `maximum ${maxLength} characters`;
      case "required":
        return `required field`;
      default:
        return "unknown error";
    }
  }

  return (
      <div className="relative">
        <label className="flex flex-col">
          {capitalizedLabel}:
          <input
            className={`rounded-sm bg-typey-background p-2 text-typey-primary outline outline-typey-secondary focus:outline-typey-primary ${fieldError && errorClass}`}
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
