import React , { Component } from 'react';
import {Row, Col, Container, Jumbotron, Button, FormControl, ButtonToolbar} from 'react-bootstrap'
import './App.css';
import { Game, Cards } from './classes'

let dRes, betArea, avBalance;
let pTable, dTable, dScore, pScore;
let hButton, sButton, nButton, bButton, stButton;
let pCards, dCards, blackJack;

function checkInt(event){
  let value = parseInt(event.target.value)
  console.log(value)
  if( isNaN(value)){
    alert("Please enter a valid NUMBER!");
    betArea.value = ""
  }
}

class App extends Component {

  componentDidMount() {
  dScore = document.getElementById("dealerScore");
  pScore = document.getElementById("playerScore");
  nButton = document.getElementById("nButton");
  dRes = document.getElementById("dispResult");
  bButton = document.getElementById("bButton");
  hButton = document.getElementById("hButton");
  sButton = document.getElementById("sButton");
  stButton = document.getElementById("stButton");
  betArea = document.getElementById("betValue");
  avBalance = document.getElementById("avBalance");
  pTable = document.getElementById("playerTable");
  dTable = document.getElementById("dealerTable");

  pCards = new Cards(pTable,pScore,dRes);
  dCards = new Cards(dTable,dScore,dRes);
  blackJack = new Game(avBalance, betArea, pScore, hButton, sButton, nButton, stButton, bButton, dTable, dScore, dCards, dRes, pCards);

  bButton.onclick = () => { blackJack.startGame() };
  hButton.onclick = () => { pCards.drawCard(); blackJack.checkScore() };
  sButton.onclick = () => { blackJack.autoPlay() }
  nButton.onclick = () => { blackJack.nextRound() };
  stButton.onclick = () => { blackJack.newGame() };
}

  shouldComponentUpdate() {
    return false;
  }
  
  render(){

    return (
      <div className="App">
        <Container id="Container">
            <Row>
              <div id="newGame">
                <Col>
                  <Jumbotron className="bjTable">
                    <h2>Player</h2>
                    <div className="table" id="playerTable"></div>
                    <p>Score: <span id="playerScore">0</span></p>
                  </Jumbotron>
                </Col>
                <Col>
                  <Jumbotron className="bjTable">
                    <h2>Dealer</h2>
                    <div className="table" id="dealerTable"></div>
                    <p>Score: <span id="dealerScore">0</span></p>
                  </Jumbotron>
                </Col>
              </div>
            </Row>
            <Jumbotron>
            <p id="dispResult"></p>
            <Row>
              <Col>
                <p>Available Balance: <span id="avBalance">1000</span></p>
              </Col>
              <Col>
                <FormControl onChange={checkInt.bind(this)} id="betValue" placeholder="Enter the amount you're willing to bet!"></FormControl>
              </Col>
              <Col>
              <ButtonToolbar>
                <Button id="bButton" style={{"marginRight": "10px"}}>Bet</Button>
                <Button id="hButton" style={{"marginRight": "10px"}} variant="success">Hit me!</Button>
                <Button id="sButton" style={{"marginRight": "10px"}} variant="info">Stand</Button>
                <Button id="nButton" variant="warning">Next Round!</Button>
                <Button id="stButton" variant="warning">Start New Game!</Button>
              </ButtonToolbar>
              </Col>
            </Row>
            </Jumbotron>
        </Container>
      </div>
    );

  }

}

export default App;
