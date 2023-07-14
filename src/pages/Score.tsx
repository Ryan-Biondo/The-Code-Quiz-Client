import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../contexts/QuizContext';
import CircleProgressBar from '../components/CircleProgressBar';

const Score: React.FC = () => {
  // Extract the necessary state and actions from the Quiz context.
  const { score, category, difficulty, resetQuiz, setCategory, setDifficulty } =
    useQuiz();

  const navigate = useNavigate();

  // Changes based on the final score.
  const message =
    score === 10
      ? 'Perfect score!'
      : score >= 7
      ? 'Great job!'
      : score >= 5
      ? 'Not bad!'
      : 'Try again!';

  // Resets the quiz, sets the category and difficulty to the same values used in the last quiz, and navigates to the quiz page.
  const handleRestartQuiz = () => {
    resetQuiz();
    setCategory(category);
    setDifficulty(difficulty);
    navigate('/TechQuiz', {
      replace: true,
      state: { category, difficulty },
    });
  };

  // handleHome function resets the quiz and navigates to the home page.
  const handleHome = () => {
    resetQuiz();
    navigate('/');
  };

  return (
    <div className="scoreScreen">
      <div className="yourScore">
        <div>{message}</div>
        <div>Your score: {score}/10!</div>
      </div>
      <CircleProgressBar score={score || 0} />
      <div className="nextQuiz">
        <button onClick={handleRestartQuiz}>Restart Quiz</button>
        <button onClick={handleHome}>Home</button>
      </div>
    </div>
  );
};

export default Score;
