import React,{ Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component{

    state = {
        loading:true,
        orders: [],
    }

    componentDidMount(){
        axios.get('/orders.json')
            .then(response => {
                this.setState({loading:false,orders:response.data});
            })
            .catch(error =>{
                this.setState({loading:false});
            });
    }

    render(){
        
        let trans_ingredients = Object.keys(this.state.orders)
        .map(igKey => {
            return (
                {
                    in: this.state.orders[igKey]['ingredients'],
                    price: this.state.orders[igKey]['price']
                }
            );
        }).reduce((arr,el)=>{
            return arr.concat(el)
        },[]);
        

        let orders = Object.keys(trans_ingredients).map(igkey=>{
            return <Order 
            key={igkey} 
            ingredients={trans_ingredients[igkey]['in']} 
            price={trans_ingredients[igkey]['price']}/>
        });

        if(this.state.loading){
            orders = <Spinner/>;
        }

        return(
            <div>
                {orders}
            </div>
        );
    }
}

export default Orders;