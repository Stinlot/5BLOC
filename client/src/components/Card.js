import React from 'react';
import '../Card.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEur, faPercent } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'react-bootstrap';

export default class Card extends React.Component {


    constructor(props){
        super(props)


        
        console.log(this.props);
        console.log(this.props.state);
        this.buyCard = this.buyCard.bind(this);
        this.sellCard = this.sellCard.bind(this);
    }

    transformStatus(code){
        return (code == 0 ? "owned" : "selling");
    }

    buyCard(){
        this.props.state.contract.methods.buyCard(this.props.card.id,this.props.state.accounts[0]).send({from:this.props.state.accounts[0], gas:3000000})
    }

    sellCard(){
        this.props.state.contract.methods.sellCard(this.props.card.id,this.props.state.accounts[0]).send({from:this.props.state.accounts[0], gas:3000000})
    }

    render(){

        return(
            <div>
                <div className="container">
                    <div className="container__info">
    <span className='cartInfo'><FontAwesomeIcon icon={faEur} /> {this.props.card.price}</span>
    <span className='cartInfo'><FontAwesomeIcon icon={faPercent} /> {this.props.card.discountPercentage}</span>
   </div>
   <div className="container__profile">
    <img
     src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
     alt="people"
    />
    <div className="container__profile__text">
     <h1><b>{this.props.card.name}</b></h1>
     <p>status: <b>{this.transformStatus(this.props.card.status)}</b> {this.props.card.status == 0 ? <Button onClick={this.sellCard} variant='primary'>Put for sale</Button> : <Button onClick={this.buyCard} variant='primary'>Buy now</Button>}</p>
     
                </div>
                 </div>
                </div>
            </div>
        )
    }

}