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
                value: '',
                validation:{
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input', 
                elementConfig:{
                    type:'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },
            tel: {
                elementType: 'input', 
                elementConfig:{
                    type:'telephone',
                    placeholder: 'Telephone Number'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input', 
                elementConfig:{
                    type:'text',
                    placeholder: '124 Test Street Apt 1245'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 10,
                },
                valid: false,
                touched: false,
            },
            state: {
                elementType: 'input', 
                elementConfig:{
                    type:'text',
                    placeholder: 'State'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },
            zipCode: {
                elementType: 'input', 
                elementConfig:{
                    type:'number',
                    placeholder: 'ZipCode'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType: 'input', 
                elementConfig:{
                    type:'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation:{
                    required: true,
                },
                valid: false,
                touched: false,
            },
            deliveryMethod: {
                elementType: 'select', 
                elementConfig:{
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'normal', displayValue: 'Normal'},
                    ]
                },
                value: 'fastest',
                validation:{
                },
                valid: true,
            },
        },
        formIsValid: false,
        loading: false,
    }

    checkValidation(value,rules){
       let isValid = true;
       if(rules.required){
            isValid = value.trim() !== '' && isValid
       }

       if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid
       }

       if(rules.maxLength){
        isValid = value.length <= rules.maxLength && isValid
       }

       return isValid;
    }

    inputChangeHandler = (event,inputIdentifier) =>{
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updateFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }

        //Saving Value Entered
        updateFormElement.value = event.target.value;
        //Validating Form
        updateFormElement.valid = this.checkValidation(updateFormElement.value,updateFormElement.validation);
        updateFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updateFormElement;
        
        let formIsValid = true;
        for(let inputIdent in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdent].valid && formIsValid;
        }
        this.setState({orderForm:updatedOrderForm,formIsValid: formIsValid});
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

        


        let form = <Aux>
            <form onSubmit={this.placeOrderHandler}>
                <h4>Enter Shipping Information</h4>
                
                {formElementArray.map(element=>(
                    <Input 
                        key={element.id}
                        elementType={element.config.elementType} 
                        elementConfig={element.config.elementConfig}
                        value={element.config.value}
                        invalid={!element.config.valid}
                        shouldValidate={element.config.validation}
                        touched={element.config.touched} 
                        changed={(event)=>this.inputChangeHandler(event,element.id)}/>
                ))}
                <Button btntype="Success" disabled={!this.state.formIsValid}>ORDER</Button>
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