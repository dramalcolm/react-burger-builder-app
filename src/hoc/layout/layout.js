import React,{ Component} from 'react';
import Aux from '../Aux/Aux';
import classes from './layout.css';
import ToolBar from '../../components/UI/Navigation/Toolbar/ToolBar';
import SideDrawer from '../../components/UI/Navigation/SideDrawer/SideDrawer';

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
            <ToolBar menuclicked={this.sideDrawertogglerHandler}/>
            <SideDrawer clicked={this.sideDrawertogglerHandler} show={this.state.showSideDrawer}/>
            <main className={classes.content}>
                {this.props.children}
            </main>
        </Aux>
        );
    }
}

export default Layout;