import React, { FC } from 'react'
import { AnswersObj } from '../API';

// Props Type
type Props = {
    question: string;
    quesAnswers : string[];
    callBack: (e: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswersObj;
    quesNO: number;
    totalQues: number
}


const QuestionCard:FC<Props> = ({
    quesNO,
    question,
    totalQues,
    quesAnswers,
    callBack,
    userAnswer,
}) =>
    (
        <div>
            <p className="number">
                Question : {`${quesNO} / ${totalQues}`}
            </p>
            <p dangerouslySetInnerHTML={{__html:question}}/>
            <div>
                {quesAnswers?.map(answer => (
                    <div key={answer}>
                        <button disabled={!!userAnswer} value={answer} onClick={callBack}>
                            <span dangerouslySetInnerHTML={{__html: answer}}/>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

export default QuestionCard;