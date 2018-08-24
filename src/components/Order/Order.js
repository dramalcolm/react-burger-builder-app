import React from 'react';
import classes from './Order.css';

const order = (props) => {

    
    let ingredients = Object.keys(props.ingredients).map((igkey) =>{
        let list = '';
        if(props.ingredients[igkey] !== 0){
            list = <li key={igkey}> {igkey} ({props.ingredients[igkey]})</li>
        }
        return list;
    })

    //console.log(props.ingredients);

    return(
    <div className={classes.Order}>
        <p>Ingredients:</p>
        <ul>
            {ingredients}
        </ul>
        <p>Price: <strong>USD ${props.price.toFixed(2)}</strong></p>
    </div>);
};

export default order;