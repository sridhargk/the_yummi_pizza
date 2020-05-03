import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Checkout from "./Checkout";
import Header from "./Header";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="main-app">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/checkout" component={Checkout} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
