import * as actionTypes from '../actions/actionTypes';

const InitialState = {
    ingredients: null,
    ingred_cost: null,
    totalPrice: 4.00,
    error: false,
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
                totalPrice: state.totalPrice + state.ingred_cost[action.IngredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return{
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.IngredientName]: state.ingredients[action.IngredientName] - 1
                },
                totalPrice: state.totalPrice - state.ingred_cost[action.IngredientName]
            }
        case actionTypes.SET_INGREDIENTS:
            return{
                ...state,
                ingredients: action.ingredients,
                error: false,
            }
        case actionTypes.FETCH_INGREDIENTS_FAIL:
            return{
                ...state,
                error: true,
            }
        case actionTypes.SET_INGREDIENTS_COST:
            return{
                ...state,
                ingred_cost: action.ingred_cost,
                error: false,
            }            
        default:
            return state;
    }
}
export default reducer;