import { classNames } from "../../utils/classNames";

export default function DefaultUserIcon({ className }: { className?: string }) {
  return (
    <span
      className={classNames(
        "material-symbols-outlined flex items-center justify-center rounded-full",
        className || "",
      )}
    >
      person
    </span>
  );
}
