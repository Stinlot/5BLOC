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


    useEffect(() => {
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
            <section class="page-contain">
    <div style={{position:'absolute',top:'50px'}}>
      <h1>Marketplace</h1>
    </div>
    <div style={{position:'absolute',top:'80px',fontSize:'15px'}}>
      <p><b>buy and sell cards to enjoy amazing discounts on your next trips !</b></p>
    </div>
    <div style={{position:'absolute',top:'470px',fontSize:'20px'}}>
      <p><b>List of current available cards on the market</b></p>
    </div>
    <a href="/cards" class="data-card">
          <h3>Cards</h3>
          <h4>Go back to your cards</h4>
          <p>Navigate back to your cards</p>
          <span class="link-text">
            Go back to your cards
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
      </section>
      <div className="testContainer">
    {cards.map((card) => {
      return <div key={card.id}><Card state={state} card={card}/></div>
    })}
    
    </div>
            </div>
      
    )
}

export default MarketPlace;