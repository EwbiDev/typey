import ControlIcon from "./ControlIcon";

export default function PassageControls({
  replayPassage,
}: Passage.Prop.Controls) {
  return (
    <div className="flex w-6/12 select-none justify-around place-self-center rounded-2xl bg-typey-default p-4 text-xl text-typey-primary">
      <ControlIcon iconName="replay" onClick={replayPassage} />
      <ControlIcon iconName="trophy" onClick={() => {}} />
      <ControlIcon iconName="arrow_left_alt" onClick={() => {}} />
      <ControlIcon iconName="arrow_right_alt" onClick={() => {}} />
    </div>
  );
}
