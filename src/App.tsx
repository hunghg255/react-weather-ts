import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import City from "./pages/City";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/404" component={NotFound} />
            <Route path="/:city" component={City} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
