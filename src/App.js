import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import CheckoutPage from "./CheckoutPage";
import HeaderComponent from "./HeaderComponent";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="main-app">
          <HeaderComponent />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/checkout" component={CheckoutPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
