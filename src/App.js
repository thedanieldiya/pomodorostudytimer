import React, { useState, useEffect, useRef } from 'react';
import Timer from './Timer';
import "./App.css";
import {Icon} from '@iconify/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const App = () => {
  const [timeSpent, setTimeSpent] = useState(0);
  const [activeTimer, setActiveTimer] = useState({ duration: 25, label: 'Study' });
  const [timerActive, setTimerActive] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const timerRef = useRef(null);


  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => {
        setTimeSpent((prevTime) => prevTime + 1);
      }, 60000); 
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [timerActive]);


  const handleTimerClick = (duration, label) => {
    setActiveTimer({ duration, label });
    setTimerActive(true);
  };


  const handleTimeUp = (label) => {
    if (label === 'Study') {
      setTimeSpent((prevTime) => prevTime + 25);
      setSessionCount((prevCount) => prevCount + 1);

      if (sessionCount < 3) {
        setActiveTimer({ duration: 5, label: 'Short Break' });
      } else {
        setActiveTimer({ duration: 30, label: 'Long Break' });
        setSessionCount(0); 
      }
    } else if (label === 'Short Break') {
      setActiveTimer({ duration: 25, label: 'Study' });
    } else if (label === 'Long Break') {
      setActiveTimer({ duration: 25, label: 'Study' });
    }   

    // setActiveTimer(null);
    setTimerActive(false);
  };

  const handleStart = () => {
    setTimerActive(true);
  };

  const handlePause = () => {
    setTimerActive(false);
  };

  const handleReset = () => {
    setTimerActive(false);
    setTimeSpent(0);

    if (activeTimer?.label === 'Study') {
      setActiveTimer(null);
    } else {
      setActiveTimer({ duration: 25, label: 'Study' });
    }
    setSessionCount(0);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="App">
      <div className="pages" id='pg1'>
        <div className="header">
          <h1>Study Timer</h1>
          <p>based on the Pomodoro study technique</p> 
        </div>
        <div className='modebtn'>
          <button onClick={() => handleTimerClick(25, 'Study')}>Study</button>
          <button onClick={() => handleTimerClick(5, 'Short Break')}>Short Break</button>
          <button onClick={() => handleTimerClick(30, 'Long Break')}>Long Break</button>
        </div>
        <div className='timer'>
          <Timer
            duration={activeTimer?.duration || 25}
            label={activeTimer?.label || 'Study'}
            isActive={timerActive}
            onStart={handleStart}
            onPause={handlePause}
            onTimeUp={handleTimeUp}
          />
        </div>
        <div className='interface'>
          <button onClick={handlePause}className='icons'><Icon icon="material-symbols:pause-rounded" color="#f6f5ff" width="36" height="36"/></button>
          <button onClick={handleStart}className='icons'><Icon icon="material-symbols:play-arrow-rounded" color="#f6f5ff" width="36" height="36"/></button>
          <button onClick={handleReset}className='icons'><Icon icon="material-symbols:restart-alt-rounded" color="#f6f5ff" width="36" height="36" margin-left="-30px"/></button>
        </div>
        <div>
          <p>Time Elapsed: {timeSpent} / 150 minutes</p>
        </div>
      </div>
      <div className='pages' id='pg2'>
        <h2>Pomodoro Study Technique</h2>
        <div className='technique'>
          <div className='item-container'>
            <Icon icon="lucide:list-todo" width="72" height="72"/>
            <br></br>
            Select task to accomplish
          </div>
          <div className='item-container'>
            {/* {icon} */}
            Study for 25 minutes
          </div>
          <div className='item-container'>
            {/* {icon} */}
            Take a short 5 minutes break
          </div>
          <div className='item-container'>
            <Icon icon="material-symbols:restart-alt-rounded"  width="72" height="72" />
            <br></br>
            Repeat for 4 rounds
          </div>
          <div className='item-container'>
            {/* {icon} */}
            Take a long 30 minutes break
          </div>
          
        </div>
        <Slider {...settings} className='carousel'>
            <div className='item-container'>
              <Icon icon="lucide:list-todo" width="72" height="72"/>
              <br></br>
              Select task to accomplish
            </div>
            <div className='item-container'>
              {/* {icon} */}
              Study for 25 minutes
            </div>
            <div className='item-container'>
              {/* {icon} */}
              Take a short 5 minutes break
            </div>
            <div className='item-container'>
              <Icon icon="material-symbols:restart-alt-rounded"  width="72" height="72" />
              <br></br>
              Repeat for 4 rounds
            </div>
            <div className='item-container'>
              {/* {icon} */}
              Take a long 30 minutes break
            </div>
          </Slider>
        <div className='footer'>
          <p className='footer-text'>developed with ❤ using ReactJs</p>
          <p className='footer-text'>2024, thedanieldiya.</p>
        </div>
      </div>
    </div>
  );
};

export default App;
