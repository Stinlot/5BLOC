import { useState, useEffect } from "react";
import useEth from "./contexts/EthContext/useEth";
import "./HomeCard.scss";

function Home() {
  const { state } = useEth();
  const [value, setValue] = useState("?");

  useEffect(() => {
    //getContext();
    //requestAccounts();
    //getContract();
    test();
  }, []);

  function test() {
    console.log(state);
  }

  return (
    <div className="demo">
      <section class="page-contain">
        <a href="/cards" class="data-card">
          <h3>Cards</h3>
          <h4>Cards management</h4>
          <p>See, buy and sell your cards !</p>
          <span class="link-text">
            View cards
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
        <a href="travels" class="data-card">
          <h3>Travels</h3>
          <h4>Travels Management</h4>
          <p>Book your next tickets !</p>
          <span class="link-text">
            View travels
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
    </div>
  );
}

export default Home;
