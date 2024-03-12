import Button from "../Button";

export default function PassageStatDisplay({
  passageStats,
}: Passage.Prop.StatDisplay) {
  const { startTime, endTime, accuracy } = passageStats;

  const passageTime = ((endTime - startTime) / 1000).toFixed(2);
  const accuracyNum = (accuracy.hit / (accuracy.hit + accuracy.miss)) * 100;

  return (
    <div className="flex items-center justify-around">
      <div className="text-2xl text-typey-primary">Completed!</div>
      <div className="text-typey-primary">
        <div>
          Time: <span className="text-typey-secondary">{passageTime}s</span>
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
        <Button onClick={() => {}} text={"Retry"} type="primaryEmpty" />
        <Button onClick={() => {}} text={"Next Passage"} type="secondaryFull" />
      </div>
    </div>
  );
}
