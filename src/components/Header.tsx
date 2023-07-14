import React from 'react';

interface HeaderProps {
  title: string; // The title for the quiz
  level: string; // The difficulty level of the quiz
  questionNumber: number; // The current question number
  totalQuestions: number; // The total number of questions in the quiz
}

const Header: React.FC<HeaderProps> = ({
  title,
  level,
  questionNumber,
  totalQuestions,
}) => (
  <div className="header">
    <div className="quizTitle">
      <h1>{title}</h1>

      <h3>
        Question {questionNumber}/{totalQuestions}
      </h3>
    </div>
    <div className="currentQuestionIndex">
      <h2>{level}</h2>
    </div>
  </div>
);

export default Header;
