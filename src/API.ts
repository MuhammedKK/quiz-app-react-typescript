import { randomAns } from "./Utils.ts";
// Import Randomize The Array

// Type Questions
export type Questions = {
  cayrgory: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = Questions & {
  answers: string[];
};


  // Answers Object Type

  export type AnswersObj = {
    question : string;
    answer: string;
    correct: boolean;
    correct_answer: string 

  }
// Diffculty ENUM

export const enum Diffculty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

// fetch API Method

export const fetchQuestions = async (amout: number, diffculty: Diffculty) => {
  const endPoint = `https://opentdb.com/api.php?amount=${amout}&difficulty=${diffculty}&type=multiple`;
  const data = await (await fetch(endPoint)).json();
//   console.log(data.results);
  return data.results.map((question: Questions) => ({
    ...question,
    answers: randomAns([...question.incorrect_answers, question.correct_answer]),
  }));
};
