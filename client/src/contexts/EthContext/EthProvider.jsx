import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    async artifact => {
      if (artifact) {
        const web3 = new Web3(window.ethereum || "ws://localhost:8545");
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        const { abi } = artifact;
        let address, contract, isAdmin;
        try {
          address = artifact.networks[networkID].address;
          contract = new web3.eth.Contract(abi, address);
          isAdmin = await contract.methods.isAdmin(accounts[0]).call();
        } catch (err) {
          console.error(err);
        }
        dispatch({
          type: actions.init,
          data: { artifact, web3, accounts, networkID, contract, isAdmin }
        });
      }
    }, []);

    const initTravel = useCallback(
      async artifact => {
        if (artifact) {
          const web3 = new Web3(window.ethereum || "ws://localhost:8545");
          const networkID = await web3.eth.net.getId();
          const { abi } = artifact;
          let address, contractTravel;
          try {
            address = artifact.networks[networkID].address;
            contractTravel = new web3.eth.Contract(abi, address);
    
          } catch (err) {
            console.error(err);
          }
          dispatch({
            type: actions.init,
            data: { contractTravel }
          });
        }
      }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        
        const artifact = require("../../contracts/PrivilegeCardManager.json");
        init(artifact);

        const artifactTravel = require("../../contracts/TravelManager.json");
        initTravel(artifactTravel)

      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
