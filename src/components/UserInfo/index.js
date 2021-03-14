import React, {useState} from 'react';
import PlayerImg from '../../static/person.png'
import GamepadImg from '../../static/gamepad.png'
import './style.css';

function UserInfo(props) {

  return (
    <div className={"userInfo"}>
      <div className={"userInfoElements"}>
        <img src={PlayerImg}/>
        <div>{props.userName}</div>
      </div>
      <div className={"userInfoElements"}>
        <img src={GamepadImg}/>
        <div>LEVEL : {props.level}</div>
      </div>
    </div>
  );
}

export default UserInfo;
