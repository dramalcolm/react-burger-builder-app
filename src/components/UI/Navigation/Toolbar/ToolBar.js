import React from 'react';
import classes from './ToolBar.css';
import Logo from '../../../Logo/Logo';
import NavItems from '../../../UI/Navigation/NavItems/NavItems';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div 
            className={classes.DrawerToggle} 
            onClick={props.menuclicked}>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavItems />
        </nav>
    </header>
);

export default toolbar;