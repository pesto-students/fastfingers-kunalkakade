import React, {useState} from 'react';
import keyboardLogo from './keyboard.png';
import PlayLogo from '../../static/play.png';
import './style.css';

function Login(props) {
  const [uname, setUname] = useState(undefined);
  const [errorMsg, setErrorMsg] = useState(undefined);
  const [level, setLevel] = useState("EASY");
  const [ category, setCategory] = useState("Default");
  const handleLevelChange = (event) =>{
    setLevel(event.target.value);
  };

  const handleNameChange = (event) =>{
    setUname(event.target.value);
    setErrorMsg(undefined);
  };

  const handleOnStartGame = () =>{
    if(!uname){
      setErrorMsg("Player name cannot be empty")
    }
    props.onSubmit(uname, level, category);
  }

  const handleCategoryChange = (event) =>{
    setCategory(event.target.value);
  };

  return (
    <div className="login">
      <img style={{width:"500px"}} src={keyboardLogo} alt={"logo"}/>
      <h1>Fast Fingers</h1>
      <h3>_____________ The ultimate Typing Game_____________</h3>
      <div className={"login-form"} >
        <input onChange={handleNameChange} className={"name-input"} type={"text"} placeholder={"type your name"}/>
        <select onChange={handleCategoryChange} className={"select-level"} name="cars">
          <option value="Default">Default</option>
          <option value="PersonName">Person Name</option>
          <option value="Animals">Animals</option>
          <option value="Cities">Cities</option>
        </select>

        <select onChange={handleLevelChange} className={"select-level"} name="cars">
          <option value="EASY">EASY</option>
          <option value="MEDIUM">Medium</option>
          <option value="HARD">Hard</option>
        </select>
        <div style={{color:"red"}}>{errorMsg}</div>
        <div onClick={handleOnStartGame} style={{display: "flex", alignItems:"center",cursor: "pointer"}}>
          <img style={{width:"100px"}} src={PlayLogo} alt={"logo"}/>
          <h3>START GAME</h3>
        </div>
      </div>
    </div>
  );
}

export default Login;
