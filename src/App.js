import React , {Component} from 'react';
import {Row, Col, Container, Jumbotron, Button, FormControl, ButtonToolbar} from 'react-bootstrap'
import './App.css';

let cardColor, highCards, dScore, pScore, dRes, betArea, avBalance;
let pTable, dTable, hButton, sButton, nButton, bButton, stButton;
let dResManip, pCards, dCards;

class ElementManipulation{

  constructor(el){
    this.elem = el;
  }
    delElem = () => {
    while (this.elem.firstChild) {
      this.elem.removeChild(this.elem.firstChild);
    }
  }
  appElem = (txt) => {
    let appendElem = document.createElement("p");
    appendElem.innerText = txt;
    this.elem.appendChild(appendElem);
  }
  repElem = (txt) => {
    let newElem = document.createElement("p");
    newElem.innerText = txt;
    this.elem.replaceChild(newElem,this.elem.firstChild);
  }
}

class Cards{

  constructor(table,score){
    this.value = 0;
    this.wTable = table;
    this.wScore = score;
  }

  checkCard = () => {
    let cards = 0;
    if (this.value === 10){
      cards = highCards[Math.floor(Math.random()*4)];
    }else if(this.value === 1){
      cards = "A";
    }else{
    cards = this.value
    }
    return cards;
  }

  drawCard = () => {
    let wScoreManip = new ElementManipulation(this.wScore);
    this.genCard();
    let newScore = parseInt(this.wScore.firstChild.innerText)+ parseInt(this.value);
    console.log(newScore);
    wScoreManip.repElem(newScore);
    let aCard = this.checkCard();
    let selectedColor = cardColor[Math.floor(Math.random()*4)];
  
    let cardImages = document.createElement("img");
    cardImages.src=`./cards/${aCard}${selectedColor}.png`;
  
    this.wTable.appendChild(cardImages);
  }

  dispStartCards = () => {
    let cards = 0;
    let sum = 0;
    let wScoreManip = new ElementManipulation(this.wScore);
    for( let i =0; i< 2; i++){
      let cardImages = document.createElement("img");
      if(this.wTable !== dTable || i===1){
        this.genCard();
        sum+=this.value;
        cards = this.checkCard();
        let selectedColor = cardColor[Math.floor(Math.random()*4)];
        cardImages.src=`./cards/${cards}${selectedColor}.png`;
      }else{
        cardImages.src=`./cards/blue_back.png`
      }
      this.wTable.appendChild(cardImages);
    }
    
    wScoreManip.repElem(sum);
  }

  genCard = () =>{
    this.value = Math.ceil(Math.random()*10);
  }

  clearCardsTable = () => {
    let wScoreManip = new ElementManipulation(this.wScore);
    let wTableManip = new ElementManipulation(this.wTable);
    wTableManip.delElem();
    wScoreManip.repElem("0")
    dResManip.delElem();
    betArea.value="";
    betArea.removeAttribute("disabled");
    bButton.style.display = "block";
    hButton.style.display = "none";
    sButton.style.display = "none";
  }

}

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
  stButton = document.getElementById("stButton");
  betArea = document.getElementById("betValue");
  avBalance = document.getElementById("avBalance");
  pTable = document.getElementById("playerTable");
  dTable = document.getElementById("dealerTable");

  dResManip = new ElementManipulation(dRes);
  pCards = new Cards(pTable,pScore);
  dCards = new Cards(dTable,dScore);
}, false);



const updateBalance = (num) => {
  console.log(avBalance.innerHTML)
  if( num === 1)
    avBalance.innerText = parseInt(avBalance.innerText) + parseInt(betArea.value)*2;
  else if ( num === 2)
    avBalance.innerText = parseInt(avBalance.innerText) + Math.ceil(parseInt(betArea.value)*(5/2));
  else if ( num === 3)
    avBalance.innerText = parseInt(avBalance.innerText) + parseInt(betArea.value);
}

