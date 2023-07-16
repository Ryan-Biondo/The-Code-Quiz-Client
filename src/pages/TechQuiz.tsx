import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuiz } from '../contexts/QuizContext';
import Header from '../components/Header';
import Question from '../components/Question';
import AnswerList from '../components/AnswerList';
import ControlButtons from '../components/ControlButtons';
import MainMenu from '../components/MainMenu';

const TechQuiz: React.FC = () => {
  // useLocation hook to access the state passed from the navigation.
  const location = useLocation();
  // Retrieve the category and difficulty from the location's state.
  const { category, difficulty } = location.state as {
    category: string;
    difficulty: string;
  };

  // Use the Quiz context to retrieve the current state and actions.
  const {
    quizData,
    setQuizData,
    currentQuestionIndex,
    setCurrentQuestionIndex,
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
  } = useQuiz();

  // Get the current question data from the quizData array using the currentQuestionIndex.
  const questionData = quizData[currentQuestionIndex];

  const navigate = useNavigate();

  // If there's no state in the location, we redirect to the home page.
  if (!location.state) {
    navigate('/');
    return null;
  }

  // We declare a helper function to shuffle an array. This is used to randomize the order of the answers.
  function shuffleAnswers(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // The onNext function is triggered when the user wants to proceed to the next question.
  // If there are more questions, it increments the currentQuestionIndex, clears the selectedAnswer and sets isCorrect and nextButtonEnabled to false.
  // If there are no more questions, it navigates to the Score page and passes the score, category, and difficulty as state.
  const onNext = () => {
    if (currentQuestionIndex + 1 < quizData.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setIsCorrect(false);
      setNextButtonEnabled(false);
    } else {
      navigate('/Score', { state: { score, category, difficulty } });
    }
  };

  // We use an effect hook to add an event listener for the Enter and Space keys. If either of these keys are pressed and the next button is enabled, the onNext function is called.
  // We also remove the event listener when the component unmounts.
  // This effect hook depends on nextButtonEnabled, currentQuestionIndex, and quizData.length. If any of these values change, the effect hook is run again.
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (
        (event.code === 'Enter' || event.code === 'Space') &&
        nextButtonEnabled
      ) {
        onNext();
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [nextButtonEnabled, currentQuestionIndex, quizData.length]); // Add any other dependencies here

  // We use another effect hook to increment the score if isCorrect is true. This effect hook depends on isCorrect, so it runs every time isCorrect changes.
  useEffect(() => {
    if (isCorrect) {
      setScore(score + 1);
    }
  }, [isCorrect]);

  // We use another effect hook to fetch the quiz data from our local server when the category or difficulty changes.
  // Once the data is received, it's shuffled, sliced to get only the first 10 questions, the answers for each question are shuffled, and the shuffled data is saved in the Quiz context.
  // We also catch any errors and log them to the console.
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://guarded-retreat-53579-e3fa6630b287.herokuapp.com/api/${category}/${difficulty}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const shuffledData = data.sort(() => 0.5 - Math.random());
        const selectedData = shuffledData.slice(0, 10);
        selectedData.forEach((question: any) => {
          shuffleAnswers(question.choices);
        });

        setQuizData(selectedData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  }, [category, difficulty]);

  // In another effect hook, we disable all the choice buttons once a choice button is clicked. This effect hook depends on currentQuestionIndex, so it runs every time currentQuestionIndex changes.
  useEffect(() => {
    let buttons: NodeListOf<HTMLButtonElement> =
      document.querySelectorAll('.choice');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        buttons.forEach((btn) => {
          btn.disabled = true;
        });
      });
    });
  }, [currentQuestionIndex]);

  // If we're currently loading data, or there's no questionData, we return a loading message.
  if (isLoading || !questionData) {
    return <div>Loading...</div>;
  }
  // Otherwise, we return our quiz interface.
  return (
    <div className="techQuizWrap">
      <div>
        <Header
          title={questionData.category}
          level={questionData.difficulty}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={quizData.length}
        />
        {/* <Timer
        initialTime={20}
        onTimeUp={() => {
          if (currentQuestionIndex + 1 < quizData.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer('');
            setIsCorrect(false);
            setNextButtonEnabled(false);
          } else {
            navigate('/Score', { state: { score } });
          }
        }}
      /> Will Implement in Future Version */}
        <Question question={questionData.question} />
        <AnswerList
          answers={questionData.choices}
          onAnswerSelect={(selected: string) => {
            setSelectedAnswer(selected);
            setIsCorrect(selected === questionData.correctAnswer);
            setNextButtonEnabled(true);
          }}
          selectedAnswer={selectedAnswer}
          isCorrect={isCorrect}
        />
        <div className="controlButtons">
          <MainMenu category={category} difficulty={difficulty} />
          <ControlButtons
            onNext={onNext}
            nextButtonEnabled={nextButtonEnabled}
          />
        </div>
      </div>
      <div>
        {selectedAnswer && (
          <div className="answerExplanation">
            {/* <div className="answerStatement">Your answer: {selectedAnswer}</div> */}
            <div className="answerCorrect">
              {isCorrect ? 'Correct!' : 'Wrong answer.'}
            </div>
            <div className="answerExplain">{questionData.explanation}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechQuiz;
