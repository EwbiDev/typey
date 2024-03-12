declare namespace Passage {
  type AccuracyStats = {
    hit: number;
    miss: number;
    extras: number;
  }

  type ElementLoc = {
    x: number;
    y: number;
  };

  type Letter = { char: string; index: number; perfect: boolean };

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
    };

    type Letter = {
      className: string;
      letter: Passage.Letter;
      word: Passage.Word;
    };

    type Word = {
      positionCaret: (wordRef: HTMLDivElement, userInput: string) => void;
      word: Passage.Word;
      wordIndex: number;
    };
  }
}
