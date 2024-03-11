declare namespace Passage {
  type ElementLoc = {
    x: number;
    y: number;
  };

  type WordRects = {
    x: number;
    y: number;
    width: number;
  }

  type Word = {
    expect: {
      word: string;
      letters: {char: string, perfect: boolean}[]
    };
    userInput: string;
    index: number;
    match: boolean;
  };

  declare namespace Prop {
    type Caret = {
      loc: Passage.ElementLoc;
    };

    type Display = {
      wordIndex: number;
      passageText: Passage.Word[];
      hasFocus: boolean;
    };

    type ExpectedLetters = {
      setLetterClass: (letter: string, letterIndex: number) => string;
      word: Passage.Word;
    }

    type ExtraLetters = {
      word: Passage.Word;
    };

    type Word = {
      positionCaret: (wordRef: HTMLDivElement, userInput: string) => void;
      word: Passage.Word;
      wordIndex: number;
    };
  }
}
