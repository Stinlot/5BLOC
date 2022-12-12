import { useState,useEffect } from "react";
import useEth from "./contexts/EthContext/useEth";

function Home() {
  const { state } = useEth();
  const [value, setValue] = useState("?");


  useEffect(() : void => {
    //getContext();
    //requestAccounts();
    //getContract();
    test();
  },[])

  function test(){
    console.log(state)
  }


  return (
    <div className="demo">
        <p>Home</p>
    </div>
  );
}

export default Home;