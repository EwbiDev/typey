import Word from "./Word";

export default function PassageDisplay({
  wordIndex,
  passageText,
}: Passage.Prop.Display) {
  return (
    <div className="text-typey-secondary flex flex-wrap select-none">
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
