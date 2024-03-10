export default function Caret({ loc }: Passage.Prop.Caret) {
  return (
    <>
      <div
        className={`absolute h-6 border`}
        style={{ top: `${loc.y}px`, left: `${loc.x}px` }}
      ></div>
    </>
  );
}
