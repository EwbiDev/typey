import { classNames } from "../../utils/classNames";

export function GradientLoader({ className }: { className?: string }) {
  return (
    <div
      className={classNames(
        "animate-loader bg-400% via-typey-primary-lighter bg-gradient-to-r from-typey-default from-25% via-50% to-typey-default to-75%",
        className ?? "h-12 w-24",
      )}
    ></div>
  );
}
