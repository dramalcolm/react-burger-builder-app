import React,{ Component } from 'react';
import Button from '../../../components/UI/Button/button';
import classes from './Shipping.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Aux from '../../../hoc/Aux/Aux';

class Shipping extends Component{
    state = {
        ingredients: [],
        customer:{
            name: '',
            tel: '',
            address: {
                street: '',
                state: '',
                zipCode: '',
                country: ''
            },
            email: '',
            deliveryMethod: '',
        },
        loading: false,
    }

    componentDidMount(){
        //console.log(this.props);
    }

    placeOrderHandler= () => {
        //alert('clicked');
        this.setState({loading:true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price, //not a setup to using in production, should calculate on backend
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
        let form = <Aux>
            <form>
                <h4>Enter Shipping Information</h4>
                <input type="text" name="name" placeholder="Your Name" />
                <input type="text" name="email" placeholder="Your Email" />
                <input type="text" name="telephone" placeholder="Your Telephone" />
                <input type="text" name="street" placeholder="Your Street" />
                <input type="text" name="state" placeholder="Your State" />
                <input type="text" name="zipcode" placeholder="Your Zipcode" />
                <input type="text" name="country" placeholder="Your Country" />
                <input type="text" name="deliveryMethod" placeholder="Delivery Option" />
                <Button btntype="Success" clicked={this.placeOrderHandler}>ORDER</Button>
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