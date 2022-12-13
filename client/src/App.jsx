import './App.css';
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
import Travels from './travels/Travels.jsx'
import MarketPlace from './cards/MarketPlace.jsx'
import Cards from './cards/Cards.jsx'


function App() {
  

  return (
    <Router>
      <EthProvider>
      <Routes>
        <Route path="/travels" element=<Travels/> />
        <Route path="/cards/marketplace" element=<MarketPlace/> />
        <Route path="/cards" element=<Cards/> />
        <Route path="/home" element=<Home/> />
        <Route path="/" element=<Home/> />
      </Routes>
    </EthProvider>
  </Router>
  )
}

export default App;
