import React, { useState, useEffect } from 'react';
import './CountdownTimer.css'; // We'll create this for styling

function CountdownTimer({ targetDate }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isClient, setIsClient] = useState(false); // To prevent SSR hydration mismatch

  useEffect(() => {
    setIsClient(true); // Component has mounted on client
    if (!targetDate) return;

    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear interval if the component is unmounted or a new targetDate is provided
    return () => clearTimeout(timer);
  }); // No dependency array, so it runs on every render to update time

  if (!isClient || !targetDate) {
    return null; // Don't render on server or if no targetDate
  }

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval] && timeLeft[interval] !== 0) {
      // Don't push component if time is not calculated (e.g. offer expired initially)
      return;
    }

    // Add leading zero if it's a single digit, except for days if it's zero and other units exist
    let value = timeLeft[interval];
    if (interval !== 'days' || (interval === 'days' && (value > 0 || Object.keys(timeLeft).length === 1))) {
        value = value < 10 && value >=0 ? `0${value}` : value;
    }

    timerComponents.push(
      <span key={interval} className={`timer-segment ${interval}`}>
        {value} <span className="timer-label">{interval.charAt(0).toUpperCase() + interval.slice(1)}</span>
      </span>
    );
  });

  return (
    <div className="countdown-timer">
      {timerComponents.length ? (
        <>
          <span className="offer-ends-text">Offer ends in: </span>
          {timerComponents.reduce((prev, curr) => [prev, ' : ', curr])}
        </>
      ) : (
        <span className="offer-expired-text">Offer has expired!</span>
      )}
    </div>
  );
}

export default CountdownTimer;
