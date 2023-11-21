import React, { useState, useEffect } from 'react';
import {CountdownCircleTimer} from 'react-countdown-circle-timer';

const Timer = ({ duration, label, isActive, onStart, onPause, onTimeUp }) => {
    const [key, setKey] = useState(0);
    const [remainingTime, setRemainingTime] = useState(duration * 60);
  
    useEffect(() => {
      setKey((prevKey) => prevKey + 1);
      setRemainingTime(duration * 60);
    }, [duration, isActive]);
  
    useEffect(() => {
      let interval;
  
      if (isActive) {
        interval = setInterval(() => {
          setRemainingTime((prevTime) => {
            if (prevTime > 0) {
              return prevTime - 1;
            } else {
              clearInterval(interval);
              onTimeUp(label);
              return 0;
            }
          });
        }, 1000);
      }
  
      return () => clearInterval(interval);
    }, [isActive, label, onTimeUp]);
  
    return (
      <div>
        <CountdownCircleTimer
          key={key}
          isPlaying={isActive}
          duration={duration * 60}
          colors={[['#FF0000', 0.33], ['#FFD700', 0.33], ['#008000', 0.33]]}
          onComplete={() => onTimeUp(label)}
        >
          {({ remainingTime }) => (
            <div>
              <div>{label}</div>
              <div>{Math.floor(remainingTime / 60)}:{remainingTime % 60}</div>
              <div>
                {isActive ? (
                  <button onClick={onPause}>Pause</button>
                ) : (
                  <button onClick={onStart}>Start</button>
                )}
              </div>
            </div>
          )}
        </CountdownCircleTimer>
      </div>
    );
  };
  
  export default Timer;