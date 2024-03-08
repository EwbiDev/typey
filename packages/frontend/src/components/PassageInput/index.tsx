import { useState } from "react";
import PassageDisplay from "../PassageDisplay";

const dummyText =
  "Ah, the art of typing, a dance of fingers across the keyboard, creating symphonies of words and sentences in the digital realm. As we press down on those keys, we embark on a journey through the vast landscape of cyberspace, weaving thoughts and ideas into existence. The rhythmic click-clack, a testament to our communication prowess, echoes through the virtual corridors, transforming thoughts into tangible text.";
const shortText = "oeu nth oeu nth";

export default function PassageInput() {
  const [passageText, setPassageText] = useState<Passage.Word[]>(
    setupPassageText(shortText),
  );
  const [wordIndex, setWordIndex] = useState(0);

  const prevWord = passageText[wordIndex - 1] || null;
  const curWord = passageText[wordIndex];

  const passageComplete = passageText.every(
    (word) => word.expect === word.userInput,
  );

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (
      event.key === "Backspace" &&
      curWord.userInput.length === 0 &&
      wordIndex > 0
    ) {
      passageText[wordIndex - 1].userInput += " ";
      setWordIndex((i) => i - 1);
      return;
    }
  }

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target.value;
    const lastInput = input[input.length - 1];
    if (
      !passageComplete &&
      input.length < curWord.expect.length + 10 &&
      (prevWord === null || prevWord.match)
    ) {
      if (lastInput === " " && wordIndex + 1 < passageText.length) {
        curWord.match = curWord.expect === curWord.userInput;
        setWordIndex((i) => i + 1);
        return;
      }

      if (lastInput === " ") {
        return;
      }

      const newPassageText = passageText.map((word, index) => {
        if (index === wordIndex) {
          word.userInput = input;
        }
        return word;
      });
      setPassageText(newPassageText);
    }
  }

  return (
    <>
      <input
        className="w-24 text-black"
        value={curWord.userInput}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
      />
      <PassageDisplay passageText={passageText} wordIndex={wordIndex} />
      {passageComplete ? "Complete" : "NotComplete"}
    </>
  );
}

function setupPassageText(inputText: string): Passage.Word[] {
  return inputText.split(" ").map((word, index) => ({
    expect: word,
    userInput: "",
    index,
    match: false,
  }));
}
