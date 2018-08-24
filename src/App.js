import React, { Component } from 'react';
import Layout from './hoc/layout/layout';
//import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ErrorPage from './components/UI/ErrorPage/ErrorPage';
import CheckOut from './containers/CheckOut/CheckOut';
import asyncComponent from './hoc/Async/Async';

const AsyncNewPost = asyncComponent(()=> {
    return import('./containers/BurgerBuilder/BurgerBuilder');
});


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Layout>
            <Switch>
              <Route exact path='/' render={()=><p>Home</p>}/>
              <Route path='/burger-builder' component={AsyncNewPost}/>
              <Route path='/checkout' component={CheckOut}/>
              <Route component={ErrorPage} />
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
