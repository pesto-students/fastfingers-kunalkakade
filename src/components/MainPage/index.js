import React from 'react';
import './style.css';
import UserInfo from "../UserInfo";
import ScoreCount from "../ScoreCount";
import CountdownTimer from "../CountdownTimer";
import {LEVEL, words} from "../utils";
import ScoreBoard from "../ScoreBoard";
import StopGame from "../StopGame";
import ScorePage from "../ScorePage";


class MainPage extends React.Component {
  constructor(props) {
    super(props);
    let difficultyFactor;

    if (this.props.level === LEVEL.EASY) {
      difficultyFactor = 1;
    } else if (this.props.level === LEVEL.MEDIUM) {
      difficultyFactor = 1.5;
    } else {
      difficultyFactor = 2;
    }

    const newWord = this.getNextWord(words, difficultyFactor);
    let timeForWord = Math.round(newWord.length / difficultyFactor);
    timeForWord = Math.max(timeForWord, 2);

    this.state = {
      currentWord: newWord,
      userInput: '',
      startTimer: false,
      level: this.props.level,
      difficultyFactor: difficultyFactor,
      words: words,
      timeForWord: timeForWord,
      gameOver: false,
      currentScore: 0,
    }
  }

  componentDidMount() {
    // if(this.props.newUser){
    //   window.sessionStorage.removeItem("scoreBoard");
    //   window.sessionStorage.clear();
    // }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // if(this.props.userName!== prevProps.userName){
    //   window.sessionStorage.clear();
    // }
  }


  setScore = (score) => {
    this.setState({currentScore: this.state.currentScore + score});
  }


  onGameOver = () => {
    const sessionStorage = window.sessionStorage;
    let data = JSON.parse(window.sessionStorage.getItem('scoreBoard')) || [];
    data.slice(Math.max(data.length - 8, 1))
    // if(data.length>0){
    //   data[0].hasHighScore=true;
    // }
    const currentGame = { name: ` GAME ${data.length +1}`, score: this.state.currentScore, hasHighScore: false};
    for(let i=0;i<data.length;i++){
      if(data[i].hasHighScore && data[i].score < currentGame.score){
        currentGame["hasHighScore"] = true;
        data[i]["hasHighScore"] = false;
      }
    }
    if(data.length===0){
      currentGame.hasHighScore=true;
    }
    data.push(currentGame);
    console.log('seting item');
    sessionStorage.setItem("scoreBoard", JSON.stringify(data));
    this.setState({gameOver: true});

  };

  onUserInputChange = (event) => {
    const value = event.target.value.toUpperCase();
    if (value === this.state.currentWord) {
      const difficultyFactor = this.state.difficultyFactor + 0.01;

      let level;
      if (difficultyFactor >= 2) level = LEVEL.HARD;
      else if (difficultyFactor < 1.5) level = LEVEL.EASY;
      else level = LEVEL.MEDIUM;

      const newWord = this.getNextWord(this.state.words, difficultyFactor);
      let timeForWord = Math.round(newWord.length / difficultyFactor);
      timeForWord = Math.max(timeForWord, 2);

      this.setState({
        currentWord: newWord,
        userInput: '',
        timeForWord: timeForWord,
        level: level,
        difficultyFactor: parseFloat(difficultyFactor.toFixed(2)),
      });
    } else {
      this.setState({userInput: value});
    }
  };

  getNextWord = ({easy, medium, hard}, difficultyFactor = null) => {
    console.log(difficultyFactor, "difficultyFactor")
    if (difficultyFactor >= 1.5 && difficultyFactor < 2) {
      const random = Math.round(Math.random() * (medium.length - 1));
      return medium[random].toUpperCase();
    }
    if (difficultyFactor < 1.5) {
      const random = Math.round(Math.random() * (easy.length - 1));
      return easy[random].toUpperCase();
    }
    const random = Math.round(Math.random() * (hard.length - 1));
    return hard[random].toUpperCase();
  };


  getCurrentWordComponent = () => {
    const wordCharacters = this.state.currentWord.split('');
    const userInputCharacters = this.state.userInput.split('');
    return (
      <div className={"word"}>
        {wordCharacters.map((char, i) => {
          let color;
          if (i < this.state.userInput.length) {
            color = char === userInputCharacters[i] ? '#54ba18' : '#445298';
          }
          return (
            <span key={i} style={{color: color}}>
              {char}
            </span>
          );
        })}
      </div>
    );
  };


  render() {
    let lastGame;
    if(this.state.gameOver){
      const sessionStorage = window.sessionStorage;
      console.log("sessionStorage.getItem('scoreBoard') ",JSON.stringify(sessionStorage.getItem('scoreBoard')) )
      const data = JSON.parse(sessionStorage.getItem('scoreBoard')) || [];
      lastGame = data.pop();
    }

    return (
      <div>
        {
          this.state.gameOver ? <ScorePage isHighScore={lastGame.hasHighScore}  gameName={lastGame.name} userName={this.props.userName} score={this.state.currentScore} level={this.state.level}/> : (<div style={{display: "flex"}}>
            <div style={{display: "flex", flexDirection: "column"}}>
              <UserInfo userName={this.props.userName} level={this.state.level}/>
              <ScoreBoard/>
              <StopGame onClick={this.onGameOver}/>
            </div>

            <div style={{flex: "1", paddingTop: "200px"}}>
              <CountdownTimer onScoreChange={this.setScore} timeForWord={this.state.timeForWord}
                              word={this.state.currentWord} onGameOver={this.onGameOver}/>
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "100px"
              }}>
                {this.getCurrentWordComponent()}
                <input onChange={this.onUserInputChange} value={this.state.userInput} className={"typedInput"}
                       autoFocus/>
              </div>
            </div>
            <ScoreCount score={this.state.currentScore}/>
          </div>)
        }

      </div>
    );
  }


}

export default MainPage;
