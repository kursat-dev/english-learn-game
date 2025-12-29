import React, { useState, useEffect } from 'react';

const SentenceStage = ({ data, onAnswer }) => {
    const [shuffledOptions, setShuffledOptions] = useState([]);

    useEffect(() => {
        if (data && data.options) {
            setShuffledOptions([...data.options].sort(() => Math.random() - 0.5));
        }
    }, [data]);

    return (
        <div className="sentence-stage">
            <p>{data.instruction}</p>
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

export default SentenceStage;
