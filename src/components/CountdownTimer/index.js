import React from 'react';

import './style.css';
import {renderTime} from "../utils";

export default class CountdownTimer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: props.timeForWord,
      prevWordTime: props.timeForWord,
      maxTimer: 10,
    };
    this.timer = null;
    this.timerRef = React.createRef();
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.decrementTimeRemaining();
    }, 1000);
  }


  componentDidUpdate(prevProps) {
    if (prevProps.word !== this.props.word) {
      if (this.timer !== null) clearInterval(this.timer);
      const score = this.state.prevWordTime - this.state.timeLeft;
      this.props.onScoreChange(score)
      this.timer = setInterval(() => {
        this.decrementTimeRemaining();
      }, 1000);

      this.timerRef.current.setAttribute('stroke-dasharray', '283 283');

      this.setState({
        timeLeft: this.props.timeForWord,
        prevWordTime: prevProps.timeForWord,
      });
    }
  }


  componentWillUnmount() {
    clearInterval(this.timer);
  }

  /*
  decrements the time you see inside the countdown timer
  also handles gameOver scenario
  clears the set interval when game over condition occurs
   */

  decrementTimeRemaining = () => {
    if (this.state.timeLeft > 0) {
      this.setState(
        {
          timeLeft: this.state.timeLeft - 1,
        },
        () => {
          this.setCircleDasharray();
        }
      );
    } else {
      clearInterval(this.timer);
      this.props.onGameOver();
    }
  };

  calculateTimeFraction = () => {
    const rawTimeFraction = this.state.timeLeft / this.props.timeForWord;
    return rawTimeFraction - (1 / this.props.timeForWord) * (1 - rawTimeFraction);
  }

  setCircleDasharray = () => {
    const circleDasharray = `${(this.calculateTimeFraction() * 283).toFixed(
      0
    )} 283`;
    if (this.timerRef && this.timerRef.current) {
      this.timerRef.current.setAttribute('stroke-dasharray', circleDasharray);
    }
  };

  render() {
    return (
      <div className="base-timer">
        <svg
          className="base-timer__svg"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="base-timer__circle">
            <circle
              className="base-timer__path-elapsed"
              cx="50"
              cy="50"
              r="45"
            />
            <path
              ref={this.timerRef}
              id="base-timer-path-remaining"
              strokeDasharray="283"
              className="base-timer__path-remaining"
              d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
            ></path>
          </g>
        </svg>
        <span className="base-timer__label">
          {renderTime(this.state.timeLeft)}
        </span>
      </div>
    );
  }
}