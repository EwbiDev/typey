import { useRef, useState, MutableRefObject } from "react";
import PassageDisplay from "../PassageDisplay";
import { Passage } from "../../types/types";

export default function PassageInput({
  passage,
  passageComplete,
  passageStats,
  setPassage,
  setPassageStats,
  setWordIndex,
  wordIndex,
}: Passage.Prop.Input) {
  const [inputFocus, setInputFocus] = useState(false);

  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

  const prevWord = passage[wordIndex - 1] || null;
  const curWord = passage[wordIndex];
  const { startTime, endTime } = passageStats;

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (
      event.key === "Backspace" &&
      curWord.userInput.length === 0 &&
      wordIndex > 0
    ) {
      passage[wordIndex - 1].userInput += " ";
      setWordIndex((i) => i - 1);
      return;
    }
  }

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    let input = event.target.value;
    const inputIndex = input.length - 1;
    const lastInput = input[inputIndex];

    if (!startTime) {
      setPassageStats({ ...passageStats, startTime: Date.now() });
    }

    if (
      !passageComplete &&
      input.length < curWord.expect.word.length + 10 &&
      (prevWord === null || prevWord.match)
    ) {
      if (lastInput === " ") {
        setWordIndex((i) => i + 1);
        input = input.slice(0, input.length - 1);
      }

      curWord.match = curWord.expect.word === input;

      const expectedLetter = curWord.expect.letters[inputIndex];
      if (expectedLetter?.perfect && expectedLetter.char !== lastInput) {
        expectedLetter.perfect = false;
      }

      if (
        input.length > curWord.expect.word.length &&
        input.length > curWord.userInput.length
      ) {
        curWord.extraCount++;
      }

      const updatedPassage = passage.map((word, index) => {
        if (index === wordIndex) {
          word.userInput = input;
        }
        return word;
      });

      if (updatedPassage.every((word) => word.match) && !endTime) {
        setPassageStats({
          ...passageStats,
          endTime: Date.now(),
          accuracy: countAccuracy(passage),
        });
      }
      setPassage(updatedPassage);
    }
  }

  function handleFocusClick() {
    if (!inputFocus) {
      inputRef.current?.focus();
    }
  }

  return (
    <>
      <div className="relative" onClick={handleFocusClick}>
        <PassageDisplay
          passage={passage}
          wordIndex={wordIndex}
          hasFocus={inputFocus}
        />
        <input
          className="absolute cursor-default select-none opacity-0"
          ref={inputRef}
          value={curWord.userInput}
          onChange={handleOnChange}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        />
        {!inputFocus && (
          <div
            className="absolute bottom-1/2 right-1/2 w-48 translate-x-1/2 translate-y-1/2 cursor-pointer text-center blur-0"
            onClick={() => inputRef.current?.focus()}
          >
            Click to focus
          </div>
        )}
      </div>
    </>
  );
}

function countAccuracy(passage: Passage.Word[]) {
  const counts = { hit: 0, miss: 0, extras: 0 };

  passage.forEach((word) => {
    word.expect.letters.forEach((letter) => {
      if (letter.perfect) {
        counts.hit++;
      } else {
        counts.miss++;
      }
    });
    counts.extras += word.extraCount;
  });

  return counts;
}
