import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import Container from "../Container";
import Center from "../Center";
import Card from "../Card";
import { ErrorMessage } from "../ErrorMessage";
import Input from "../Input";
import SubmitInput from "../SubmitInput";

import { Dto } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { submitNewPassage } from "../../features/newPassage/newPassageActions";

export default function PassageCreate() {
  const dispatch = useDispatch<AppDispatch>();
  const newPassage = useSelector((state: RootState) => state.newPassage);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Dto.NewPassage>();

  const onSubmit: SubmitHandler<Dto.NewPassage> = async (data) => {
    dispatch(submitNewPassage(data));
  };

  return (
    <Container>
      <Center>
        <h2 className="mb-10 text-center text-2xl font-semibold text-typey-primary">
          Create a new passage
        </h2>
        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {newPassage.error && (
              <ErrorMessage message={newPassage.error.message} />
            )}
            <Input
              inputType="text"
              label="title"
              placeholder=""
              register={register}
              fieldError={errors.title}
              required
            />
            <Input
              inputType="text"
              label="text"
              placeholder=""
              register={register}
              minLength={8}
              fieldError={errors.text}
              required
            />
            <SubmitInput type={"secondaryFull"} text="Create passage" />
          </form>
          {newPassage.passage && (
            <div className="flex flex-col justify-between gap-4">
              <h2 className="text-3xl text-typey-primary underline hover:text-typey-default">
                <Link to={`/passage/${newPassage.passage.id}`}>
                  Passage{" "}
                  <span className=" text-typey-secondary">
                    #{newPassage.passage.id}:
                  </span>
                </Link>
              </h2>
              <p className="text-typey-primary">{newPassage.passage.title}</p>
              <p className="text-typey-primary">{newPassage.passage.text}</p>
            </div>
          )}
        </Card>
      </Center>
    </Container>
  );
}
