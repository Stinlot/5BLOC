import { useState,useEffect } from "react";
import useEth from "../contexts/EthContext/useEth";
import { Button } from 'react-bootstrap';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "../components/Card";
import JsonCities from "../resources/capital.json";
import '../HomeCard.scss';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

function Cards() {
  const { state } = useEth();
  const [cards, setCards] = useState([]);
  
  
  useEffect(() => {
    //getContext();
    //requestAccounts();
    //getContract();
    getMyCards();
    test();
  },[state])
  
  function test(){
    console.log(state)
  }
  
  function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function getCards(){
    
    state.contract.methods.getPrivilegeCardArray().call().then((response) => {
      console.log("Cards response:" + response)
    });
  }
  
  
  function getRandomCity(){
    return JsonCities[randomNumberInRange(0, JsonCities.length)].city;
  }
  
  function getMyCards(){
    if(state != null && state.contract != null){
      //state.contract.methods.getCardsByOwner("0x0000000000000000000000000000000000000000").call().then((response) => {
      state.contract.methods.getCardsByOwner(state.accounts[0]).call().then((response) => {
        console.log("MyCards response:" + response)
        setCards(response);
      });
    }
  }
  
  function generateCard(){
    state.contract.methods.createNewPrivilegeCard(getRandomCity(),randomNumberInRange(1, 20),randomNumberInRange(1, 40)).send({from:state.accounts[0], gas:3000000})
  }
  
  
  function buyCard(){
    state.contract.methods.buyCard(0,state.accounts[0]).send({from:state.accounts[0], gas:3000000})
  }
  
  return (
    <div className="mainContainer">
    <section class="page-contain">
    <div style={{position:'absolute',top:'50px'}}>
      <h1>Cards area</h1>
    </div>
    <div style={{position:'absolute',top:'80px',fontSize:'15px'}}>
      <p><b>See, buy and sell cards to enjoy amazing discounts on your next trips !</b></p>
    </div>
    <a href="/home" class="data-card">
          <h3>Home</h3>
          <h4>Go back home</h4>
          <p>Navigate back home</p>
          <span class="link-text">
            Go back home
            <svg
              width="25"
              height="16"
              viewBox="0 0 25 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.8631 0.929124L24.2271 7.29308C24.6176 7.68361 24.6176 8.31677 24.2271 8.7073L17.8631 15.0713C17.4726 15.4618 16.8394 15.4618 16.4489 15.0713C16.0584 14.6807 16.0584 14.0476 16.4489 13.657L21.1058 9.00019H0.47998V7.00019H21.1058L16.4489 2.34334C16.0584 1.95281 16.0584 1.31965 16.4489 0.929124C16.8394 0.538599 17.4726 0.538599 17.8631 0.929124Z"
                fill="#753BBD"
              />
            </svg>
          </span>
        </a>
        <a href="/cards/marketplace" class="data-card">
          <h3>Market</h3>
          <h4>Go Shopping !</h4>
          <p>Take a look at the market</p>
          <span class="link-text">
            View marketplace
            <svg
              width="25"
              height="16"
              viewBox="0 0 25 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.8631 0.929124L24.2271 7.29308C24.6176 7.68361 24.6176 8.31677 24.2271 8.7073L17.8631 15.0713C17.4726 15.4618 16.8394 15.4618 16.4489 15.0713C16.0584 14.6807 16.0584 14.0476 16.4489 13.657L21.1058 9.00019H0.47998V7.00019H21.1058L16.4489 2.34334C16.0584 1.95281 16.0584 1.31965 16.4489 0.929124C16.8394 0.538599 17.4726 0.538599 17.8631 0.929124Z"
                fill="#753BBD"
              />
            </svg>
          </span>
        </a>

        { state.isAdmin ? <a href="#" class="data-card">
          <h3>Create</h3>
          <h4>Create new card</h4>
          <p>Create a new card !</p>
          <span class="link-text">
            <Button onClick={generateCard} variant="outline-primary">Create a card
            </Button>
          </span>
        </a> : null}
      </section>

    
    
    {/* <div className={!state.isAdmin ? "" : "float-child"}>
    <Link to="/cards/marketplace"><Button variant="primary">MarketPlace</Button></Link>
    </div>
    { state.isAdmin ? <div className="float-child">
    <Button variant="primary" onClick={generateCard}>Generate new card</Button>
    </div> : null}
    MyCards:
    <Button variant="primary" onClick={getCards}>Get cards</Button>
    <Button variant="primary" onClick={getMyCards}>Get my cards</Button>
    <Button variant="primary" onClick={buyCard}>Buy card</Button> */}
    <div className="testContainer">
    {cards.map((card) => {
      return <div key={card.id}><Card state={state} card={card}/></div>
    })}
    
    </div>
    
    </div>
    )
  }
  
  export default Cards;