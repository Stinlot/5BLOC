# SupRail

# Overview

Suprail is a POC made for the SUPINFO company that includes a web application using specific technologies:

- Front-end: ReactJS.
- Back-end: Blockchain (ETH VM) with solidity.


## Team 

The team is a bit low on number nowadays (only me).

## Usage

### Installation

To be able to run SupRail you will need:

- NodeJS (tested with v16)
- Truffle suite 
- A local block chain IE Ganache (provided in the Truffle suite)
- A web3 injector (IE Metamask with google chrome)

### Run the application

- First start the local blockchain on ganache (settings are default).
- Run ``npm install`` in the client folder to build the ``node_modules`` folder.
- Run ``npm start`` in the client folder to start the application.
- The web application should start on localhost:3000.

### Browse through the application

The application does have 4 endpoints:
- /home
- /cards
- /cards/marketplace
- /travels

These endpoints will allow you to see, buy, sell cards and also buy travels and enjoy discounts from the cards.

### Discount

Each card has a discount which is applied when buying a travel.

If the arrival city is the same as a card, its dicount percentage is multiplied by 1.5


# Troubleshooting
My PC died a week before the deadline and as I am alone, I had to rush things which ended up in low quality render I wish I could have done something better, sorry about that :(.