import Word from "./Word";

export default function PassageDisplay({
  hasFocus,
  wordIndex,
  passageText,
}: Passage.Prop.Display) {
  return (
    <div
      className={`text-typey-secondary flex min-h-24 select-none flex-wrap ${!hasFocus && "cursor-pointer blur"}`}
    >
      {passageText.map((word, mapIndex) => (
        <Word
          word={word}
          wordIndex={wordIndex}
          key={`passageWord-${mapIndex}`}
        />
      ))}
    </div>
  );
}
