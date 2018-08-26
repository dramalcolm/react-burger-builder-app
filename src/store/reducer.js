import * as actionTypes from '../actions/actions';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 1.0,
    meat: 1.5,
    bacon: 1.0,
}

const InitialState = {
    ingredients:{
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
    },
    totalPrice: 4.00,
};

const reducer = (state=InitialState, action) =>{

    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.IngredientName]: state.ingredients[action.IngredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.IngredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.IngredientName]: state.ingredients[action.IngredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.IngredientName]
            }
        default:
            return state;
    }
}
export default reducer;