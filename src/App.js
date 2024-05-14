import React, { useState, useEffect, createContext } from 'react';
import './App.css';
import { Switch, styled } from '@mui/material';

export const ThemeContext = createContext("light");

const App = () => {
  // State variables to manage mode, timer, sequence count, and pause state
  const [mode, setMode] = useState('study'); // Current mode: study, shortBreak, or longBreak
  const [time, setTime] = useState(25 * 60); // Initial time for study mode: 25 minutes
  const [sequenceCount, setSequenceCount] = useState(0); // Keeps track of sequence count
  const [isPaused, setIsPaused] = useState(true); // Keeps track of whether timer is paused or not
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark": "light"));
  };

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

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 46.5,
    height: 25.5,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(4.5px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(16.5px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 24,
      height: 24,
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));

  // JSX structure for the app UI
  return (
    <ThemeContext.Provider vlaue={{ theme, toggleTheme }}>
      <div className='app' id={theme}>
        <div  className='app__header'>
          <h1>Study Timer</h1>
          <MaterialUISwitch onChange={toggleTheme} checked={theme === "dark"}/>
        </div>
        <div className='app__timer'>
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
        <div className='how'>
          <h3>How it works</h3>
          <div className='how__content'>
            <p>This study timer is based on the Pomodoro Technique. The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It uses a timer to break work into intervals, typically 25 minutes in length, separated by short breaks. Each interval is known as a <i>pomodoro</i>.</p>
            <br></br>
            <p>Here's how this app works; </p>
            <ol>
              <li>You pick a subject.</li>
              <li>Ensure that the timer is in study mode and click start.</li>
              <li>Study till you hear the alert.</li>
              <li>Take a short break of 5 minutes.</li>
              <li>The timer automatically repeats for 4 pomodoros.</li>
              <li>After 4 pomodoros are done, take a long 30 minutes break. After your break, return to step 2</li>
            </ol>
          </div>
        </div>
        <div className='app__footer'>
          <p>Developed with 💜 for Àdùké</p>
        </div>
      </div>
    </ThemeContext.Provider> 
  );
};

export default App;
