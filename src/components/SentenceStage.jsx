import React from 'react';

const SentenceStage = ({ data, onAnswer }) => {
    return (
        <div className="sentence-stage">
            <p>{data.instruction}</p>
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

export default SentenceStage;
