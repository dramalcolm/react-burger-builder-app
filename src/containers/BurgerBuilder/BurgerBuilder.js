import React,{Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/burger/burger';
import BuildControls from '../../components/burger/buildControls/buildControls';
import Modal from '../../components/UI/Modal/modal';
import OrderSummary from '../../components/burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 1.0,
    meat: 1.5,
    bacon: 1.0,
}


class BurgerBuilder extends Component{
    state = {
        ingredients:null,
        totalPrice: 5,
        purchasable: false,
        orderNow: false,
        loading: false,
        error: false,
    }

    componentDidMount(){
        axios.get('ingredients.json')
                .then(response=>{
                    this.setState({ingredients: response.data});
                })
                .catch(error=>{
                    this.setState({error: true});
                });
    }

    updatePurchaseState(Ingredients){
        const sum = Object.keys(Ingredients)
            .map(igKey =>{
                return Ingredients[igKey]
            })
            .reduce((sum,el)=>{
                return sum + el;
            },0);
        this.setState({purchasable: sum> 0});    
    }

    addIngredientHandler=(type)=>{
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice: newPrice,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler=(type)=>{
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updateCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({totalPrice: newPrice,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    orderNowHandler = () =>{
        this.setState({orderNow:true});
    }

    puchaseCancelHandler = () => {
        this.setState({orderNow:false});
    }

    puchaseContinueHandler= () => {
        //alert('Continue');
        this.setState({loading:true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice, //not a setup to using in production, should calculate on backend
            customer:{
                name: 'Douglas Malcolm',
                tel: '(876) 555-555',
                address: {
                    street: '124 Test Street Apt 1245',
                    state: 'New Test',
                    zipCode: '00000',
                    country: 'Jamaica'
                },
                email: 'test@test.com',
                deliveryMethod: 'fastest',
            }
        }
        axios.post('/orders.json',order)
            .then(response => {
                this.setState({loading:false,orderNow:false});
            })
            .catch(error =>{
                this.setState({loading:false,orderNow:false});
            });
    }


    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        

        let orderSummary = null;

        if(this.state.loading){
            orderSummary = <Spinner/>;
        }

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ingredientAdd={this.addIngredientHandler}
                        ingredientRemove={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        orderNow={this.orderNowHandler}/>
                </Aux>
            );

            orderSummary = <OrderSummary 
                    ingredients={this.state.ingredients}
                    puchaseCancel={this.puchaseCancelHandler}
                    puchaseContinue={this.puchaseContinueHandler}
                    totalprice = {this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder,axios);