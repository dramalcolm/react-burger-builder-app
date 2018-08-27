import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const InitialState = {
    ingredients: null,
    ingred_cost: null,
    totalPrice: 4.00,
    error: false,
    building: false
};

const addIngredient = (state, action) =>{
    const updatedIngredient = {[action.IngredientName]: state.ingredients[action.IngredientName] + 1}
    const updatedIngredients = updateObject(state.ingredients,updatedIngredient);
    const updateState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + state.ingred_cost[action.IngredientName],
        building: true
    }
    return updateObject(state,updateState);
};

const removeIngredient = (state, action) =>{
    const updatedIng= {[action.IngredientName]: state.ingredients[action.IngredientName] - 1}
    const updatedIngs = updateObject(state.ingredients,updatedIng);
    const updateStat = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - state.ingred_cost[action.IngredientName],
        building: true
    }
    return updateObject(state,updateStat);
}

const reducer = (state=InitialState, action) =>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state,action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state,action);
        case actionTypes.SET_INGREDIENTS:
            return updateObject(state,{ingredients: action.ingredients,totalPrice: 4, error: false, building: false});
        case actionTypes.FETCH_INGREDIENTS_FAIL:
            return updateObject(state,{error: true});
        case actionTypes.SET_INGREDIENTS_COST:
            return updateObject(state,{ingred_cost: action.ingred_cost,error: false, building: false});          
        default:
            return state;
    }
}

export default reducer;
