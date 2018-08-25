import React,{ Component } from 'react';
import Button from '../../../components/UI/Button/button';
import classes from './Shipping.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Aux from '../../../hoc/Aux/Aux';
import Input from '../../../components/UI/Input/Input';

class Shipping extends Component{
    state = {
        ingredients: [],
        orderForm:{
            name: {
                elementType: 'input', 
                elementConfig:{
                    type:'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            email: {
                elementType: 'input', 
                elementConfig:{
                    type:'email',
                    placeholder: 'Your Email'
                },
                value: ''
            },
            tel: {
                elementType: 'input', 
                elementConfig:{
                    type:'telephone',
                    placeholder: 'Telephone Number'
                },
                value: ''
            },
            street: {
                elementType: 'input', 
                elementConfig:{
                    type:'text',
                    placeholder: '124 Test Street Apt 1245'
                },
                value: ''
            },
            state: {
                elementType: 'input', 
                elementConfig:{
                    type:'text',
                    placeholder: 'State'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input', 
                elementConfig:{
                    type:'number',
                    placeholder: 'ZipCode'
                },
                value: ''
            },
            country: {
                elementType: 'input', 
                elementConfig:{
                    type:'text',
                    placeholder: 'Your Country'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select', 
                elementConfig:{
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'normal', displayValue: 'Normal'},
                    ]
                },
                value: ''
            },
        },
        loading: false,
    }

    componentDidMount(){
        //console.log(this.props);
    }

    inputChangeHandler = (event,inputIdentifier) =>{
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updateFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }

        updateFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updateFormElement;
        this.setState({orderForm:updatedOrderForm});
    }

    placeOrderHandler= (event) => {
        event.preventDefault();
        this.setState({loading:true});

        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price, //not a setup to using in production, should calculate on backend
            customer: formData,
        }
    
        axios.post('/orders.json',order)
            .then(response => {
                console.log(response);
                this.setState({loading:false});
                this.props.history.push('/');
            })
            .catch(error =>{
                this.setState({loading:false});
                console.log(error);
            });
        
    }

    render(){

        const formElementArray = [];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        //console.log(formElementArray);


        let form = <Aux>
            <form onSubmit={this.placeOrderHandler}>
                <h4>Enter Shipping Information</h4>
                
                {formElementArray.map(element=>(
                    <Input 
                        key={element.id}
                        elementType={element.config.elementType} 
                        elementConfig={element.config.elementConfig}
                        value={element.config.value} 
                        changed={(event)=>this.inputChangeHandler(event,element.id)}/>
                ))}
                <Button btntype="Success" >ORDER</Button>
            </form>
        </Aux>;

        if(this.state.loading){
            form = <Spinner/>;
        }

        return(
            <div className={classes.Shipping}>
                {form}
            </div>
        );
    }
}

export default Shipping;