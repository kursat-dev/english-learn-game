import React, { useState, useEffect } from 'react';

const QuizStage = ({ data, onAnswer }) => {
    const [shuffledOptions, setShuffledOptions] = useState([]);

    useEffect(() => {
        if (data && data.options) {
            setShuffledOptions([...data.options].sort(() => Math.random() - 0.5));
        }
    }, [data]);

    return (
        <div className="quiz-stage">
            <p>{data.instruction}</p>
            <div className="content-box">
                {data.content}
            </div>
            <div className="question-box">
                <h3>{data.question}</h3>
            </div>
            <div className="options-list">
                {shuffledOptions.map((option, index) => (
                    <button
                        key={index}
                        className="option-btn"
                        onClick={() => onAnswer(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuizStage;
