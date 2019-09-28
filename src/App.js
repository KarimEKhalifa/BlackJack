import React from 'react';
import {Row, Col, Container, Jumbotron, Button, FormControl, ButtonToolbar} from 'react-bootstrap'
import './App.css';


let cardColor = ["C","D","H","S"];
let highCards = ["10","J","K","Q"];

const dealerPlay = () => {
  let dScore = document.getElementById("dealerScore");
  while (parseInt(dScore.innerHTML)<=15){
    drawCard("dealerTable","dealerScore");
  }
}

const startGame = () => {
  let bButton = document.getElementById("bButton");
  let betArea = document.getElementById("betValue");
  let avBalance = document.getElementById("avBalance");
  let betValue = betArea.value;
  if (betValue <= parseInt(avBalance.innerHTML)){
    betArea.setAttribute("disabled","");
    avBalance.innerHTML = parseInt(avBalance.innerHTML) - parseInt(betValue);
    dispStartCards("playerTable","playerScore");
    dispStartCards("dealerTable","dealerScore");
    bButton.style.display = "none";
  }else{
    alert("Cannot bet more than you have! Duh!")
  }
  
}

const clearTable = () => {
  let pTable = document.getElementById("playerTable");
  let dTable = document.getElementById("dealerTable");
  let betArea = document.getElementById("betValue");
  let bButton = document.getElementById("bButton");
  let dScore = document.getElementById("dealerScore");
  while (pTable.firstChild) {
    pTable.removeChild(pTable.firstChild);
  }
  while (dTable.firstChild) {
    dTable.removeChild(dTable.firstChild);
  }
  betArea.removeAttribute("disabled");
  betArea.value = ""
  bButton.style.display = "block";
  dScore.innerHTML = "0"
}

const checkScore = () => {
  let score = document.getElementById("playerScore");
  let pScore = parseInt(score.innerHTML);
  if(pScore === 21){
    alert("BLACKJACK!!");
    clearTable();
  }else if(pScore > 21 ){
    alert("You've Lost!!");
    score.innerHTML = 0;
    clearTable();
  }
}

const checkCard = (value) => {
  let cards = 0;
  if (value === 10){
    cards = highCards[Math.floor(Math.random()*4)];
  }else if(value === 1){
    cards = "A";
  }else{
  cards = value
  }
  return cards;
}



async function drawCard(wTable, wScore){
  let pTable = document.getElementById(wTable);
  let pScore = document.getElementById(wScore);
  let nCard = genStart()[0];
  pScore.innerHTML = parseInt(pScore.innerHTML)+parseInt(nCard);
  let aCard = checkCard(nCard);
  let selectedColor = cardColor[Math.floor(Math.random()*4)];
  let cardImages = document.createElement("img");
  cardImages.src=`./cards/${aCard}${selectedColor}.png`;
  console.log(`./cards/${aCard}${selectedColor}.png`)
  pTable.appendChild(cardImages);
  return cardImages;
}

const dispStartCards = (wTable, wScore) => {
  let pTable = document.getElementById(wTable);
  let pScore = document.getElementById(wScore);
  let cardsValue = genStart();
  let cards = 0;
  for( let i =0; i< 2; i++){
    cards = checkCard(cardsValue[i]);
    let selectedColor = cardColor[Math.floor(Math.random()*4)];
    let cardImages = document.createElement("img");
    cardImages.src=`./cards/${cards}${selectedColor}.png`;
    console.log(`./cards/${cards}${selectedColor}.png`)
    pTable.appendChild(cardImages);
  }
  let sum = cardsValue.reduce( (sum,c) => sum+=c, 0);
  pScore.innerHTML = sum;
}
const genStart = () =>{
  let cards = [];
  cards[0] = Math.ceil(Math.random()*10)
  cards[1] = Math.ceil(Math.random()*10)
  return cards;
}

function App() {
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
          <Row>
            <Col>
              <p>Available Balance: <span id="avBalance">1000</span></p>
            </Col>
            <Col>
              <FormControl id="betValue" placeholder="Enter the amount you're willing to bet!"></FormControl>
            </Col>
            <Col>
            <ButtonToolbar>
              <Button id="bButton" onClick={startGame} style={{"marginRight": "10px"}}>Bet</Button>
              <Button onClick={() => {drawCard("playerTable","playerScore").then(checkScore());}} style={{"marginRight": "10px"}} variant="success">Hit me!</Button>
              <Button onClick={ dealerPlay } variant="info">Stand</Button>
            </ButtonToolbar>
            </Col>
          </Row>
          </Jumbotron>
      </Container>
    </div>
  );
}

export default App;
