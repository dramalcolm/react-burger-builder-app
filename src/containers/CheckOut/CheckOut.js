import React,{ Component } from 'react';
import CheckOutSummary from '../../components/Order/CheckOutSummary';
import { Route, Redirect} from 'react-router-dom';
import Shipping from '../CheckOut/Shipping/Shipping';
import {connect} from 'react-redux';


class CheckOut extends Component{


    CheckOutCancelHandler=()=>{
        this.props.history.goBack();
    }

    CheckOutContinueHandler = () =>{
        this.props.history.replace(this.props.match.url+'/shipping');
    }


    render(){

        let summary = <Redirect to="/burger-builder" />

        if(this.props.ings){
            summary = (
                <div>
                    <CheckOutSummary ingredients={this.props.ings} 
                    onCheckOutCancelled={this.CheckOutCancelHandler}
                    onCheckOutContinue={this.CheckOutContinueHandler}/>

                    <Route 
                            path={this.props.match.path+'/shipping'} 
                            component={Shipping} />
                </div>
            );

        }

        return summary;
    }

}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
    }
}

export default connect(mapStateToProps)(CheckOut);