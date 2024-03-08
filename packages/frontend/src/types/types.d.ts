declare namespace Passage {
  type Word = {
    expect: string;
    userInput: string;
    index: number;
    match: boolean;
  };

  declare namespace Prop {
    type Display = {
      wordIndex: number;
      passageText: Passage.Word[];
    };
    
    type ExtraLetters = {
      word: Passage.Word;
    };

    type Word = {
      word: Passage.Word;
      wordIndex: number;
    };
  }
}
