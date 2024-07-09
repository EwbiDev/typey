import { useState } from "react";

import Button from "../Button";

import { passageApi } from "../../utils/api";
import { Link } from "react-router-dom";

export default function PassageCreate() {
  const [userInput, setUserInput] = useState("");
  const [buttonText, setButtonText] = useState("Submit");
  const [submitted, setSubmitted] = useState(false);
  const [newPassageId, setNewPassageId] = useState<number>();
  const [createdPassageText, setCreatedPassageText] = useState<string>();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUserInput(event.target.value);
  }

  async function handleButton() {
    if (submitted) {
      return;
    }

    if (userInput.length < 6) {
      setButtonText("Error!");
      return;
    }

    const newPassage = await passageApi.post(userInput);

    // newPassage.statusText returns '' when using https so check on codes instead
    if (newPassage.status >= 201 && newPassage.status < 400) {
      setButtonText("Created!");
      setSubmitted(true);
      console.log(newPassage.data);
      setCreatedPassageText(newPassage.data.text);
      setNewPassageId(newPassage.data.id);
    }
  }

  return (
    <div className="container flex grow items-center justify-center">
      <div className="flex min-h-40 flex-col gap-8">
        <div className="flex justify-center gap-8">
          <input
            name="passage-input"
            id="passage-input"
            value={userInput}
            onChange={handleInputChange}
            className="rounded-sm bg-typey-background p-4 outline outline-typey-secondary"
          />
          <Button
            onClick={handleButton}
            text={buttonText}
            type="secondaryFull"
          />
        </div>
        {newPassageId && (
          <div className="flex flex-col justify-between gap-4">
            <h2 className="text-3xl text-typey-primary underline hover:text-typey-default">
              <Link to={`/passage/${newPassageId}`}>
                Passage{" "}
                <span className=" text-typey-secondary">#{newPassageId}:</span>
              </Link>
            </h2>
            <p>{createdPassageText}</p>
          </div>
        )}
      </div>
    </div>
  );
}
