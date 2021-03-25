import React from 'react';
import './style.css';
import {renderTime} from "../utils";

function ScoreCount(props) {

  console.log("MainPage",props)

  return (
    <div className={"scoreCard"}>
      <div>
        Fast Fingers
      </div>
      {props.score && <div>
        SCORE : {renderTime(props.score)}
      </div>}
    </div>
  );
}

export default ScoreCount;
