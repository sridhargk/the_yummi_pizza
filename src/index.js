import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import reducers from "./reducers";
import { save, load } from "redux-localstorage-simple";

const createStoreWithMiddleware = applyMiddleware(save())(createStore);

const store = createStoreWithMiddleware(reducers, load());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
