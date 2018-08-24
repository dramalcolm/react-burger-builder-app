import React from 'react';
import classes from './NavItem.css';
import {NavLink} from 'react-router-dom';

const navItem = (props) => (
    <li className={classes.navItem}>
        <NavLink to={props.link}  className={props.active ? classes.active : null}>
            {props.children}
        </NavLink>
    </li>
);

export default navItem;