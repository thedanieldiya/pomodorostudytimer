import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // State variables to manage mode, timer, sequence count, and pause state
  const [mode, setMode] = useState('study'); // Current mode: study, shortBreak, or longBreak
  const [time, setTime] = useState(25 * 60); // Initial time for study mode: 25 minutes
  const [sequenceCount, setSequenceCount] = useState(0); // Keeps track of sequence count
  const [isPaused, setIsPaused] = useState(true); // Keeps track of whether timer is paused or not

  useEffect(() => {
    let interval;
    // Timer logic
    if (!isPaused) {
      interval = setInterval(() => {
        setTime(prevTime => {
          if (prevTime > 0) {
            // Decrease time by 1 second if time is greater than 0
            return prevTime - 1;
          } else {
            // Switch mode and reset time when the timer reaches 0
            switch (mode) {
              case 'study':
                if (sequenceCount < 3) {
                  // Switch to short break after completing study mode for 4 times
                  setMode('shortBreak');
                  setTime(5 * 60); // Set time for short break
                  setSequenceCount(prevCount => prevCount + 1);
                } else {
                  // Switch to long break after completing study mode for 4 times
                  setMode('longBreak');
                  setTime(30 * 60); // Set time for long break
                  setSequenceCount(0); // Reset sequence count
                }
                break;
              case 'shortBreak':
                // Switch to study mode after short break
                setMode('study');
                setTime(25 * 60); // Set time for study mode
                break;
              case 'longBreak':
                // Switch to study mode after long break
                setMode('study');
                setTime(25 * 60); // Set time for study mode
                break;
              default:
                break;
            }
          }
        });
      }, 1000); // Update every second
    }

    // Cleanup function to clear interval when component unmounts or when timer is paused
    return () => clearInterval(interval);
  }, [isPaused, mode, sequenceCount]);

  // Function to handle mode changes when mode buttons are clicked
  const handleModeChange = (newMode) => {
    setIsPaused(true); // Pause the timer when mode is changed
    // Update mode and time based on the button clicked
    if (newMode === 'study') {
      setSequenceCount(0); // Initialize sequence count for a new study session
    } else {
      setSequenceCount(sequenceCount + 1); // Increment sequence count for short or long break
    }
    setMode(newMode); // Set new mode
    setTime(newMode === 'study' ? 25 * 60 : newMode === 'shortBreak' ? 5 * 60 : 30 * 60); // Set time based on mode
  };

  // Function to handle play/pause button click
  const handlePlayPause = () => {
    setIsPaused(prevPaused => !prevPaused); // Toggle pause state
  };

  // Function to handle reset button click
  const handleReset = () => {
    setIsPaused(true); // Pause the timer
    setMode('study'); // Reset mode to study
    setTime(25 * 60); // Reset time to 25 minutes
    setSequenceCount(0); // Reset sequence count
  };

  // JSX structure for the app UI
  return (
    <div className='app'>
      <div className='mode__buttons'>
        {/* Mode buttons */}
        <button onClick={() => handleModeChange('study')} disabled={mode === 'study'}>Study</button>
        <button onClick={() => handleModeChange('shortBreak')} disabled={mode === 'shortBreak'}>Short Break</button>
        <button onClick={() => handleModeChange('longBreak')} disabled={mode === 'longBreak'}>Long Break</button>
      </div>
      <div className='timer'>
        {/* Timer display */}
        {`${Math.floor(time / 60)
          .toString()
          .padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`}
      </div>
      <div className="control__buttons">
        {/* Control buttons */}
        <button onClick={handlePlayPause}>{isPaused ? 'Play' : 'Pause'}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default App;
