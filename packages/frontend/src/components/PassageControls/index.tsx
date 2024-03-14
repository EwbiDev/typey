import ControlIcon from "./ControlIcon";

export default function PassageControls() {
  return (
    <div className="flex w-6/12 select-none justify-around place-self-center rounded-2xl bg-typey-default p-4 text-xl text-typey-primary">
      <ControlIcon iconName="replay" />
      <ControlIcon iconName="trophy" />
      <ControlIcon iconName="arrow_left_alt" />
      <ControlIcon iconName="arrow_right_alt" />
    </div>
  );
}
