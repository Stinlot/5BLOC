import { useState,useEffect } from "react";
import useEth from "../contexts/EthContext/useEth";
import { Button } from 'react-bootstrap';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "../components/Card";
import JsonCities from "../capital.json";

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


  useEffect(() : void => {
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
    // 👇️ get number between min (inclusive) and max (inclusive)
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
        <p>Cards, isAdmin: {state.isAdmin ? "true" : "false"}</p>
        <div className={!state.isAdmin ? "" : "float-child"}>
       <Link to="/cards/marketplace"><Button variant="primary">MarketPlace</Button></Link>
        </div>
        { state.isAdmin ? <div className="float-child">
          <Button variant="primary" onClick={generateCard}>Generate new card</Button>
        </div> : null}
        MyCards:
          <Button variant="primary" onClick={getCards}>Get cards</Button>
          <Button variant="primary" onClick={getMyCards}>Get my cards</Button>
          <Button variant="primary" onClick={buyCard}>Buy card</Button>
        <div className="wrapper">
         
          {cards.map((card) => {
            return <div key={card.id}><Card state={state} card={card}/></div>
          })}
          </div>
        
    </div>
  )
}

export default Cards;