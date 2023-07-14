import React from 'react';

interface ControlButtonsProps {
  onNext: () => void; // A function will be executed when the Next button is clicked
  nextButtonEnabled: boolean; // A boolean value to determine if the Next button should be enabled
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  onNext,
  nextButtonEnabled,
}) => (
  <>
    <button
      className="nextButton"
      onClick={onNext}
      // Calls the onNext function when the button is clicked
      // Disables the button if nextButtonEnabled is false
      disabled={!nextButtonEnabled}>
      Next
    </button>
  </>
);

export default ControlButtons;
