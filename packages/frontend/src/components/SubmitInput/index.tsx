import { Common } from "../../types/types";

export default function SubmitInput({
  type,
  text = "Submit",
}: Common.Prop.SubmitInput) {
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
  };

  const { bg, hoverBg, textClr, hoverTextClr, border, borderHover } =
    typeVariants[type];

  const classNameBase = `w-full rounded-lg p-2 cursor-pointer`;
  const className = `${classNameBase} ${bg} ${textClr} ${border} ${hoverBg} ${hoverTextClr} ${borderHover}`;

  return <input type="submit" className={className} value={text} />;
}
