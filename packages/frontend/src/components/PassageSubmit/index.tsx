import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { passageApi } from "../../utils/api";
import { Passage } from "../../types/types";
import Input from "../Input";
import SubmitInput from "../SubmitInput";
import { FailureMessage } from "../FailureMessage";

interface ErrorDetails {
  message: string;
  error: string;
  statusCode?: number;
}

export default function PassageCreate() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Passage.NewPassageFormData>();
  const [submitSuccess, setSubmitSuccess] = useState<boolean>();
  const [errorDetails, setErrorDetails] = useState<ErrorDetails>();

  const [newPassageId, setNewPassageId] = useState<number>();
  const [createdPassageText, setCreatedPassageText] = useState<string>();

  const onSubmit: SubmitHandler<Passage.NewPassageFormData> = async (data) => {
    const response = await passageApi.post(data.input);

    if (response && response?.status >= 201 && response?.status < 400) {
      setSubmitSuccess(true);
      setCreatedPassageText(response.data.text);
      setNewPassageId(response.data.id);
      reset();
      return;
    }

    if (response?.data?.error) {
      setErrorDetails(response.data);
      setSubmitSuccess(false);
      return;
    }

    setErrorDetails({
      message: "Unable to connect to server, please try again later",
      error: "No connection",
    });
    setSubmitSuccess(false);
  };

  return (
    <div className="container flex grow items-center justify-center">
      <div className="flex min-h-40 flex-col gap-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center gap-8"
        >
          <h2 className=" text-2xl">Create a new passage</h2>
          <Input
            inputType="text"
            label="input"
            placeholder=""
            register={register}
            minLength={8}
            fieldError={errors.input}
            required
          />
          <SubmitInput type={"secondaryFull"} errors={errors} />
        </form>
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
        {!submitSuccess && errorDetails && (
          <FailureMessage message={errorDetails.message} />
        )}
      </div>
    </div>
  );
}
