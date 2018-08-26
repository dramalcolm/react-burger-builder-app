import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () =>{
    return{
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) =>{

    //Calculating expiration date
    const expirationDate = new Date(new Date().getTime() + (authData.expiresIn * 1000))
    //Accessing Local Storage of the browser and adding values 
    localStorage.setItem('token',authData.idToken);
    localStorage.setItem('userId',authData.localId);
    localStorage.setItem('expirationDate',expirationDate); //When it expires

    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: authData.idToken,
        userId: authData.localId,
    };
};

export const authFailed = (error) =>{
    return{
        type: actionTypes.AUTH_FAILED,
        error: error
    };
};

export const checkAuthTimeout = (expirationTime)=>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout());
        },expirationTime * 1000);
    };
}

export const logout = () =>{

    //Accessing Local Storage of the browser and remove values saved
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate'); 
    localStorage.removeItem('userId');
    return{
        type: actionTypes.AUTH_LOGOUT,
    };
}

export const setAuthRedirectPath = (path) =>{
    return{
        type: actionTypes.SET_AUTH_REDIRECT,
        path: path
    };
}

export const auth =(email, password, isSignUp)=>{
    return dispatch=>{
        dispatch(authStart());
        
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyABcdVCDevTvo2j1_uDeKRQ6WWAmiznnpQ';
        
        if(!isSignUp){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyABcdVCDevTvo2j1_uDeKRQ6WWAmiznnpQ';
        }

        axios.post(url,authData)
            .then(response=>{
                console.log(response.data);
                dispatch(authSuccess(response.data))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(error=>{
                console.log(error.response.data.error.message);
                dispatch(authFailed(error.response.data.error.message));
            });
        
    };
};

export const authCheckState=()=>{
    return dispatch =>{
       const token = localStorage.getItem('token'); 
       if(!token){
           dispatch(logout());
       }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate')); 
            const UserId = localStorage.getItem('userId'); 
            if(expirationDate > new Date()){
                const exp = (expirationDate.getTime() - new Date().getTime())/1000;
                dispatch(authSuccess({idToken: token,localId:UserId,expiresIn:exp}));
                dispatch(checkAuthTimeout(exp));
            }else{
                dispatch(logout());
            }  
       }
    };
};

