import { useState } from "react";
import PassageInput from "../PassageInput";

const dummyText =
  "Ah, the art of typing, a dance of fingers across the keyboard, creating symphonies of words and sentences in the digital realm. As we press down on those keys, we embark on a journey through the vast landscape of cyberspace, weaving thoughts and ideas into existence. The rhythmic click-clack, a testament to our communication prowess, echoes through the virtual corridors, transforming thoughts into tangible text.";
const shortText = "oeu nth oeu nth";

export default function PassageContainer() {
  const [passage, setPassage] = useState<Passage.Word[]>(
    setupPassage(shortText),
  );
  const [passageStats, setPassageStats] =
    useState<Passage.Stats>(setupPassageStats());

  const passageComplete = passage.every((word) => word.match);

  if (passageComplete) {
    console.log(passageStats);
  }

  return (
    <div className="flex grow flex-col justify-center">
      <PassageInput
        passage={passage}
        passageComplete={passageComplete}
        passageStats={passageStats}
        setPassage={setPassage}
        setPassageStats={setPassageStats}
      />
    </div>
  );
}

function setupPassage(inputText: string): Passage.Word[] {
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

function setupPassageStats() {
  return { startTime: 0, endTime: 0, accuracy: { hit: 0, miss: 0, extras: 0 } };
}
