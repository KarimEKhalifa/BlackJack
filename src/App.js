import React from 'react';
import {Row, Col, Container, Jumbotron, Button, FormControl, ButtonToolbar} from 'react-bootstrap'
import './App.css';

const startGame = () =>{
  alert("Game started!");
  let pTable = document.getElementById("playerTable");
  
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
              </Jumbotron>
            </Col>
            <Col>
              <Jumbotron className="bjTable">
                <h2>Dealer</h2>
                <div className="table" id="dealerTable"></div>
              </Jumbotron>
            </Col>
          </Row>
          <Jumbotron>
          <Row>
            <Col>
              <p>Available Balance: <span id="availableBalance">1000</span></p>
            </Col>
            <Col>
              <FormControl placeholder="Enter the amount you're willing to bet!"></FormControl>
            </Col>
            <Col>
            <ButtonToolbar>
              <Button onClick={startGame} style={{"marginRight": "10px"}}>Bet</Button>
              <Button style={{"marginRight": "10px"}} variant="success">Hit me!</Button>
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
