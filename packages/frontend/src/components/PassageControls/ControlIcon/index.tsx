// Icon names found at https://fonts.google.com/icons
export default function ControlIcon({
  iconName,
  onClick,
}: Passage.Prop.ControlIcon) {
  return (
    <button
      className="material-symbols-outlined cursor-pointer rounded-full p-2 transition delay-75 duration-200 ease-in-out hover:scale-125 hover:bg-typey-primary hover:text-typey-default"
      onClick={onClick}
    >
      {iconName}
    </button>
  );
}
