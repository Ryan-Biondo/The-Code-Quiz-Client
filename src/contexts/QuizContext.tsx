import React, { createContext, useState, useContext } from 'react';
// React.SetStateAction is a type definition used with the setState function from the useState hook
// Ensures that we are correctly updating the state, whether we are using a direct value or a function
// Responsible for providing typings to the various states and functions that are shared
interface QuizContextProps {
  quizData: QuizQuestion[];
  setQuizData: React.Dispatch<React.SetStateAction<QuizQuestion[]>>;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  resetQuiz: () => void;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  difficulty: string;
  setDifficulty: React.Dispatch<React.SetStateAction<string>>;
  selectedAnswer: string;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<string>>;
  isCorrect: boolean;
  setIsCorrect: React.Dispatch<React.SetStateAction<boolean>>;
  nextButtonEnabled: boolean;
  setNextButtonEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
// Responsible for typing the props for the QuizProvider component
interface QuizProviderProps {
  children: React.ReactNode;
}
// Type definition, every quiz must have:
type QuizQuestion = {
  id: number;
  category: string;
  difficulty: string;
  question: string;
  choices: string[];
  correctAnswer: string;
  explanation: string;
};

// Empty Quiz Context with initial value as undefined
const QuizContext = createContext<QuizContextProps | undefined>(undefined);

// Quiz Provider which is a functional component
export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [nextButtonEnabled, setNextButtonEnabled] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // ResetQuiz function to reset all states to their initial values
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setIsCorrect(false);
    setNextButtonEnabled(false);
    setScore(0);
  };

  // Context API is a way to share values between different components without having to explicitly pass a prop through every level of the tree.
  // Provider is a special type of React component that allows the child components in its tree to access the context's value
  // without passing props down manually at every level.
  // QuizContext.Provider is used to "provide" the context value to all child components.
  // Any child component within the QuizContext.Provider can access the value provided.
  return (
    <QuizContext.Provider
      value={{
        currentQuestionIndex,
        setCurrentQuestionIndex,
        resetQuiz,
        category,
        setCategory,
        difficulty,
        setDifficulty,
        quizData,
        setQuizData,
        selectedAnswer,
        setSelectedAnswer,
        isCorrect,
        setIsCorrect,
        nextButtonEnabled,
        setNextButtonEnabled,
        score,
        setScore,
        isLoading,
        setIsLoading,
      }}>
      {children}
    </QuizContext.Provider>
  );
};

// Custom hook to use the Quiz context
export const useQuiz = () => {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error('useQuiz must be used within the Quiz Provider');
  }
  return context;
};
