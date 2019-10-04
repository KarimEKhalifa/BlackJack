export class ElementManipulation{

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
  
  export  class Game{

    constructor(balance, bet, playerScore, hit, stand, next, start, betB, dealerTable, dealerScore, dealerCards, dispRes, playerCards){
        this.avBalance = balance;
        this.betArea = bet;
        this.pScore = playerScore;
        this.pCards = playerCards;
        this.hButton = hit;
        this.sButton = stand;
        this.nButton = next;
        this.stButton = start;
        this.bButton = betB;
        this.dTable = dealerTable;
        this.dScore = dealerScore;
        this.dCards = dealerCards;
        this.dRes = dispRes;
        this.dResManip = new ElementManipulation(this.dRes);
    }
  
    updateBalance = (num) => {
      console.log(this.avBalance.innerHTML)
      if( num === 1)
        this.avBalance.innerText = parseInt(this.avBalance.innerText) + parseInt(this.betArea.value)*2;
      else if ( num === 2)
        this.avBalance.innerText = parseInt(this.avBalance.innerText) + Math.ceil(parseInt(this.betArea.value)*(5/2));
      else if ( num === 3)
        this.avBalance.innerText = parseInt(this.avBalance.innerText) + parseInt(this.betArea.value);
    }

  
    dealerPlay = () => {
      let player = parseInt(this.pScore.firstChild.innerText)
      this.hButton.style.display = "none";
      this.sButton.style.display = "none";
      this.dTable.removeChild(this.dTable.firstChild);
      while (parseInt(this.dScore.firstChild.innerText) < 15)
         this.dCards.drawCard();
      if(this.avBalance.innerHTML == 0 && (parseInt(this.dScore.firstChild.innerText) <= 21 && parseInt(this.dScore.firstChild.innerText) > player)){
        this.dResManip.appElem("The House Wins! Play Again?");
        this.dRes.style.color = "red";
        this.stButton.style.display = "block";
        this.nButton.style.display = "none";
      }else if(parseInt(this.dScore.firstChild.innerText) <= 21 && parseInt(this.dScore.firstChild.innerText) > player ){
        this.dResManip.appElem("The dealer wins this round!");
        this.dRes.style.color = "red";
        this.nButton.style.display = "block";
      }else if (parseInt(this.dScore.firstChild.innerText)=== player){
        this.dResManip.appElem("Draw!")
        this.dRes.style.color = "blue";
        this.updateBalance(3);
        this.nButton.style.display = "block";
      }else{
        this.dResManip.appElem("Congrats, you win this round!");
        this.dRes.style.color = "green";
        this.updateBalance(1);
        this.nButton.style.display = "block";
      }
    }

    clearBetArea = () => {
        this.betArea.value="";
        this.betArea.removeAttribute("disabled");
    }
    
    nextRound = () => {
      this.pCards.clearCardsTable();
      this.dCards.clearCardsTable();
      this.clearBetArea();
      this.nButton.style.display = "none";
      this.bButton.style.display = "block";
      this.hButton.style.display = "none";
      this.sButton.style.display = "none";
    }
    
    newGame = () => {
      this.nextRound();
      this.avBalance.innerHTML = 1000;
      this.stButton.style.display = "none";
    }
    
    startGame = () => {
      let betValue = this.betArea.value;
      console.log(betValue.length)
    
      if( !betValue.length ){
        alert("Don't forget to enter a bet!")
      }else if (betValue <= parseInt(this.avBalance.innerHTML)){
        this.betArea.setAttribute("disabled","");
        this.avBalance.innerHTML = parseInt(this.avBalance.innerHTML) - parseInt(betValue);
        this.pCards.dispStartCards();
        this.dCards.dispStartCards();
        this.bButton.style.display = "none";
        this.hButton.style.display = "block";
        this.sButton.style.display = "block";
      }else if(this.avBalance.innerHTML === 0){
        this.stButton.style.display = "block";
      }else{
        alert("Cannot bet more than you have!")
      }
    }
    
    checkScore = () => {
      let score = parseInt(this.pScore.firstChild.innerText);
      if(score === 21){
        this.updateBalance(2);
        this.dResManip.appElem("BLACKJACK!!");
        this.dRes.style.color = "green";
        this.nButton.style.display = "block";
        this.bButton.style.display = "none";
        this.hButton.style.display = "none";
        this.sButton.style.display = "none";
      }else if(this.avBalance.innerHTML == 0 && score > 21){
        this.dResManip.appElem("The House Wins! Play Again?");
        this.dRes.style.color = "red";
        this.nButton.style.display = "none";
        this.bButton.style.display = "none";
        this.hButton.style.display = "none";
        this.sButton.style.display = "none";
        this.stButton.style.display = "block";
      }else if(score > 21 ){
        this.updateBalance(0);
        this.dResManip.appElem("You've lost!");
        this.dRes.style.color = "red";
        this.nButton.style.display = "block";
        this.bButton.style.display = "none";
        this.hButton.style.display = "none";
        this.sButton.style.display = "none";
      }
    }
      
  }
  
  export  class Cards{
  
    constructor(table,score,res){
      this.value = 0;
      this.wTable = table;
      this.wScore = score;
      this.wScoreManip = new ElementManipulation(this.wScore);
      this.wTableManip = new ElementManipulation(this.wTable);
      this.dRes = res;
      this.dResManip = new ElementManipulation(this.dRes);
      this.cardColor = ["C","D","H","S"];
      this.highCards = ["10","J","K","Q"];
    }
  
    checkCard = () => {
      let cards = 0;
      if (this.value === 10){
        cards = this.highCards[Math.floor(Math.random()*4)];
      }else if(this.value === 1){
        cards = "A";
      }else{
      cards = this.value
      }
      return cards;
    }
  
    drawCard = () => {
      this.genCard();
      let newScore = parseInt(this.wScore.firstChild.innerText)+ parseInt(this.value);
      console.log(newScore);
      this.wScoreManip.repElem(newScore);
      let aCard = this.checkCard();
      let selectedColor = this.cardColor[Math.floor(Math.random()*4)];
    
      let cardImages = document.createElement("img");
      cardImages.src=`./cards/${aCard}${selectedColor}.png`;
    
      this.wTable.appendChild(cardImages);
    }
  
    dispStartCards = () => {
      let cards = 0;
      let sum = 0;
      for( let i =0; i< 2; i++){
        let cardImages = document.createElement("img");
        if(this.wTable.id !== "dealerTable" || i===1){
          this.genCard();
          sum+=this.value;
          cards = this.checkCard();
          let selectedColor = this.cardColor[Math.floor(Math.random()*4)];
          cardImages.src=`./cards/${cards}${selectedColor}.png`;
        }else{
          cardImages.src=`./cards/blue_back.png`
        }
        this.wTable.appendChild(cardImages);
      }
      
      this.wScoreManip.repElem(sum);
    }
  
    genCard = () =>{
      this.value = Math.ceil(Math.random()*10);
    }
  
    clearCardsTable = (betArea) => {
      this.wTableManip.delElem();
      this.wScoreManip.repElem("0")
      this.dResManip.delElem();
    }
  
  }
  