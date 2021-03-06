import React from 'react';
import classes from './buildControls.css';
import BuildControl from './buildControl/buildControl'

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
                <BuildControl 
                    key={ctl.label} 
                    label={ctl.label}
                    added={()=>props.ingredientAdd(ctl.type)}
                    remove={()=>props.ingredientRemove(ctl.type)}
                    disabled={props.disabled[ctl.type]}/>
            ))}

            <button className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.orderNow}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
            
        </div>
    );
}
export default buildControls;
