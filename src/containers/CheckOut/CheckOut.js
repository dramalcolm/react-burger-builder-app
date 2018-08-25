import React,{ Component } from 'react';
import CheckOutSummary from '../../components/Order/CheckOutSummary';
import { Route} from 'react-router-dom';
import Shipping from '../CheckOut/Shipping/Shipping';

class CheckOut extends Component{
    state = {
        ingredients:[],
        totalprice: 0,
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const old_ingredients = {};
        let price = 0;
        for(let param of query.entries()){
            //['salad', '1']
            if(param[0] === 'price'){
                price = +param[1];
            }else{
                old_ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients: old_ingredients,totalprice:price});

        
    }

    CheckOutCancelHandler=()=>{
        this.props.history.goBack();
    }

    CheckOutContinueHandler = () =>{
        this.props.history.replace(this.props.match.url+'/shipping');
    }


    render(){

        //console.log(this.state.totalprice);

        return(
            <div>
                <CheckOutSummary ingredients={this.state.ingredients} 
                onCheckOutCancelled={this.CheckOutCancelHandler}
                onCheckOutContinue={this.CheckOutContinueHandler}/>

                
              <Route 
                    path={this.props.match.path+'/shipping'} 
                    render={(props)=>(<Shipping 
                        ingredients={this.state.ingredients} 
                        price={this.state.totalprice}
                        {...props}/>)} />

            </div>
        );
    }

}
export default CheckOut;