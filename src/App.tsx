import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard.tsx';
import {fetchQuestions, QuestionState, AnswersObj} from './API.ts'
import {Diffculty} from './API.ts'
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
      Diffculty.EASY
    );
    setQuestions(allQuestions);
    setScore(0);
    setUserAns([]);
    setNumber(0)
    setLoading(false);
  }
  console.log(questions)

  // Check The Answer 
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

  }

  // get The Next Question
  const nextQuestion = () => {

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
        {/* Question  */}
        {
          !gameOver && !loading && questions && (
            <QuestionCard 
              quesNO={number + 1}
              question={questions[number]}
              totalQues= {TOTAL_QUESTIONS}
              quesAnswers = {questions[number]?.answers}
              userAnswer = {userAns ? userAns[number] : undefined}
              callback={checkAnswer}
            />
          )
        }
        {/* Get Next Question */}
        {
          !gameOver && !loading && number + 1 !== TOTAL_QUESTIONS && (

          <button className="next" onClick={nextQuestion}>
            Next Quesion
          </button>
          ) 
        }
    </div>
  );
}

export default App;
