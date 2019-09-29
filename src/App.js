import React from 'react';
import {Row, Col, Container, Jumbotron, Button, FormControl, ButtonToolbar} from 'react-bootstrap'
import './App.css';

let cardColor, highCards, dScore, pScore, nButton, dRes, bButton, betArea, avBalance;
let pTable, dTable;

document.addEventListener('DOMContentLoaded', function() {
  cardColor = ["C","D","H","S"];
  highCards = ["10","J","K","Q"];
  dScore = document.getElementById("dealerScore");
  pScore = document.getElementById("playerScore");
  nButton = document.getElementById("nButton");
  dRes = document.getElementById("dispResult");
  bButton = document.getElementById("bButton");
  betArea = document.getElementById("betValue");
  avBalance = document.getElementById("avBalance");
  pTable = document.getElementById("playerTable");
  dTable = document.getElementById("dealerTable");
}, false);



const dealerPlay = () => {

  while (parseInt(dScore.innerHTML)<=15){
    drawCard(dTable,dScore);
  }
  if(parseInt(dScore.innerHTML) > parseInt(pScore.innerHTML)){
    dRes.innerHTML="The dealer wins this round!"
  }else{
    dRes.innerHTML="Congrats, you wins this round!"
  }
  nButton.style.display = "block";
}

const nextRound = () => {
  let nButton = document.getElementById("nButton");
  clearTable();
  nButton.style.display = "none";
}

const startGame = () => {
  let betValue = betArea.value;
  if (betValue <= parseInt(avBalance.innerHTML)){
    betArea.setAttribute("disabled","");
    avBalance.innerHTML = parseInt(avBalance.innerHTML) - parseInt(betValue);
    dispStartCards(pTable,pScore);
    dispStartCards(dTable,dScore);
    bButton.style.display = "none";
  }else{
    alert("Cannot bet more than you have! Duh!")
  }
  
}

const clearTable = () => {
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
  pScore.innerHTML = "0"
  dRes.innerHTML = ""
}

const checkScore = () => {
  pScore = parseInt(pScore.innerHTML);
  if(pScore === 21){
    dRes.innerHTML = "BLACKJACK!!";
    nButton.style.display = "block";
    bButton.style.display = "none";
  }else if(pScore > 21 ){
    dRes.innerHTML = "You've lost!";
    nButton.style.display = "block";
    bButton.style.display = "none";
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


const drawCard = (wTable, wScore) => {
  let nCard = genCard();
  console.log(wScore)
  wScore.innerHTML = parseInt(wScore.innerHTML)+parseInt(nCard);
  let aCard = checkCard(nCard);
  let selectedColor = cardColor[Math.floor(Math.random()*4)];
  let cardImages = document.createElement("img");
  cardImages.src=`./cards/${aCard}${selectedColor}.png`;
  console.log(`./cards/${aCard}${selectedColor}.png`)
  wTable.appendChild(cardImages);
  return cardImages;
}

const dispStartCards = (wTable, wScore) => {
  let cards = 0;
  let sum = 0;
  for( let i =0; i< 2; i++){
    cards = genCard();
    sum+=cards;
    cards = checkCard(cards);
    let selectedColor = cardColor[Math.floor(Math.random()*4)];
    let cardImages = document.createElement("img");
    cardImages.src=`./cards/${cards}${selectedColor}.png`;
    console.log(`./cards/${cards}${selectedColor}.png`)
    wTable.appendChild(cardImages);
  }
  wScore.innerHTML = sum;
}
const genCard = () =>{
  return Math.ceil(Math.random()*10)
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
          <p id="dispResult"></p>
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
              <Button onClick={() => {drawCard(pTable,pScore); checkScore();}} style={{"marginRight": "10px"}} variant="success">Hit me!</Button>
              <Button onClick={ dealerPlay } style={{"marginRight": "10px"}} variant="info">Stand</Button>
              <Button id="nButton" onClick = { nextRound } variant="warning">Next Round!</Button>
            </ButtonToolbar>
            </Col>
          </Row>
          </Jumbotron>
      </Container>
    </div>
  );
}

export default App;
