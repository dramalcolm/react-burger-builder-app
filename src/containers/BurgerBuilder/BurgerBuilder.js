import React,{Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/burger/burger';
import BuildControls from '../../components/burger/buildControls/buildControls';
import Modal from '../../components/UI/Modal/modal';
import OrderSummary from '../../components/burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actionTypes from '../../store/actions';
import {connect} from 'react-redux';

class BurgerBuilder extends Component{
    state = {
        ingred_cost: null,
        orderNow: false,
        loading: false,
        error: false,
    }

    componentDidMount(){

        /*
        axios.get('ingredients.json')
            .then(response=>{
                this.setState({ingredients: response.data});
                
                //Get Ingredients Prices            
                axios.get('ingred_cost.json')
                .then(response=>{
                    this.setState({ingred_cost: response.data});
                    this.updateDefaultCost();
                })
                .catch(error=>{
                    this.setState({error: true});
                });

            })
            .catch(error=>{
                this.setState({error: true});
            });
        */
    }
    /*
    updateDefaultCost(){
        const defaultPriceQuote = {
            ...this.state.ingredients
        };
        let defaultNewPrice = 0;
        for(let key in defaultPriceQuote){
            if(defaultPriceQuote[key] !== 0){
                defaultNewPrice += this.state.ingred_cost[key];
            }
        }
          
        this.setState({totalPrice: defaultNewPrice+this.state.totalPrice}); 
        this.updatePurchaseState(defaultPriceQuote); 
    }
    */
    updatePurchaseState(Ingredients){
        const sum = Object.keys(Ingredients)
            .map(igKey =>{
                return Ingredients[igKey]
            })
            .reduce((sum,el)=>{
                return sum + el;
            },0);
        return sum > 0; 
    }

    orderNowHandler = () =>{
        this.setState({orderNow:true});
    }

    puchaseCancelHandler = () => {
        this.setState({orderNow:false});
    }

    puchaseContinueHandler= () => {
        this.props.history.push('/checkout');
    }


    render(){
        const disabledInfo = {
            ...this.props.ings
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        

        let orderSummary = null;

        if(this.state.loading){
            orderSummary = <Spinner/>;
        }

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
        if(this.props.ings){ 

            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ingredientAdd={this.props.onIngredientAdded}
                        ingredientRemove={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        orderNow={this.orderNowHandler}/>
                </Aux>
            );

            orderSummary = <OrderSummary 
                    ingredients={this.props.ings}
                    puchaseCancel={this.puchaseCancelHandler}
                    puchaseContinue={this.puchaseContinueHandler}
                    totalprice = {this.props.price}
                    />;
        }

        return(
            <Aux>
                <Modal show={this.state.orderNow} ModalClosed={this.puchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }

}

const mapStateToProps = state => {
    return{
        ings: state.ingredients,
        price: state.totalPrice,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingName)=>dispatch({type: actionTypes.ADD_INGREDIENT, IngredientName:ingName}),
        onIngredientRemoved: (ingName)=>dispatch({type: actionTypes.REMOVE_INGREDIENT, IngredientName:ingName}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));