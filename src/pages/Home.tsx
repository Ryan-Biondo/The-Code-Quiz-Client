import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  // Manage the category and difficulty state
  const [category, setCategory] = useState<string>('javascript');
  const [difficulty, setDifficulty] = useState<string>('easy');

  // useNavigate to navigate through the app.
  const navigate = useNavigate();

  // Navigates to the quiz with the selected category and difficulty
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/TechQuiz', { state: { category, difficulty } });
  };

  return (
    <div className="homeFlexWrap">
      <div>
        <div className="header">
          <h1 className="home">The Code Quiz</h1>
        </div>

        <form onSubmit={handleSubmit} name="chooseQuiz">
          <label>
            Category:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}>
              <option value="javascript">JavaScript</option>
              <option value="css">CSS</option>
            </select>
          </label>
          <label>
            Difficulty:
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}>
              <option value="easy">Easy</option>
              <option value="intermediate">Intermediate</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <button className="submitButton" type="submit">
            Start Quiz
          </button>
        </form>
        <p className="quizTip">
          Press <strong>Enter</strong> or <strong>Space</strong> to submit your
          answer if you don't want to use the mouse.
        </p>
      </div>
      <footer>
        Created by{' '}
        <a
          href="http://www.ryanbiondo.com"
          target="_blank"
          rel="noopener noreferrer">
          Ryan Biondo
        </a>
      </footer>
    </div>
  );
};

export default Home;
