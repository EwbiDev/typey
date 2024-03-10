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
    expect: string;
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

    type ExtraLetters = {
      word: Passage.Word;
    };

    type Word = {
      positionCaret: (wordRects: WordRects, expectedInput: string, userInput: string) => void;
      word: Passage.Word;
      wordIndex: number;
    };
  }
}
