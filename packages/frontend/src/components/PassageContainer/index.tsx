import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../Button";
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
  const [passageFound, setPassageFound] = useState(true);

  const navigate = useNavigate();

  const passageComplete = passage?.every((word) => word.match);

  useEffect(() => {
    async function newPassageText() {
      const data = await passageApi.getById(Number(passageId));

      if (data && data.statusText === "OK") {
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
  const [showInput, setShowInput] = useState(false);
  const [passageInput, setPassageInput] = useState("");
  const [buttonText, setButtonText] = useState("Submit");
  const [submitted, setSubmitted] = useState(false);
  const [newPassageId, setNewPassageId] = useState<number>();

  const navigate = useNavigate();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassageInput(event.target.value);
  }

  async function handleButton() {
    if (submitted) {
      navigate(`/passage/${newPassageId}`);
    }

    if (passageInput.length < 6) {
      setButtonText("Error!");
      return;
    }

    const newPassage = await passageApi.post(passageInput);
    if (newPassage.statusText === "Created") {
      setButtonText("Created!");
      setSubmitted(true);
      setNewPassageId(newPassage.data.id);
    }
  }

  return (
    <div className="relative flex min-h-24 items-center justify-center gap-8">
      {!showInput && (
        <>
          <div>Passage Not Found!</div>
          <Button
            onClick={() => {
              setShowInput(true);
            }}
            text="Add a new passage?"
            type="primaryEmpty"
          />
        </>
      )}
      {showInput && (
        <div className="flex gap-8">
          <input
            name="passage-input"
            id="passage-input"
            value={passageInput}
            onChange={handleInputChange}
            className="rounded-sm bg-typey-background p-4 outline outline-typey-secondary"
          />
          <Button
            onClick={handleButton}
            text={buttonText}
            type="secondaryFull"
          />
        </div>
      )}
    </div>
  );
}
