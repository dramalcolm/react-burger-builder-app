import React from 'react';
import classes from './buildControls.css';
import BuildControls from './buildControl/buildControl'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];

const buildControls = (props) =>{
    return(
        <div className={classes.buildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctl => (
                <BuildControls 
                    key={ctl.label} 
                    label={ctl.label}
                    added={()=>props.ingredientAdd(ctl.type)}
                    remove={()=>props.ingredientRemove(ctl.type)}
                    disabled={props.disabled[ctl.type]}/>
            ))}

            <button className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.orderNow}>ORDER NOW</button>
            
        </div>
    );
}
export default buildControls;
