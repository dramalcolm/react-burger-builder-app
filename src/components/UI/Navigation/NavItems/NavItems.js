import React from 'react';
import classes from './NavItems.css';
import NavItem from './NavItem/NavItem';

const navItems = (props) => (
    <ul className={classes.navItems}>
        <NavItem link="/">Home</NavItem>
        
        <NavItem link="/burger-builder">Burger Builder</NavItem>
        
        <NavItem link="/checkout">Checkout</NavItem>
        {props.isAuthenticated 
            ? <NavItem link="/orders">Orders</NavItem>
            : null }
        {props.isAuthenticated 
            ? <NavItem link="/logout">Logout</NavItem>
            : <NavItem link="/auth">Sign In</NavItem>}
    </ul>
);

export default navItems;