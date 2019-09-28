import React from 'react';
import {Row, Col, Container, Jumbotron, Button, FormControl, ButtonToolbar} from 'react-bootstrap'
import './App.css';


let cardColor = ["C","D","H","S"];
let highCards = ["10","J","K","Q"];

const startGame = () => {
  let bButton = document.getElementById("bButton");
  let betArea = document.getElementById("betValue");
  let avBalance = document.getElementById("avBalance");
  let betValue = betArea.value;
  if (betValue <= parseInt(avBalance.innerHTML)){
    betArea.setAttribute("disabled","");
    avBalance.innerHTML = parseInt(avBalance.innerHTML) - parseInt(betValue);
    dispStartCards();
    bButton.style.display = "none";
  }else{
    alert("Cannot bet more than you have! Duh!")
  }
  
}

const checkScore = () => {
  let score = document.getElementById("playerScore");
  score = parseInt(score.innerHTML);
  if(score === 21){
    alert("BLACKJACK!!")
  }else if(score > 21 ){
    console.log("You've Lost!!");

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



async function drawCard(){
  let pTable = document.getElementById("playerTable");
  let pScore = document.getElementById("playerScore");
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

const dispStartCards = () => {
  let pTable = document.getElementById("playerTable");
  let pScore = document.getElementById("playerScore");
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
              <Button onClick={() => {drawCard().then(checkScore());}} style={{"marginRight": "10px"}} variant="success">Hit me!</Button>
              <Button variant="info">Stand</Button>
            </ButtonToolbar>
            </Col>
          </Row>
          </Jumbotron>
      </Container>
    </div>
  );
}

export default App;
