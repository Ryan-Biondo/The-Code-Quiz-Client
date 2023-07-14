interface AnswerListProps {
  answers: string[]; // Array of possible answers
  onAnswerSelect: (selected: string) => void; // Function to handle when an answer is selected
  selectedAnswer: string | null; // The currently selected answer or null if no answer is selected
  isCorrect: boolean | null; // Flag if the selected answer is correct or not, or null if no answer yet
}

const AnswerList: React.FC<AnswerListProps> = ({
  answers,
  onAnswerSelect,
  selectedAnswer,
  isCorrect,
}) => {
  // Returns a div containing a list of buttons
  // Each button represents a possible answer
  return (
    <div>
      {answers.map(
        (
          answer,
          index // Iterate through the answers array
        ) => (
          <button
            className="choice"
            key={index} // Set a unique key for each answer (in this case the index of the answer)
            onClick={() => {
              // When the button is clicked, execute the onAnswerSelect function passing the answer as argument
              onAnswerSelect(answer);
            }}
            disabled={!!selectedAnswer} // Disable the button if an answer has already been selected (if selectedAnswer is not null)
            style={
              selectedAnswer === answer // If this answer is the selected one
                ? { backgroundColor: isCorrect ? 'green' : 'darkred' } // Change the background color to green if it's correct, otherwise to dark red
                : {} // If the answer is not the selected one, don't apply any additional styles
            }>
            {answer}
          </button>
        )
      )}
    </div>
  );
};

export default AnswerList;
