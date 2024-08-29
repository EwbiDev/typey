import { ErrorIcon } from "../Icons";

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex justify-center gap-2 text-typey-bad">
      <ErrorIcon />
      {message}
    </div>
  );
}
