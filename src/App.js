import React, {useState} from 'react';
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import './App.css';
import UserInfo from "./components/UserInfo";

function App() {
  const [userName, setUname] = useState(undefined);
  const [level, setLevel] = useState("EASY");

  const onLoginSubmit = (name, level = "EASY") => {
    setLevel(level);
    setUname(name);
  }
  return (
    <div className="App">
      {userName ? <MainPage newUser={true} userName={userName} level={level}/> : <Login onSubmit={onLoginSubmit}/>}
    </div>
  );
}

export default App;
