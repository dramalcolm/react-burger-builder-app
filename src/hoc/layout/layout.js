import React,{ Component} from 'react';
import Aux from '../Aux/Aux';
import classes from './layout.css';
import ToolBar from '../../components/UI/Navigation/Toolbar/ToolBar';
import SideDrawer from '../../components/UI/Navigation/SideDrawer/SideDrawer';

import {connect} from 'react-redux';

class Layout extends Component{
    state = {
        showSideDrawer: false
    }

    sideDrawertogglerHandler = () =>{
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render(){
        return(
            <Aux>
            <ToolBar menuclicked={this.sideDrawertogglerHandler} isAuth={this.props.isAuthenticated}/>
            <SideDrawer clicked={this.sideDrawertogglerHandler} show={this.state.showSideDrawer} isAuth={this.props.isAuthenticated}/>
            <main className={classes.content}>
                {this.props.children}
            </main>
        </Aux>
        );
    }
}
const mapStateToProps = state =>{
    return {
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout);