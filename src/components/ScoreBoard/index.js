import React from 'react';
import "./style.css";
import {renderTime} from "../utils";

export default function ScoreBoard(props) {

  const data = JSON.parse(window.sessionStorage.getItem('scoreBoard')) || [];
console.log(data.slice(Math.max(data.length - 8, 0)));
console.log(data)
  return (<div className={"scoreBoard"}>
    SCORE BOARD
    {
      data.slice(Math.max(data.length - 8, 1)).map(game=>{
        return(<div className={"scores"}>
          {game.hasHighScore &&  <div className={"highScore"}>PERSONAL BEST</div>}
          <div className={"gameNameWithScore"}>{game.name} : {renderTime(game.score)}</div>
        </div>)
      })
    }
  </div>);
}