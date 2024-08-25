import { classNames } from "../../utils/classNames";

export default function ErrorIcon({ className }: { className?: string }) {
  return (
    <span className={classNames("material-symbols-outlined", className || "")}>
      Error
    </span>
  );
}
