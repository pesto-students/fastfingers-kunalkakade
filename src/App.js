import React, {useState} from 'react';
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import './App.css';

function App() {
  const [userName, setUname] = useState(undefined);
  const [level, setLevel] = useState("EASY");
  const [ category, setCategory] = useState("Default");

  const onLoginSubmit = (name, level = "EASY",category) => {
    setLevel(level);
    setUname(name);
    setCategory(category)
  }
  return (
    <div className="App">
      {userName ? <MainPage newUser={true} userName={userName} level={level} category={category}/> : <Login onSubmit={onLoginSubmit}/>}
    </div>
  );
}

export default App;
