import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import './App.css';
import Header from './Common/Header';
import Home from './Pages/Home';
// import Products from './Products';
import CoffeeDetails from './Pages/CoffeeDetails';
import store, { history } from "../store";

const App = () => (
  // <Provider store={store}>
  //   <BrowserRouter>
  //     <div className="container">
  //       {/* <Header /> */}
  //       <Switch>
  //         <Route exact path="/" component={Home} />
  //         <Route path="/coffees/:id" component={CoffeeDetails} />
  //         <Redirect to="/" />
  //       </Switch>
  //     </div>
  //   </ BrowserRouter>
  // </Provider>

  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className='app-container'>
          <Route exact path='/' component={Home} />
          <Route path='/coffees/:id' component={CoffeeDetails} />
          <Redirect to="/" />
      </div>
    </ConnectedRouter>
  </Provider>
)

export default App;