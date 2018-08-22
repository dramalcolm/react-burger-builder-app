import React from 'react';
import Aux from '../../../hoc/Aux';

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
            <p>Continue to checkout?</p>
        </Aux>
    );
};

export default orderSummary;