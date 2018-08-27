import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import BackDrop from '../../BackDrop/backdrop';
import Aux from '../../../../hoc/Aux/Aux';

const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer,classes.Close];

    if(props.show){
        attachedClasses = [classes.SideDrawer,classes.Open];
    }

    return(
        <Aux>
            <BackDrop clicked={props.clicked} show={props.show} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;