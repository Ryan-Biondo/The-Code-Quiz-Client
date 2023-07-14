// Importing React and necessary hooks
import React, { useEffect, useState } from 'react';

// Defining TypeScript interfaces to define the props type for Timer component
interface TimerProps {
  initialTime: number; // Represents the initial time when the timer starts
  onTimeUp: () => void; // Function that will be called when time is up
}

// Timer is a functional component which takes initialTime and onTimeUp as props
const Timer: React.FC<TimerProps> = ({ initialTime, onTimeUp }) => {
  // Defining a state variable 'timeLeft' initialized with 'initialTime' prop
  const [timeLeft, setTimeLeft] = useState(initialTime);

  // useEffect hook which will run every time 'timeLeft' or 'onTimeUp' changes
  useEffect(() => {
    // Check if 'timeLeft' is more than 0
    if (timeLeft > 0) {
      // If true, setting a timeout to decrease 'timeLeft' by 1 every 1000 ms (1 second)
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      // The function returned from useEffect will run when the component unmounts
      // or before the next time the effect runs. It's used here to clear the timeout
      return () => clearTimeout(timerId);
    } else {
      // If 'timeLeft' is not more than 0, calling the 'onTimeUp' function prop
      onTimeUp();
    }
    // The dependencies array. The effect will re-run if these values change.
  }, [timeLeft, onTimeUp]);

  // Rendering the time left
  return (
    <div className="timer">
      <h3>Time Left: {timeLeft}</h3>
    </div>
  );
};

export default Timer;
