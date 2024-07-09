import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../Button";
import PassageInput from "../PassageInput";
import PassageStatDisplay from "../PassageStatDisplay";
import PassageControls from "../PassageControls";

import { passageApi } from "../../utils/api";
import { Passage } from "../../types/types";

export default function PassageContainer() {
  const { passageId } = useParams();

  const [passage, setPassage] = useState<Passage.Word[]>(
    setupPassage("Loading Data"),
  );
  const [passageStats, setPassageStats] =
    useState<Passage.Stats>(setupPassageStats());
  const [wordIndex, setWordIndex] = useState(0);
  const [passageFound, setPassageFound] = useState(true);

  const navigate = useNavigate();

  const passageComplete = passage?.every((word) => word.match);

  useEffect(() => {
    async function newPassageText() {
      const data = await passageApi.getById(Number(passageId));

      // data.statusText returns '' when using https so check on codes instead
      if (data && data.status >= 200 && data.status < 400) {
        const newPassage = setupPassage(data.data.text);
        setPassage(newPassage);
        setPassageStats(setupPassageStats);
        setWordIndex(0);
        setPassageFound(true);
        return;
      }

      setPassageFound(false);
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
      {!passageFound && <PassageNotFound />}
      {!passageComplete && passageFound && (
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
      {passageComplete && passageFound && (
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

function PassageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-24 items-center justify-center gap-8">
      <div>Passage Not Found!</div>
      <Button
        onClick={() => {
          navigate("/passage/new");
        }}
        text="Add a new passage?"
        type="primaryEmpty"
      />
    </div>
  );
}
