import React, { FC } from 'react'

// Props Type
type Props = {
    question: string;
    quesAnswers : string[];
    callBack: any;
    userAnswer: any;
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
                        <button disabled={userAnswer} value={answer} onClick={callBack}>
                            <span dangerouslySetInnerHTML={{__html: answer}}/>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

export default QuestionCard;