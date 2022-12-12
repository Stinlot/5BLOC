import {useState,useEffect} from 'react';
import useEth from "../contexts/EthContext/useEth";
import { Button } from 'react-bootstrap';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from "../components/Card";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

function MarketPlace() {
    const { state } = useEth();
    const [cards, setCards] = useState([]);


    useEffect(() : void => {
        //getContext();
        //requestAccounts();
        //getContract();
        getCards();
      },[state])


      function getCards(){
        if(state != null && state.contract != null){
        state.contract.methods.getFreeCards().call().then((response) => {
          console.log("Cards response:" + response)
          setCards(response);
        })};
      }

    return (
        <div className="mainContainer">
            <h1>MarketPlace</h1>
            <h2>Here you can find any for sell card.</h2>
           
      
              {cards.map((card) => {
                return <div key={card.id}><Card state={state} card={card}/></div>
              })}
              </div>
            
      
    )
}

export default MarketPlace;