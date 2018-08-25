import React from 'react';
import Burger from '../burger/burger';
import Button from '../UI/Button/button';
import classes from './CheckOutSummary.css';

const checkOutSummary = (props) => {
    
    return(
        <div className={classes.CheckOutSummary}>
            <h1>CheckOut Summary</h1>
            <div style={{width:'100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
                btntype="Danger"
                clicked={props.onCheckOutCancelled}>CANCEL</Button>
            <Button 
                btntype="Success"
                clicked={props.onCheckOutContinue}>CONTINUE</Button>
        </div>
        
    );
}

export default checkOutSummary;