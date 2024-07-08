import { useNavigate } from "react-router-dom";

import ControlIcon from "./ControlIcon";
import { Passage } from "../../types/types";

export default function PassageControls({
  prevPassage,
  nextPassage,
  replayPassage,
}: Passage.Prop.Controls) {
  const navigate = useNavigate();

  return (
    <div className="flex w-6/12 select-none justify-around place-self-center rounded-2xl bg-typey-default p-4 text-xl text-typey-primary">
      <ControlIcon iconName="replay" onClick={replayPassage} />
      <ControlIcon
        iconName="add"
        onClick={() => {
          navigate("/passage/new");
        }}
      />
      <ControlIcon iconName="arrow_left_alt" onClick={prevPassage} />
      <ControlIcon iconName="arrow_right_alt" onClick={nextPassage} />
    </div>
  );
}
