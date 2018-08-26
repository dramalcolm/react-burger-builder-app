import React,{Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/burger/burger';
import BuildControls from '../../components/burger/buildControls/buildControls';
import Modal from '../../components/UI/Modal/modal';
import OrderSummary from '../../components/burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as burgerBuilderActions from '../../store/actions/index';
import {connect} from 'react-redux';

class BurgerBuilder extends Component{
    state = {
        orderNow: false,
    }

    componentDidMount(){
        this.props.onInitIngrdients();
        this.props.onInitIngredientsCost();
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
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;



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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingName)=>dispatch(burgerBuilderActions.addIngrdient(ingName)),
        onIngredientRemoved: (ingName)=>dispatch(burgerBuilderActions.removeIngrdient(ingName)),
        onInitIngrdients: ()=>dispatch(burgerBuilderActions.InitiIngredients()),
        onInitIngredientsCost: ()=>dispatch(burgerBuilderActions.InitIngredientsCost()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));