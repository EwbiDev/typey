import { Passage } from "../../types/types";

export default function Caret({ loc }: Passage.Prop.Caret) {
  return (
    <>
      <div
        className={`absolute h-5 border`}
        style={{ top: `${loc.y}px`, left: `${loc.x}px` }}
      ></div>
    </>
  );
}
