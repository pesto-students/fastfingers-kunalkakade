import React, {useState} from 'react';
import './style.css';
import RelaodImg from "../../static/reload.png";
import UserInfo from "../UserInfo";
import ScoreCount from "../ScoreCount";
import {renderTime} from "../utils";
import MainPage from "../MainPage";
import App from "../../App";

export default class ScorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goBackToMainPage: false,
      goToLogin: false,
    }
  }

  goBackToMainPage = () => {
    this.setState({goBackToMainPage: true});
  }

  goToLogin = () => {
    this.setState({goToLogin: true});
  }

  render() {
    if(this.state.goToLogin){
      return (<App />);
    }
    return (
      <div>
        {this.state.goBackToMainPage ? <MainPage newUser={false} userName={this.props.userName} level={this.props.level}/> :
          <div>
            <div style={{display: "flex"}}>
              <UserInfo userName={this.props.userName} level={this.props.level}/>
              <div style={{flex: "1", paddingTop: "200px"}}>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                  <div className={"gameName"}>SCORE: {this.props.gameName}</div>
                  <div className={"score"}>
                    {renderTime(this.props.score)}
                  </div>
                  {this.props.isHighScore && <div className={"newHighScore"}>
                    New High Score
                  </div>}
                  <div style={{display: "flex"}} onClick={this.goBackToMainPage}>
                    <img className={"reloadImg"} src={RelaodImg}/>
                    <div className={"playAgain"}>
                      Play again
                    </div>
                  </div>
                </div>
              </div>
              <ScoreCount/>
            </div>
            <div className={"quit"} onClick={this.goToLogin}>QUIT</div>
          </div>}

      </div>
    );
  }
}

