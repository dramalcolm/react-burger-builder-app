import React,{Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/button';

class OrderSummary extends Component{

    render(){

        const ingredSummary = Object.keys(this.props.ingredients)
        .map(igKey =>{
            return <li key={igKey}>
                        <span style={{textTransform:'capitalize'}}>{igKey}</span>: 
                        {this.props.ingredients[igKey]}</li>
        });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A Delicius burger with the following ingredient:</p>
                <ul>
                    {ingredSummary}
                </ul>
                <p><strong>Total Price: {this.props.totalprice.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button btntype='Danger' clicked={this.props.puchaseCancel}>CANCEL</Button>
                <Button btntype='Success' clicked={this.props.puchaseContinue}>CONTINUE</Button>
            </Aux>
        );
    }
}

export default OrderSummary;