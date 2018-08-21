import React from 'react';
import classes from './burger.css';
import BurgerIngredient from './ingredient/burgerIngredient';

const burger = (props) => {

    let trans_ingredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_,i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            });
        }).reduce((arr,el)=>{
            return arr.concat(el)
        },[]);

    if(trans_ingredients.length === 0){
        trans_ingredients = <p>Please start adding Ingredients</p>
    }

    return(
        <div className={classes.burger}>
            <BurgerIngredient type='bread-top'/>
                {trans_ingredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );

};

export default burger;