const dealerPlay = () => {
  let player = parseInt(pScore.firstChild.innerText)
  hButton.style.display = "none";
  sButton.style.display = "none";
  dTable.removeChild(dTable.firstChild);
  while (parseInt(dScore.firstChild.innerText) < 15)
     dCards.drawCard();
  if(avBalance.innerHTML == 0 && (parseInt(dScore.firstChild.innerText) <= 21 && parseInt(dScore.firstChild.innerText) > player)){
    dResManip.appElem("The House Wins! Play Again?");
    dRes.style.color = "red";
    stButton.style.display = "block";
    nButton.style.display = "none";
  }else if(parseInt(dScore.firstChild.innerText) <= 21 && parseInt(dScore.firstChild.innerText) > player ){
    dResManip.appElem("The dealer wins this round!");
    dRes.style.color = "red";
    nButton.style.display = "block";
  }else if (parseInt(dScore.firstChild.innerText)=== player){
    dResManip.appElem("Draw!")
    dRes.style.color = "blue";
    updateBalance(3);
    nButton.style.display = "block";
  }else{
    dResManip.appElem("Congrats, you win this round!");
    dRes.style.color = "green";
    updateBalance(1);
    nButton.style.display = "block";
  }
}

const nextRound = () => {
  pCards.clearCardsTable();
  dCards.clearCardsTable();
  nButton.style.display = "none";
}

const newGame = () => {
  nextRound();
  avBalance.innerHTML = 1000;
  stButton.style.display = "none";
}

const startGame = () => {
  let betValue = betArea.value;
  console.log(betValue.length)

  if( !betValue.length ){
    alert("Don't forget to enter a bet!")
  }else if (betValue <= parseInt(avBalance.innerHTML)){
    betArea.setAttribute("disabled","");
    avBalance.innerHTML = parseInt(avBalance.innerHTML) - parseInt(betValue);
    pCards.dispStartCards();
    dCards.dispStartCards();
    bButton.style.display = "none";
    hButton.style.display = "block";
    sButton.style.display = "block";
  }else if(avBalance.innerHTML === 0){
    stButton.style.display = "block";
  }else{
    alert("Cannot bet more than you have!")
  }
}


const checkScore = () => {
  let score = parseInt(pScore.firstChild.innerText);
  if(score === 21){
    updateBalance(2);
    dResManip.appElem("BLACKJACK!!");
    dRes.style.color = "green";
    nButton.style.display = "block";
    bButton.style.display = "none";
    hButton.style.display = "none";
    sButton.style.display = "none";
  }else if(avBalance.innerHTML == 0 && score > 21){
    dResManip.appElem("The House Wins! Play Again?");
    dRes.style.color = "red";
    nButton.style.display = "none";
    bButton.style.display = "none";
    hButton.style.display = "none";
    sButton.style.display = "none";
    stButton.style.display = "block";
  }else if(score > 21 ){
    updateBalance(0);
    dResManip.appElem("You've lost!");
    dRes.style.color = "red";
    nButton.style.display = "block";
    bButton.style.display = "none";
    hButton.style.display = "none";
    sButton.style.display = "none";
  }
}

function checkInt(event){
  let value = parseInt(event.target.value)
  console.log(value)
  if( isNaN(value)){
    alert("Please enter a valid NUMBER!");
    betArea.value = ""
  }
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
                <FormControl onChange={checkInt.bind(this)} id="betValue" placeholder="Enter the amount you're willing to bet!"></FormControl>
              </Col>
              <Col>
              <ButtonToolbar>
                <Button id="bButton" onClick={startGame} style={{"marginRight": "10px"}}>Bet</Button>
                <Button id="hButton" onClick={() => {pCards.drawCard(); checkScore();}} style={{"marginRight": "10px"}} variant="success">Hit me!</Button>
                <Button id="sButton" onClick={ dealerPlay } style={{"marginRight": "10px"}} variant="info">Stand</Button>
                <Button id="nButton" onClick = { nextRound } variant="warning">Next Round!</Button>
                <Button id="stButton" onClick = { newGame } variant="warning">Start New Game!</Button>
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
