import React , {Component} from 'react';
import {Row, Col, Container, Jumbotron, Button, FormControl, ButtonToolbar} from 'react-bootstrap'
import './App.css';

let cardColor, highCards, dScore, pScore, nButton, bButton, dRes, betArea, avBalance;
let pTable, dTable, hButton, sButton;

document.addEventListener('DOMContentLoaded', function() {
  cardColor = ["C","D","H","S"];
  highCards = ["10","J","K","Q"];
  dScore = document.getElementById("dealerScore");
  pScore = document.getElementById("playerScore");
  nButton = document.getElementById("nButton");
  dRes = document.getElementById("dispResult");
  bButton = document.getElementById("bButton");
  hButton = document.getElementById("hButton");
  sButton = document.getElementById("sButton");
  betArea = document.getElementById("betValue");
  avBalance = document.getElementById("avBalance");
  pTable = document.getElementById("playerTable");
  dTable = document.getElementById("dealerTable");
}, false);

const delElem = (elem) => {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
}
const appElem = (elem , txt) => {
  let appendElem = document.createElement("p");
  appendElem.innerText = txt;
  elem.appendChild(appendElem);
}
const repElem = (elem , txt) => {
  let newElem = document.createElement("p");
  newElem.innerText = txt;
  elem.replaceChild(newElem,elem.firstChild);
}

const updateBalance = (num) => {
  console.log(avBalance.innerHTML)
  if (num === 0)
    avBalance.innerText = parseInt(avBalance.innerText) - parseInt(betArea.value);
  else if( num === 1)
    avBalance.innerText = parseInt(avBalance.innerText) + parseInt(betArea.value)*2;
  else
    avBalance.innerText = parseInt(avBalance.innerText) + Math.ceil(parseInt(betArea.value)*(3/2));
}
const dealerPlay = () => {
  let player = parseInt(pScore.firstChild.innerText)
  hButton.style.display = "none";
  sButton.style.display = "none";
  dTable.removeChild(dTable.firstChild);
  while (parseInt(dScore.firstChild.innerText) < 15)
     drawCard(dTable,dScore);
  if(parseInt(dScore.firstChild.innerText) <= 21 && parseInt(dScore.firstChild.innerText) > player ){
    appElem(dRes,"The dealer wins this round!");
    dRes.style.color = "red";
    updateBalance(0);
  }else if (parseInt(dScore.firstChild.innerText)=== player){
    appElem(dRes,"Draw!")
    dRes.style.color = "blue";
  }else{
    appElem(dRes,"Congrats, you win this round!");
    dRes.style.color = "green";
    updateBalance(1);
  }
  nButton.style.display = "block";
}

const nextRound = () => {
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
    hButton.style.display = "block";
    sButton.style.display = "block";
  }else{
    alert("Cannot bet more than you have! Duh!")
  }
}

const clearTable = () => {
  delElem(pTable);
  delElem(dTable);
  repElem(pScore,"0")
  repElem(dScore,"0");
  delElem(dRes);
  betArea.value="";
  betArea.removeAttribute("disabled");
  bButton.style.display = "block";
  hButton.style.display = "none";
  sButton.style.display = "none";
}

const checkScore = () => {
  let score = parseInt(pScore.firstChild.innerText);
  if(score === 21){
    updateBalance(2);
    appElem(dRes,"BLACKJACK!!");
    dRes.style.color = "dark green";
    nButton.style.display = "block";
    bButton.style.display = "none";
    hButton.style.display = "none";
    sButton.style.display = "none";
  }else if(score > 21 ){
    updateBalance(0);
    appElem(dRes,"You've lost!");
    dRes.style.color = "red";
    nButton.style.display = "block";
    bButton.style.display = "none";
    hButton.style.display = "none";
    sButton.style.display = "none";
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
  let newScore = parseInt(wScore.firstChild.innerText)+ parseInt(nCard);
  console.log(newScore);
  repElem(wScore,newScore);
  let aCard = checkCard(nCard);
  let selectedColor = cardColor[Math.floor(Math.random()*4)];

  let cardImages = document.createElement("img");
  cardImages.src=`./cards/${aCard}${selectedColor}.png`;

  wTable.appendChild(cardImages);
}

const dispStartCards = (wTable, wScore) => {
  let cards = 0;
  let sum = 0;
  for( let i =0; i< 2; i++){
    let cardImages = document.createElement("img");
    if(wTable !== dTable || i===1){
      cards = genCard();
      sum+=cards;
      cards = checkCard(cards);
      let selectedColor = cardColor[Math.floor(Math.random()*4)];
      cardImages.src=`./cards/${cards}${selectedColor}.png`;
    }else{
      cardImages.src=`./cards/blue_back.png`
    }
    wTable.appendChild(cardImages);
  }
  repElem(wScore,sum);
}
const genCard = () =>{
  return Math.ceil(Math.random()*10)
}

class App extends Component {

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
                <FormControl id="betValue" placeholder="Enter the amount you're willing to bet!"></FormControl>
              </Col>
              <Col>
              <ButtonToolbar>
                <Button id="bButton" onClick={startGame} style={{"marginRight": "10px"}}>Bet</Button>
                <Button id="hButton" onClick={() => {drawCard(pTable,pScore); checkScore();}} style={{"marginRight": "10px"}} variant="success">Hit me!</Button>
                <Button id="sButton" onClick={ dealerPlay } style={{"marginRight": "10px"}} variant="info">Stand</Button>
                <Button id="nButton" onClick = { nextRound } variant="warning">Next Round!</Button>
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
