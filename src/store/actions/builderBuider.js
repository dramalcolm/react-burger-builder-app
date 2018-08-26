import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const addIngrdient = (name) =>{
    return{
        type: actionTypes.ADD_INGREDIENT,
        IngredientName: name
    }
};

export const removeIngrdient = (name) =>{
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        IngredientName: name
    }
};

export const setIngredients = (ingredients) => {
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAIL
    }
}

export const InitiIngredients=()=>{
    return dispatch => {
        axios.get('ingredients.json')
            .then(response=>{
                dispatch(setIngredients(response.data))
            })
            .catch(error=>{
                dispatch(fetchIngredientsFailed())
            });
    }
}

export const setIngredientsCost = (ingred_cost) => {
    return{
        type: actionTypes.SET_INGREDIENTS_COST,
        ingred_cost: ingred_cost
    }
}


export const InitIngredientsCost=()=>{
    return dispatch =>{
        //Get Ingredients Prices            
        axios.get('ingred_cost.json')
        .then(response=>{
            dispatch(setIngredientsCost(response.data))
        })
        .catch(error=>{
            dispatch(fetchIngredientsFailed())
        });    
    }
}