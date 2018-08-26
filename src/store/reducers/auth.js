import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';


const InitialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
}

const reducer = (state=InitialState,action)=>{
    switch(action.type){
        case actionTypes.AUTH_START:
            return updateObject(state,{loading: true,error: null});
        case actionTypes.AUTH_SUCCESS:
            return updateObject(state,{loading: false,error: null,token: action.idToken, userId: action.userId});
        case actionTypes.AUTH_FAILED:
            return updateObject(state,{loading: false,error: action.error});
        case actionTypes.AUTH_LOGOUT:
            return updateObject(state,{token: null, userId: null});
        default: return state;
    }
}
export default reducer;