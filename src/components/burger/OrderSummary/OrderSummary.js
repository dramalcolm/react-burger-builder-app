import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/button';

const orderSummary = (props) =>{
    const ingredSummary = Object.keys(props.ingredients)
                                .map(igKey =>{
                                    return <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
                                });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A Delicius burger with the following ingredient:</p>
            <ul>
                {ingredSummary}
            </ul>
            <p><strong>Total Price: {props.totalprice.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button btntype='Danger' clicked={props.puchaseCancel}>CANCEL</Button>
            <Button btntype='Success' clicked={props.puchaseContinue}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;