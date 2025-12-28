import React, { useState, useEffect } from 'react';
import { gameData } from './data/gameData';
import WordMatch from './components/WordMatch';
import SentenceStage from './components/SentenceStage';
import QuizStage from './components/QuizStage';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(null); // 'A2' or 'B1'
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [stageIndex, setStageIndex] = useState(0);
  const [feedback, setFeedback] = useState(null); // { isCorrect: bool, explanation: string }
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const startLevel = (level) => {
    // Shuffle all questions for this level and pick 20
    const shuffled = [...gameData[level]].sort(() => Math.random() - 0.5);
    const sessionSet = shuffled.slice(0, 20);

    setSessionQuestions(sessionSet);
    setCurrentLevel(level);
    setStageIndex(0);
    setScore(0);
    setGameStarted(true);
    setGameOver(false);
    setFeedback(null);
  };

  const handleAnswer = (answer) => {
    const currentData = sessionQuestions[stageIndex];
    const isCorrect = answer === currentData.correct;

    if (isCorrect) {
      setScore(s => s + 10);
    }

    setFeedback({
      isCorrect,
      explanation: currentData.explanation,
      correctAnswer: currentData.correct
    });
  };

  const nextStage = () => {
    setFeedback(null);
    if (stageIndex + 1 < sessionQuestions.length) {
      setStageIndex(s => s + 1);
    } else {
      setGameOver(true);
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentLevel(null);
    setSessionQuestions([]);
    setGameOver(false);
  };

  const renderStage = () => {
    const data = sessionQuestions[stageIndex];
    if (!data) return null;

    switch (data.type) {
      case 'match':
        return <WordMatch data={data} onComplete={() => setFeedback({ isCorrect: true, explanation: "Well done! You matched everything correctly." })} />;
      case 'sentence':
        return <SentenceStage data={data} onAnswer={handleAnswer} />;
      case 'quiz':
        return <QuizStage data={data} onAnswer={handleAnswer} />;
      default:
        return null;
    }
  };

  if (!gameStarted) {
    return (
      <div className="game-container">
        <h1>Welcome to English Master! 🇬🇧</h1>
        <p>Choose your level to start the adventure. Each session has 20 random questions!</p>
        <div className="level-select">
          <button className="btn btn-primary" onClick={() => startLevel('A2')}>A2 - Elementary</button>
          <button className="btn btn-secondary" onClick={() => startLevel('B1')}>B1 - Intermediate</button>
        </div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="game-container">
        <h1>Level Completed! 🎉</h1>
        <h2>Well done, you've finished the {currentLevel} path!</h2>
        <div className="explanation">
          Your final score: {score} points
        </div>
        <button className="btn btn-primary" onClick={resetGame}>Back to Menu</button>
      </div>
    );
  }

  const progress = sessionQuestions.length > 0 ? (stageIndex / sessionQuestions.length) * 100 : 0;

  return (
    <div className="game-container">
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="header">
        <span className="badge">Level: {currentLevel}</span>
        <span className="badge">Stage: {stageIndex + 1}/{sessionQuestions.length}</span>
        <span className="badge">Score: {score}</span>
      </div>

      <div className="stage-content">
        <h2>{sessionQuestions[stageIndex]?.title}</h2>
        {renderStage()}
      </div>

      {feedback && (
        <div className="feedback-overlay">
          <div className="feedback-content">
            <h2 style={{ color: feedback.isCorrect ? 'var(--success)' : 'var(--error)' }}>
              {feedback.isCorrect ? 'Excellent! 🎉' : 'Keep Trying! 💪'}
            </h2>
            {!feedback.isCorrect && (
              <p>The correct answer was: <strong>{feedback.correctAnswer}</strong></p>
            )}
            <div className="explanation">
              {feedback.explanation}
            </div>
            <button className="btn btn-primary" onClick={nextStage}>Continue</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
