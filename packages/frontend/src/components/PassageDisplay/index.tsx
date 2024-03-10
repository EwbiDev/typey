import { useCallback, useRef, useState } from "react";
import Caret from "../Caret";
import Word from "./Word";

export default function PassageDisplay({
  hasFocus,
  wordIndex,
  passageText,
}: Passage.Prop.Display) {
  const [caretLoc, setCaretLoc] = useState({ x: 0, y: 0 });

  const displayRef: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null);

  const positionCaret = useCallback(
    (wordRects: Passage.WordRects, expectedInput: string, userInput: string) => {
      if (displayRef.current) {
        const { x: wordX, y: wordY, width: wordWidth } = wordRects;
        const { x: displayX, y: displayY } =
          displayRef.current.getBoundingClientRect();

        let offset = wordWidth

        if (userInput.length < expectedInput.length) {
          offset *= (userInput.length / expectedInput.length)
        }

        const x = wordX - displayX + offset - 2;
        const y = wordY - displayY;

        setCaretLoc({ x, y });
        return;
      }

      setCaretLoc({ x: 0, y: 0 });
    },
    [],
  );

  return (
    <>
      {hasFocus && <Caret loc={caretLoc} />}
      <div
        className={`text-typey-secondary flex min-h-24 select-none flex-wrap ${!hasFocus && "cursor-pointer blur"}`}
        ref={displayRef}
      >
        {passageText.map((word, mapIndex) => (
          <Word
            word={word}
            wordIndex={wordIndex}
            key={`passageWord-${mapIndex}`}
            positionCaret={positionCaret}
          />
        ))}
      </div>
    </>
  );
}
