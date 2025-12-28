import React from 'react';

const QuizStage = ({ data, onAnswer }) => {
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
                {data.options.map((option, index) => (
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
