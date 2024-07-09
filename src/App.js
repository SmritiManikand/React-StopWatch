import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import TimerIcon from './timer.png'; 
import BackgroundImage from './bg.png'; 

function App() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const increment = useRef(null);

  useEffect(() => {
    if (isActive && !isPaused) {
      increment.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(increment.current);
    }
    return () => clearInterval(increment.current);
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handleStop = () => {
    setIsActive(false);
    setIsPaused(true);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${BackgroundImage})` }}>
      <h1>Stopwatch</h1>
      <div className="stopwatch-card">
        <div className="timer-header">
          <img src={TimerIcon} alt="Timer Icon" />
          <h2>Timer</h2>
        </div>
        <p>
          <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
          <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
        </p>
        <div className="buttons">
          {isActive && !isPaused ? (
            <button onClick={handlePauseResume} className="pause-button">Pause</button>
          ) : (
            <button onClick={handleStart} className="start-button">Start</button>
          )}
          <button onClick={handleStop} className="stop-button" disabled={!isActive}>Stop</button>
          <button onClick={handleReset} className="reset-button" disabled={!isPaused && !isActive}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
