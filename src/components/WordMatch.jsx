import React, { useState, useEffect } from 'react';

const WordMatch = ({ data, onComplete }) => {
    const [selectedWord, setSelectedWord] = useState(null);
    const [selectedMeaning, setSelectedMeaning] = useState(null);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [shuffledMeanings, setShuffledMeanings] = useState([]);

    useEffect(() => {
        // Shuffle meanings only on mount
        const meanings = data.pairs.map(p => p.meaning);
        setShuffledMeanings([...meanings].sort(() => Math.random() - 0.5));
    }, [data]);

    const handleWordClick = (word) => {
        if (matchedPairs.includes(word)) return;
        setSelectedWord(word);
        checkMatch(word, selectedMeaning);
    };

    const handleMeaningClick = (meaning) => {
        const word = data.pairs.find(p => p.meaning === meaning).word;
        if (matchedPairs.includes(word)) return;
        setSelectedMeaning(meaning);
        checkMatch(selectedWord, meaning);
    };

    const checkMatch = (word, meaning) => {
        if (word && meaning) {
            const correctMeaning = data.pairs.find(p => p.word === word).meaning;
            if (meaning === correctMeaning) {
                setMatchedPairs([...matchedPairs, word]);
                setSelectedWord(null);
                setSelectedMeaning(null);

                if (matchedPairs.length + 1 === data.pairs.length) {
                    setTimeout(onComplete, 1000);
                }
            } else {
                // Reset selections if wrong
                setTimeout(() => {
                    setSelectedWord(null);
                    setSelectedMeaning(null);
                }, 500);
            }
        }
    };

    return (
        <div className="match-stage">
            <p>{data.instruction}</p>
            <div className="match-grid">
                <div className="column">
                    {data.pairs.map(pair => (
                        <div
                            key={pair.word}
                            className={`match-item ${selectedWord === pair.word ? 'selected' : ''} ${matchedPairs.includes(pair.word) ? 'matched' : ''}`}
                            onClick={() => handleWordClick(pair.word)}
                        >
                            {pair.word}
                        </div>
                    ))}
                </div>
                <div className="column">
                    {shuffledMeanings.map(meaning => {
                        const word = data.pairs.find(p => p.meaning === meaning).word;
                        return (
                            <div
                                key={meaning}
                                className={`match-item ${selectedMeaning === meaning ? 'selected' : ''} ${matchedPairs.includes(word) ? 'matched' : ''}`}
                                onClick={() => handleMeaningClick(meaning)}
                            >
                                {meaning}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default WordMatch;
