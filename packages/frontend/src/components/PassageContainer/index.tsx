import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PassageInput from "../PassageInput";
import PassageStatDisplay from "../PassageStatDisplay";
import PassageControls from "../PassageControls";

import { passageApi } from "../../utils/api";

export default function PassageContainer() {
  const { passageId } = useParams();

  const [passage, setPassage] = useState<Passage.Word[]>(
    setupPassage("Loading Data"),
  );
  const [passageStats, setPassageStats] =
    useState<Passage.Stats>(setupPassageStats());
  const [wordIndex, setWordIndex] = useState(0);

  const navigate = useNavigate();

  const passageComplete = passage?.every((word) => word.match);

  useEffect(() => {
    async function newPassageText() {
      const data = await passageApi.getById(Number(passageId));
      if (data.statusText === "OK") {
        const newPassage = setupPassage(data.data.text);
        setPassage(newPassage);
        setPassageStats(setupPassageStats);
        setWordIndex(0);
      }
    }
    newPassageText();
  }, [passageId]);

  function nextPassage() {
    if (passageId) {
      navigate(`/passage/${Number(passageId) + 1}`);
    }
  }

  function prevPassage() {
    if (passageId && Number(passageId) > 1) {
      navigate(`/passage/${Number(passageId) - 1}`);
    }
  }

  function replayPassage() {
    if (passage) {
      setPassage(clearPassageAttempt(passage));
    }
    setPassageStats(setupPassageStats);
    setWordIndex(0);
  }

  return (
    <div className="flex grow flex-col justify-center gap-8">
      {!passageComplete && (
        <PassageInput
          passage={passage}
          passageComplete={passageComplete}
          passageStats={passageStats}
          setPassage={setPassage}
          setPassageStats={setPassageStats}
          wordIndex={wordIndex}
          setWordIndex={setWordIndex}
        />
      )}
      {passageComplete && (
        <PassageStatDisplay
          nextPassage={nextPassage}
          passage={passage}
          passageStats={passageStats}
          replayPassage={replayPassage}
        />
      )}
      <PassageControls
        prevPassage={prevPassage}
        nextPassage={nextPassage}
        replayPassage={replayPassage}
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

function clearPassageAttempt(passage: Passage.Word[]): Passage.Word[] {
  return passage.map((word) => {
    word.userInput = "";
    word.match = false;
    word.extraCount = 0;
    word.expect.letters.map((letter) => {
      letter.perfect = true;
      return letter;
    });

    return word;
  });
}

function setupPassageStats() {
  return { startTime: 0, endTime: 0, accuracy: { hit: 0, miss: 0, extras: 0 } };
}
