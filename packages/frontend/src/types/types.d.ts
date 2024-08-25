import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";

declare namespace Passage {
  type AccuracyStats = {
    hit: number;
    miss: number;
    extras: number;
  };

  type ElementLoc = {
    x: number;
    y: number;
  };

  type Letter = { char: string; index: number; perfect: boolean };

  type NewPassageFormData = {
    input: string;
  };

  type WordRects = {
    x: number;
    y: number;
    width: number;
  };

  type Word = {
    expect: {
      word: string;
      letters: Passage.Letter[];
    };
    userInput: string;
    index: number;
    match: boolean;
    extraCount: number;
  };

  type Stats = {
    startTime: number;
    endTime: number;
    accuracy: Passage.AccuracyStats;
  };

  declare namespace Prop {
    type Caret = {
      loc: Passage.ElementLoc;
    };

    type Controls = {
      prevPassage: () => void;
      nextPassage: () => void;
      replayPassage: () => void;
    };

    type ControlIcon = {
      iconName: string;
      onClick: () => unknown;
    };

    type Display = {
      wordIndex: number;
      passage: Passage.Word[];
      hasFocus: boolean;
    };

    type ExpectedLetters = {
      setLetterClass: (letter: string, letterIndex: number) => string;
      word: Passage.Word;
    };

    type ExtraLetters = {
      word: Passage.Word;
    };

    type Input = {
      passage: Passage.Word[];
      passageComplete: boolean;
      passageStats: Passage.Stats;
      setPassage: React.Dispatch<React.SetStateAction<Passage.Word[]>>;
      setPassageStats: React.Dispatch<React.SetStateAction<Passage.Stats>>;
      setWordIndex: React.Dispatch<React.SetStateAction<number>>;
      wordIndex: number;
    };

    type Letter = {
      className: string;
      letter: Passage.Letter;
      word: Passage.Word;
    };

    type StatDisplay = {
      nextPassage: () => void;
      passage: Passage.Word[];
      passageStats: Passage.Stats;
      replayPassage: () => void;
    };

    type Word = {
      positionCaret: (wordRef: HTMLDivElement, userInput: string) => void;
      word: Passage.Word;
      wordIndex: number;
    };
  }
}

declare namespace User {
  type CurrentUser = {
    userId: number;
    username: string;
  };

  type LoginFormData = {
    username: string;
    password: string;
  };

  type RegistrationErrorResponse = {
    message: string;
    error: string;
    statusCode: number;
  };

  type RegistrationFormData = {
    username: string;
    password: string;
  };
}

declare namespace Common {
  namespace Prop {
    type Button = {
      onClick: () => unknown;
      text: string;
      type: "primaryEmpty" | "secondaryFull";
    };

    type InputField<T extends FieldValues = FieldValues> = {
      inputType: "text" | "password";
      label: Extract<keyof T>;
      placeholder: string;
      register: UseFormRegister<T>;
      required?: boolean;
      minLength?: number;
      maxLength?: number;
      fieldError?: FieldError;
    };

    type SubmitInput = {
      type: "primaryEmpty" | "secondaryFull";
      text: string;
    };
  }
}

declare namespace Navigation {
  namespace Prop {
    type NavBar = { navigationLinks: NavigationLink[] };
    type Profile = {
      navigationLinks: NavigationLink[];
      user: User.CurrentUser;
    };
  }

  type NavigationLink = {
    name: string;
    href: string;
    current: boolean;
  };
}
