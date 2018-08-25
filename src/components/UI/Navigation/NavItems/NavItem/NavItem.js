import React from 'react';
import classes from './NavItem.css';
import {NavLink} from 'react-router-dom';

const navItem = (props) => (
    <li className={classes.navItem}>
        <NavLink
            exact 
            to={props.link}
            activeClassName={classes.active}>
            {props.children}
        </NavLink>
    </li>
);

export default navItem;