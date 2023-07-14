import React from 'react';
import './CircleProgressBar.css';

interface CircleProgressBarProps {
  score: number; // Score for the progress bar
}

const CircleProgressBar: React.FC<CircleProgressBarProps> = ({ score }) => {
  const radius = 50; // Define the radius of the circle
  const circumference = 2 * Math.PI * radius; // Calculate the circumference of the circle
  // Calculate the stroke offset based on the score
  const strokeDashoffset = circumference - (score / 10) * circumference;

  // The component returns an SVG element, which contains two circles and a text element
  return (
    <svg height="120" width="120">
      <circle // Outer circle
        className="circle-bg"
        stroke="lightgray" // Define stroke color
        strokeWidth="7"
        fill="transparent"
        r={radius} // Set radius
        cx="60" // Center the circle along the x-axis
        cy="60" // Center the circle along the y-axis
      />
      <circle // Inner circle (Progress bar)
        className="circle"
        stroke="green" // Define stroke color
        fill="transparent"
        strokeWidth="10"
        strokeDasharray={circumference} // Define the length and spacing of dashes
        style={{ strokeDashoffset }} // Set the offset of the dash
        r={radius} // Set radius
        cx="60" // Center the circle along the x-axis
        cy="60" // Center the circle along the y-axis
      />
      <text // Text in the center of the circle
        x="60"
        y="60"
        textAnchor="middle"
        dy=".3em" // Shift the text slightly downwards to center it vertically
        fontSize="1em"
        fill="#fcfcfc">
        {`${score * 10}%`}
      </text>
    </svg>
  );
};

export default CircleProgressBar;
