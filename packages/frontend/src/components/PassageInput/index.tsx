import { useRef, useState, MutableRefObject, useEffect } from "react";
import PassageDisplay from "../PassageDisplay";

const dummyText =
  "Ah, the art of typing, a dance of fingers across the keyboard, creating symphonies of words and sentences in the digital realm. As we press down on those keys, we embark on a journey through the vast landscape of cyberspace, weaving thoughts and ideas into existence. The rhythmic click-clack, a testament to our communication prowess, echoes through the virtual corridors, transforming thoughts into tangible text.";
const shortText = "oeu nth oeu nth";

export default function PassageInput() {
  const [passage, setPassage] = useState<Passage.Word[]>(
    setupPassageText(shortText),
  );
  const [wordIndex, setWordIndex] = useState(0);
  const [inputFocus, setInputFocus] = useState(false);

  const [passageStartTime, setPassageStartTime] = useState(0);
  const [passageEndTime, setPassageEndTime] = useState(0);
  const [passageKeyCounts, setPassageKeyCounts] =
    useState<Passage.AccuracyStats>();

  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

  const prevWord = passage[wordIndex - 1] || null;
  const curWord = passage[wordIndex];

  const passageComplete = passage.every((word) => word.match);

  if (passageComplete) {
    console.log(passageEndTime - passageStartTime, passageKeyCounts);
  }

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

    if (!passageStartTime) {
      setPassageStartTime(Date.now());
    }

    if (passageComplete && !passageEndTime) {
      setPassageEndTime(Date.now());
      setPassageKeyCounts(countAccuracy(passage));
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

      {passageComplete ? "Complete" : "NotComplete"}
      <div className="cursor-pointer blur-sm"></div>
    </>
  );
}

function setupPassageText(inputText: string): Passage.Word[] {
  function mapLetters(word: string) {
    return word
      .split("")
      .map((letter, index) => ({ char: letter, index, perfect: true }));
  }
  return inputText.split(" ").map((word, index) => ({
    expect: {
      word,
      letters: mapLetters(word),
    },
    userInput: "",
    index,
    match: false,
    extraCount: 0,
  }));
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
