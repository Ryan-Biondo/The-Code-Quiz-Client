import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // A hook provided by react-router for navigation
import { useQuiz } from '../contexts/QuizContext'; // Custom context hook for the quiz
import './MainMenu.css';

interface Props {
  category: string; // The category of the quiz
  difficulty: string; // The difficulty level of the quiz
}

const MainMenu: React.FC<Props> = ({ category, difficulty }) => {
  // Use the useNavigate hook from react-router-dom for navigation
  const navigate = useNavigate();
  // Use the useQuiz hook from our context to get the 'resetQuiz' function
  const { resetQuiz } = useQuiz();

  const [showModal, setShowModal] = useState(false);
  const handleHome = () => {
    resetQuiz();
    navigate('/');
    setShowModal(false);
  };

  const handleRestartQuiz = () => {
    resetQuiz();
    navigate('/TechQuiz', {
      replace: true, // Replace the current entry in the history stack
      state: { category, difficulty }, // Pass along the category and difficulty as state
    });
    setShowModal(false);
  };

  return (
    <>
      <button className="mainMenu" onClick={() => setShowModal(true)}>
        Menu
      </button>
      {showModal && ( // When showModal is true, show the following buttons
        <div className="menuButton">
          <button onClick={handleHome}>Home</button>
          <button onClick={handleRestartQuiz}>Restart Quiz</button>
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      )}
      {showModal && <div className="menuBackground" />}
    </>
  );
};

export default MainMenu;
