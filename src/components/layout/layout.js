import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './layout.css';

const layout = (props) => (
    <Aux>
        <div>Toolbar, SideDrawer, BackDrop</div>
        <main className={classes.content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;