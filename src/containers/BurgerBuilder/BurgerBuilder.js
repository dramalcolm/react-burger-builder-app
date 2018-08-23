import React,{Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/burger/burger';
import BuildControls from '../../components/burger/buildControls/buildControls';
import Modal from '../../components/UI/Modal/modal';
import OrderSummary from '../../components/burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component{
    state = {
        ingredients:null,
        ingred_cost: null,
        totalPrice: 4.00,
        purchasable: false,
        orderNow: false,
        loading: false,
        error: false,
    }

    componentDidMount(){
        axios.get('ingredients.json')
                .then(response=>{
                    this.setState({ingredients: response.data});
                    this.updateDefaultCost();
                })
                .catch(error=>{
                    this.setState({error: true});
                });
        axios.get('ingred_cost.json')
                .then(response=>{
                    this.setState({ingred_cost: response.data});
                    this.updateDefaultCost();
                })
                .catch(error=>{
                    this.setState({error: true});
                });
    }

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

        const priceAddition = this.state.ingred_cost[type];
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

        const priceDeduction = this.state.ingred_cost[type];
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
        if(this.state.ingredients && this.state.ingred_cost){ 

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