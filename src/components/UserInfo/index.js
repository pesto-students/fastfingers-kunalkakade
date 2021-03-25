import React from 'react';
import PlayerImg from '../../static/person.png'
import GamepadImg from '../../static/gamepad.png'
import './style.css';

function UserInfo(props) {

  return (
    <div className={"userInfo"}>
      <div className={"userInfoElements"}>
        <img src={PlayerImg} alt={"player"}/>
        <div>{props.userName}</div>
      </div>
      <div className={"userInfoElements"}>
        <img src={GamepadImg} alt={"gamepad"}/>
        <div>LEVEL : {props.level}</div>
      </div>
    </div>
  );
}

export default UserInfo;
