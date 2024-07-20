import { Common } from "../../types/types";

export default function SubmitInput({type}: Common.Prop.SubmitInput) {
  const typeVariants = {
    secondaryFull: {
      bg: "bg-typey-primary",
      hoverBg: "hover:bg-typey-default",
      textClr: "text-typey-background",
      hoverTextClr: "hover:text-typey-background",
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

  return (
    <input
      type="submit"
      className={`rounded-lg ${bg} p-2 ${textClr} ${border} transition delay-75 duration-200 ease-in-out hover:scale-105 ${hoverBg} ${hoverTextClr} ${borderHover}`}
    />
  );
}
