import { useEffect, useRef } from "react";
import { Passage } from "../../../types/types";

export default function Word({
  word,
  wordIndex,
  positionCaret,
}: Passage.Prop.Word) {
  const { userInput } = word;

  const wordRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    if (wordRef.current && word.index === wordIndex) {
      positionCaret(wordRef.current, userInput);
    }
  }, [positionCaret, userInput, word.index, wordIndex]);

  function setLetterClass(letter: string, letterIndex: number) {
    if (userInput && userInput[letterIndex] === letter) {
      return "text-typey-ok";
    }

    if (
      userInput[letterIndex] !== letter &&
      word.index <= wordIndex &&
      letterIndex < userInput.length
    ) {
      return "text-typey-bad";
    }

    return "";
  }

  function setWordClass() {
    let className = "mr-2";
    if (!word.match && word.index < wordIndex) {
      className += " ring-2 ring-typey-badder";
    }
    return className;
  }

  return (
    <span className={setWordClass()} ref={wordRef}>
      <ExpectedLetters
        setLetterClass={setLetterClass}
        word={word}
      />
      <ExtraLetters word={word} />
    </span>
  );
}

function ExpectedLetters({
  setLetterClass,
  word,
}: Passage.Prop.ExpectedLetters) {
  return (
    <>
      {word.expect.letters.map((letter, letterIndex) => (
        <span
          className={setLetterClass(letter.char, letterIndex)}
          key={`passageLetter-${letterIndex}`}
        >
          {letter.char}
        </span>
      ))}
    </>
  );
}

function ExtraLetters({ word }: Passage.Prop.ExtraLetters) {
  const wordLength = word.expect.word.length;
  const extras = word.userInput.substring(wordLength).split("");

  return (
    <>
      {extras.map((letter, index) => (
        <span
          className="text-typey-badder"
          key={`extraLetter-${word.index}${index}`}
        >
          {letter}
        </span>
      ))}
    </>
  );
}
