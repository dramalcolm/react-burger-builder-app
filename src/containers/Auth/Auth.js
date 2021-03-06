import React,{Component} from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';

import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';


class Auth extends Component{

    state = {
        controls: {
            email: {
                elementType: 'input', 
                elementConfig:{
                    type:'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input', 
                elementConfig:{
                    type:'password',
                    placeholder: 'Password'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            }
        },
        isSignUp: false,
    }

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/burger-builder'){
            this.props.onSetAuthRedirectPath(this.props.authRedirectPath )
        }
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
 
        if (rules.isEmail) {
         const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
         isValid = pattern.test(value) && isValid
         }
 
         if (rules.isNumeric) {
             const pattern = /^\d+$/;
             isValid = pattern.test(value) && isValid
         }
 
 
        return isValid;
     }

     inputChangeHandler = (event,controlName) =>{
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidation(event.target.value,this.state.controls[controlName].validation),
                touched: true,
            }
        }
        this.setState({controls: updatedControls});
    }

    submitHandler=(event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchAuthModeHandler=()=>{
        this.setState(prevState=>{
            return{isSignUp: !prevState.isSignUp}
        });
    }

    render(){

        const formElementArray = [];
        for(let key in this.state.controls){
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementArray.map(element=>(
                <Input 
                    key={element.id}
                    elementType={element.config.elementType} 
                    elementConfig={element.config.elementConfig}
                    value={element.config.value}
                    invalid={!element.config.valid}
                    shouldValidate={element.config.validation}
                    touched={element.config.touched} 
                    changed={(event)=>this.inputChangeHandler(event,element.id)}/>  
            ));
        
            if(this.props.loading){
                form = <Spinner />
            }

            let errorMessage = null;
            if(this.props.error){
                errorMessage = (<p style={{color: '#f00'}}>{this.props.error}</p>);
            }

            let successFullLogIn = null;
            if(this.props.isAuthenticated){
                successFullLogIn = <Redirect to={this.props.authRedirectPath}/>
            }

        return(
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {successFullLogIn}
                    {errorMessage}
                    {form}
                    <Button btntype="Success">SUBMIT</Button>
                </form>
                <Button 
                    clicked={this.switchAuthModeHandler}
                    btntype="Danger">SWITCH TO {this.state.isSignUp ? 'SIGNUP' : 'SIGNIN'}</Button>
            </div>
        );
    }

}

const mapStateToProps =state=>{
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null, //from auth reducer
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onAuth: (email, password, isSignUp)=>dispatch(actions.auth(email, password,isSignUp)),
        onSetAuthRedirectPath: (path)=>dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(Auth);