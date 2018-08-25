import React,{ Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
//import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{

    state = {
        loading:true,
        orders: [],
    }

    componentDidMount(){
        axios.get('/orders.json')
            .then(response => {
                const fetechOrders = [];
                for(let key in response.data){
                    fetechOrders.push({
                            ...response.data[key],
                            id: key
                        });
                }
                this.setState({loading:false,orders:fetechOrders});
            })
            .catch(error =>{
                this.setState({loading:false});
            });
    }

    render(){

        return(
            <div>
                {this.state.orders.map(order => (
                    <Order 
                        key={order.id} 
                        ingredients={order.ingredients}
                        price={order.price}/> 
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders,axios);