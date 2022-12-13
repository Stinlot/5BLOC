import { useState, useEffect } from "react";
import useEth from "../contexts/EthContext/useEth";
import "../HomeCard.scss";
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBus, faPlane,faTrain } from '@fortawesome/free-solid-svg-icons'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import DatePicker from "react-datepicker";
import JsonCities from "../resources/capital.json";
import "react-datepicker/dist/react-datepicker.css";
import { Button,Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



function Travels() {
  const { state } = useEth();
  const [cards, setCards] = useState([]);
  const [departureCity, setDepartureCity] = useState("Kabul");
  const [arrivalCity, setArrivalCity] = useState("Kabul");
  const [departureDate, setDepartureDate] = useState(new Date());
  const [price, setPrice] = useState(randomNumberInRange(5,100));
  const [discount,setDiscount] = useState(0)
  const [discountedPrice, setDiscountedPrice] = useState(calculateDiscountedPrice(0));
  const [cities,setCities] = useState(populateSelect())
  const [myTravel,setMyTravel] = useState([]); 
  

  useEffect(() => {
  
   getMyCards();
   getMyTravels();
  }, [state]);

  function getMyCards(){
    if(state != null && state.contract != null){
      //state.contract.methods.getCardsByOwner("0x0000000000000000000000000000000000000000").call().then((response) => {
      state.contract.methods.getCardsByOwner(state.accounts[0]).call().then((response) => {
        console.log("MyCards response:" + response)
        setCards(response);
      });
    }
  }

  function calculateDiscountedPrice(_discount){
    return (price * ((100-_discount)/100) );
  }

  function findMoreSuitableDiscount(_arrivalCity){

    let higherNormalDiscount = 0;
    
    for (let i = 0; i < cards.length; i++) {
      let amount = cards[i].name == _arrivalCity ? cards[i].discountPercentage * 1.5 : cards[i].discountPercentage
      if(amount > higherNormalDiscount) higherNormalDiscount = amount;
    }

    setDiscount(higherNormalDiscount);
    setDiscountedPrice(calculateDiscountedPrice(higherNormalDiscount));
  }

  function populateSelect(){
    let cityArray = [];
    
    for (let i = 0; i < JsonCities.length; i++) {
        if(JsonCities[i].city != null){
        cityArray.push(JsonCities[i].city);
        }
      }
      return cityArray;
  }

  function getTravels(){

    state.contractTravel.methods.getTravels().call().then((response) => {
      console.log("Travels response:" + response)
    });
  }

  function getMyTravels(){

    if(state != null && state.contract != null){
      //state.contract.methods.getCardsByOwner("0x0000000000000000000000000000000000000000").call().then((response) => {
      state.contractTravel.methods.getTravelsByOwner(state.accounts[0]).call().then((response) => {
        console.log("MyTravels response:" + response[0])
        setMyTravel(response)
      });
    }
  }


  function buyTravel(){
    console.log(departureCity)
    console.log(arrivalCity)
    console.log(discountedPrice)
    console.log(price)
    console.log(state.accounts[0])
    console.log(departureDate)
 
    state.contractTravel.methods.bookNewTravel(departureCity,arrivalCity,discountedPrice,price,state.accounts[0],departureDate).send({from:state.accounts[0], gas:3000000})
  }

  function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  function onChangeDepartureCity(event){
    setDepartureCity(event.target.value)
  }

  function onChangeArrivalCity(event){
    setArrivalCity(event.target.value)
    findMoreSuitableDiscount(event.target.value);
  
  }

  return (
    <div className="travels">
      <section class="page-contain">
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
        <div style={{padding:'20px',position:'absolute',top:450,opacity:'0.9',width:'100%',backgroundColor:'white'}}>
      <Form>
     
        <div key={`inline-radio}`} className="mb-3">
          <Form.Check
            inline
            label={<FontAwesomeIcon icon={faBus} />}
            name="group1"
            type="radio"
            id={`inline-radio`}
          />
          <Form.Check
            inline
            label={<FontAwesomeIcon icon={faPlane} />}
            name="group1"
            type="radio"
            id={`inline-radio2`}
          />
          <Form.Check
            inline
            label={<FontAwesomeIcon icon={faTrain} />}
            type="radio"
            name="group1"
            id={`inline-radio3`}
          />
        </div>
    </Form>
    <FloatingLabel controlId="floatingSelect" label="Departure city">
    <Form.Select aria-label="Departure city" onChange={onChangeDepartureCity}>
        {cities.map((city) => {
            return <option value={city}>{city}</option>
        })};
    </Form.Select>
    </FloatingLabel>
    <FloatingLabel controlId="floatingSelect2" label="Arrival city">
    <Form.Select aria-label="Arrival city" onChange={onChangeArrivalCity}>
    {cities.map((city) => {
            return <option value={city}>{city}</option>
        })};
    </Form.Select>
    </FloatingLabel>
      
      <span><b>Date</b></span>
      <DatePicker selected={departureDate} onChange={(date) => setDepartureDate(date)} />
      <span><b>Intial price: {price}</b></span><br/>
      <span><b>Discount: {discount} %</b></span><br/>
      <span><b>Real price: {discountedPrice}</b></span><br/>
      <Button style={{margin:'10px'}} onClick={buyTravel} variant="primary">Buy now</Button>
      <Table style={{margin:'10px'}} striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Departure city</th>
                        <th>Arrival city</th>
                        <th>Price</th>
                        <th>Departure date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {myTravel.map((travel) => {
                            return <tr>
                                <td>{travel.id}</td>
                                <td>{travel.departureCity}</td>
                                <td>{travel.arrivalCity}</td>
                                <td>{travel.discountedPrice}</td>
                                <td>{travel.departureDate}</td>
                            </tr>
                        })}
                    </tbody>
                </Table>
      </div>
      </section>
      
      
    </div>
  );
}

export default Travels;
