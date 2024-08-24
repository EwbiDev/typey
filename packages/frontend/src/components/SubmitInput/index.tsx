import { Common } from "../../types/types";

export default function SubmitInput({ type, errors }: Common.Prop.SubmitInput) {
  const typeVariants = {
    secondaryFull: {
      bg: "bg-typey-primary",
      hoverBg: "hover:bg-typey-primary-light",
      textClr: "text-typey-default",
      hoverTextClr: "hover:text-white",
      border: "",
      borderHover: "",
    },
    primaryEmpty: {
      bg: "bg-typey-background",
      hoverBg: "hover:bg-typey-background",
      textClr: "text-typey-primary",
      hoverTextClr: "hover:text-typey-default",
      border: "border border-typey-primary",
      borderHover: "hover:border hover:border-typey-default",
    },
    error: {
      bg: "bg-typey-background",
      hoverBg: "hover:bg-typey-background",
      textClr: "text-typey-bad",
      hoverTextClr: "hover:text-typey-bad",
      border: "border border-typey-bad",
      borderHover: "hover:border hover:border-typey-bad",
    },
  };

  const showError = Object.keys(errors).length > 0;

  const { bg, hoverBg, textClr, hoverTextClr, border, borderHover } = showError
    ? typeVariants.error
    : typeVariants[type];

  const classNameBase = `w-full rounded-lg p-2 cursor-pointer`;
  const className = `${classNameBase} ${bg} ${textClr} ${border} ${hoverBg} ${hoverTextClr} ${borderHover}`;

  const text = showError ? "Error!" : "Submit";

  return <input type="submit" className={className} value={text} />;
}
