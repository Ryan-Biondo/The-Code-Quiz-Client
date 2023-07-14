import React from 'react';

interface QuestionProps {
  question: string; // The text of the question
}

const Question: React.FC<QuestionProps> = ({ question }) => (
  <div className="question">{question}</div>
);

export default Question;
