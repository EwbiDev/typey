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

  function populateErrorMessage() {
    switch (fieldError!.type) {
      case "minLength":
        return `must be at least ${minLength} characters long`;
      case "maxLength":
        return `must be no more than ${maxLength} characters long`;
      case "required":
        return `is required`;
      default:
        return "unknown error";
    }
  }

  return (
    <div className="relative">
      <label>
        {capitalizedLabel}:
        <input
          type={inputType}
          {...register(label, { required, minLength, maxLength })}
          placeholder={placeholder}
        ></input>
      </label>
      {fieldError && (
        <ErrorTooltip
          label={capitalizedLabel}
          message={populateErrorMessage()}
        />
      )}
    </div>
  );
}

function ErrorTooltip({ label, message }: { label: string; message: string }) {
  return (
    <div>
      {label} {message}
    </div>
  );
}
