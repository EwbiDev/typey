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
    (wordRef: HTMLDivElement, userInput: string) => {
      if (displayRef.current) {
        let letter: {x: number, y: number};
        if (userInput.length) {
          const letterRect = wordRef.children[userInput.length - 1].getClientRects()[0];
          letter = {x: letterRect.right, y: letterRect.y}
        } else {
          const letterRect = wordRef.children[userInput.length].getClientRects()[0];
          letter = {x: letterRect.left, y: letterRect.y}
        }

        const display = displayRef.current.getBoundingClientRect();

        const x = letter.x - display.x - 2;
        const y = letter.y - display.y;

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
        className={`text-typey-secondary flex items-start min-h-24 select-none flex-wrap ${!hasFocus && "cursor-pointer blur"}`}
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
