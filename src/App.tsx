import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard.tsx';
import {fetchQuestions, QuestionState, AnswersObj} from './API.ts'
import { Diffculty } from './API.ts';
const TOTAL_QUESTIONS = 10

const App = () => {
  // States
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState>([])
  const [userAns, setUserAns] = useState<AnswersObj>([])
  const [number, setNumber] = useState(0)
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);



  // console.log(fetchQuestions(TOTAL_QUESTIONS, Diffculty.EASY));
  // Start Quiz Method
  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false)
    const allQuestions = await fetchQuestions( // FEtch All The Questions
      TOTAL_QUESTIONS,
      Diffculty.HARD
    );
    setQuestions(allQuestions);
    setScore(0);
    setUserAns([]);
    setNumber(0)
    setLoading(false);
  }
  console.log(questions)

  // Check The Answer 
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) =>  {
    // Check Game Is Over Or Not
    if(!gameOver) {
      // get The Answer
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer
      // if The Answer Correct
      if(correct) {
        setScore(prev => prev + 1);
      }
      // Set The Answer Of The User
      const answerObj = {
        question: questions[number].question,
        answer: answer,
        correct: correct,
        correct_answer: questions[number].correct_answer
      }

      setUserAns((prev: any) => [...prev, answerObj]);

    }
  }

  // get The Next Question
  const nextQuestion = () => {
    // if(!gameOver || number !== TOTAL_QUESTIONS -1) {
    //   setNumber(prev => prev +1);
    // } else {
    //   setGameOver(true)
    // }
    const next = number + 1;
    if(next === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(next);
    }
  }

  return (
    <div className="App">
        <h1>Quiz App</h1>
        {/* Show Start Quiz When gameover=true & loading=false  */}
        {
          (gameOver && !loading) || userAns.length === TOTAL_QUESTIONS ? (
            <button className="start" onClick={startQuiz}>
              Start Quiz
            </button>
          ) : null
        }
        {/* Loading Till Get The Data */}
        {
          loading && (<p>Loading Quesions...</p>)
        }

        Score : {`${score} / ${TOTAL_QUESTIONS} `}

        {/* Question  */}
        {
          !gameOver && !loading  ? (
            <QuestionCard 
              quesNO={number + 1}       
              question={questions[number]?.question}
              totalQues= {TOTAL_QUESTIONS}
              quesAnswers = {questions[number]?.answers}
              userAnswer = {userAns ? userAns[number] : undefined}
              callBack={checkAnswer}
            />
          ) : null
        }
        {/* Get Next Question */}
        {
          !gameOver && !loading && userAns.length === number+1 && number + 1 !== TOTAL_QUESTIONS && (

          <button className="next" onClick={nextQuestion}>
            Next Quesion
          </button>
          ) 
        }
    </div>
  );
}

export default App;
