import { Passage } from "../../types/types";
import Button from "../Button";

export default function PassageStatDisplay({
  nextPassage,
  passage,
  passageStats,
  replayPassage,
}: Passage.Prop.StatDisplay) {
  const { startTime, endTime, accuracy } = passageStats;

  const passageTime = (endTime - startTime) / 1000;
  const accuracyNum = (accuracy.hit / (accuracy.hit + accuracy.miss)) * 100;

  // assume 5 chars per word, including spaces
  const wordCount = passage.reduce((totalChars, word) => totalChars + word.userInput.length + 1, -1) / 5;

  const wpm = wordCount * (60 / passageTime);

  return (
    <div className="flex items-center justify-around">
      <div className="text-2xl text-typey-primary">Completed!</div>
      <div className="text-typey-primary">
        <div>
          WPM: <span className="text-typey-secondary">{wpm.toFixed(2)}</span>
        </div>
        <div>
          Time:{" "}
          <span className="text-typey-secondary">
            {passageTime.toFixed(2)}s
          </span>
        </div>
        <div>
          Accuracy:{" "}
          <span className="text-typey-secondary">
            {accuracyNum === 100 ? accuracyNum : accuracyNum.toFixed(2)}%
          </span>
        </div>
        <div>
          Over hits:{" "}
          <span className="text-typey-secondary">{accuracy.extras}</span>
        </div>
      </div>
      <div className="flex h-full justify-around gap-4 text-center">
        <Button onClick={replayPassage} text={"Retry"} type="primaryEmpty" />
        <Button
          onClick={nextPassage}
          text={"Next Passage"}
          type="secondaryFull"
        />
      </div>
    </div>
  );
}
