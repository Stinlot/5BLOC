import './App.css';
import Web3 from "web3"
import {useEffect,useState} from 'react';
import JsonABI from './contracts/PrivilegeCardManager.json';
import { saveAs } from 'file-saver'
import { EthProvider } from "./contexts/EthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
//import { BigNumber } from "./node_modules/bignumber.js/bignumber.mjs";
import Home from './Home.jsx'
import Travel from './travels/Travel.jsx'
import MarketPlace from './cards/MarketPlace.jsx'
import Cards from './cards/Cards.jsx'





const rcpUrl = 'http://127.0.0.1:7545';
const metamaskProvider = window.ethereum;






function App() {

  
  const [account,setAccount] = useState();
  const [balance,setBalance] = useState([]);
  const [contract,setContract] = useState();
  const [web3Instance, setWeb3Instance] = useState();
  
  const [isHumainReadable,setHumainReadable] = useState(true)
  
  //const weiToEth = (balance) : string => web3.utils.fromWei(balance);
  
  const weiToEthV2 = (balance) : int => balance / Math.pow(10,18);
  
  const Index = () => {
    const downloadImage = () => {
      console.log('test download')
      saveAs('https://random.imagecdn.app/150/300', 'C:/Users/Stévann/Documents/GitHub/5BLOC/client/cardImages/test.jpg') // Put your image url here.
    }
    
    return <button onClick={downloadImage}>Download!</button>
  }
  
  
  function toggleHumainReadable(){
    setHumainReadable(!isHumainReadable);
  }
  
  async function  getContext()  {
    const web3 = new Web3(window.ethereum || "ws://localhost:8545");
    setWeb3Instance(web3);
    const accounts = await web3.eth.requestAccounts();
    setAccount(accounts[0]);
    const networkID = await web3.eth.net.getId();
    let address;
    address = JsonABI.networks[networkID].address;
    
    const balance = await web3.eth.getBalance(accounts[0]);
    setBalance(balance);
    console.log(networkID);
    console.log(address)
    getContract(web3,JsonABI.abi,address);
    //contract = new web3.eth.Contract(JsonABI.abi, address);
  }
  
  function getContract (web3t,abi, address) {
    setContract(new web3t.eth.Contract(JsonABI.abi, '0x29dB62821B09303d3b7765f144a2F92EdfD05853'));
    console.log("Contract: ", contract)
    //firstContract.methods.write("256").send({from:'0xfe688D6Fd3C33754691Fa7E822214811730A9260'});
  }
  
  
  useEffect(() : void => {
    //getContext();
    //requestAccounts();
    //getContract();
    //test();
  },[])
  
  
 
  return (
    <Router>
      <EthProvider>
    
      <Routes>
        <Route path="/travel" element=<Travel/> />
        <Route path="/cards/marketplace" element=<MarketPlace/> />
        <Route path="/cards" element=<Cards/> />
        <Route path="/home" element=<Home/> />
        <Route path="/" element=<Home/> />
      </Routes>
    {/* <header className="App-header">
    <button onClick={getCards}>Get cards</button>
    <button onClick={generateCard}>Generate Card</button>
    {
      "Hello " + account + " Balance: " + balance
    }
    </header>
  <Index/> */}
  
    </EthProvider>
  </Router>
  )
}

export default App;
