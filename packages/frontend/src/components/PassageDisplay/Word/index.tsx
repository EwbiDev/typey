import { useEffect, useRef } from "react";

export default function Word({
  word,
  wordIndex,
  positionCaret,
}: Passage.Prop.Word) {
  const letterArray = word.expect.split("");
  const { userInput } = word;

  const wordRef: React.MutableRefObject<HTMLElement | null> = useRef(null);

  useEffect(() => {
    if (word.index === wordIndex) {
      const wordRects = wordRef.current?.getClientRects()[0];

      if (wordRects) {
        positionCaret(wordRects, word.expect, userInput);
      }
    }
  }, [positionCaret, userInput, word.expect, word.index, wordIndex]);

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
      {letterArray.map((letter, letterIndex) => (
        <>
          <span
            className={setLetterClass(letter, letterIndex)}
            key={`passageLetter-${wordIndex}${letterIndex}`}
          >
            {letter}
          </span>
        </>
      ))}
      <ExtraLetters word={word} />
    </span>
  );
}

function ExtraLetters({ word }: Passage.Prop.ExtraLetters) {
  const wordLength = word.expect.length;
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
