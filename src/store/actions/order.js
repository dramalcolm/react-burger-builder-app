import * as actionTypes from './actionTypes';
import axios from '../../axios-order';


export const purchaseBurgerSuccess = (id, orderData) => {
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFailed = (error) => {
    return{
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    };
};

export const purchaseBurgerStart =()=>{
    return{
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData) => {
    return dispatch=>{
        
        dispatch(purchaseBurgerStart());

        axios.post('/orders.json',orderData)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name,orderData))
        })
        .catch(error =>{
            dispatch(purchaseBurgerFailed(error));
        });
    };
};

export const purchaseInit=()=>{
    return{
        type: actionTypes.PURCHASE_INIT
    };
};

//------

export const fetchOrderSuccess=(orders)=>{
    return{
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    };
};

export const fetchOrderFailed=(error)=>{
    return{
        type: actionTypes.FETCH_ORDER_FAILED,
        error: error
    };
};

export const fetchOrderStart=()=>{
    return{
        type: actionTypes.FETCH_ORDER_START,
    };
}

export const fetchOrders=()=>{
    return dispatch=>{

        dispatch(fetchOrderStart());

        axios.get('/orders.json')
            .then(response => {
                const fetchOrders = [];
                for(let key in response.data){
                    fetchOrders.push({
                            ...response.data[key],
                            id: key
                        });
                }
                dispatch(fetchOrderSuccess(fetchOrders));
            })
            .catch(error =>{
                dispatch(fetchOrderFailed(error));
            });
    };
};