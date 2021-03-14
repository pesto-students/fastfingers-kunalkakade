import React from 'react';
import "./style.css";
import CrossImg from "../../static/cross.png";

export default function StopGame(props) {
  return (
    <div className={"stopGame"} style={{display:"flex"}} onClick={props.onClick}>
      <img src={CrossImg} alt={"close"}/>
      <span >
        Stop Game
      </span>
    </div>
    );
}