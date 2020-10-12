import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginScreen } from "@/screens/LoginScreen";
import { CurrencyScreen } from "@/screens/CurrencyScreen";
import { NotFoundScreen } from "@/screens/NotFoundScreen";
import { ReduxScreen } from "@/screens/ReduxScreen";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Provider } from "react-redux";
import { store } from "@/rdx/store";

export const App: React.FC<{}> = () => (
  <Provider store={store}>
    <ErrorBoundary>
      <Router>
        <Switch>
          <Route path="/login">
            <LoginScreen />
          </Route>
          <Route exact path="/">
            <CurrencyScreen />
          </Route>
          <Route path="/redux">
            <ReduxScreen />
          </Route>
          <Route path="*">
            <NotFoundScreen />
          </Route>
        </Switch>
      </Router>
    </ErrorBoundary>
  </Provider>
);
