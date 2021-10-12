import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory } from "react-router";

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

import App from "./containers/AppContainer";
import "./index.css";

const middleware = applyMiddleware(
  thunk
  // , createLogger()
);
export const store = createStore(rootReducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="/:catA" component={App} />
        <Route path="/:catA/:catB" component={App} />
        <Route path="/:catA/:catB/:catC" component={App} />
        <Route path="/:catA/:catB/:catC/:catD" component={App} />
        <Route path="/:catA/:catB/:catC/:catD/:catE" component={App} />
        <Route path="/search/:searchVal" component={App} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);
