import React, { Component } from 'react';
import Layout from './hoc/layout/layout';
//import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch} from 'react-router-dom';
//import ErrorPage from './components/UI/ErrorPage/ErrorPage';
import CheckOut from './containers/CheckOut/CheckOut';
import asyncComponent from './hoc/Async/Async';
//import Shipping from './containers/CheckOut/Shipping/Shipping';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

const AsyncNewPost = asyncComponent(()=> {
    return import('./containers/BurgerBuilder/BurgerBuilder');
});


class App extends Component {
  render() {
    return (
        <div>
          <Layout>
            <Switch>
              <Route exact path='/' render={()=><p>Home</p>}/>
              <Route path='/burger-builder' component={AsyncNewPost}/>
              <Route path='/checkout' component={CheckOut}/>
              <Route path='/orders' component={Orders}/>
              <Route path='/auth' component={Auth}/>
              <Route path='/logout' component={Logout}/>
              {/*<Route component={ErrorPage} />*/}
            </Switch>
          </Layout>
        </div>
    );
  }
}

export default App;
