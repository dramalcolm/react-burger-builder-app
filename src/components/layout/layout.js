import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './layout.css';
import ToolBar from '../UI/Navigation/Toolbar/ToolBar';

const layout = (props) => (
    <Aux>
        <ToolBar />
        <main className={classes.content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;