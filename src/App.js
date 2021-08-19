import React from "react";
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./config/routes";
import AuthProvider from "./providers/AuthProvider";
import AuthReduxProvider from "./providers/AuthReduxProvider";

import "./App.scss";

function App() {
  return (
    //<AuthProvider>
    <AuthReduxProvider>
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <RouteWithSubRoutes key={index} {...route} />
          ))}
        </Switch>
      </Router>
    </AuthReduxProvider>
    //</AuthProvider>
  );
}

//Si queremos que una función sea un componente, Escribir primera Mayuscula, si queremos que la función sea un hook, con minuscula.
//Render funciona para cuando queremos pasar más de un componente para renderizar, en este caso mejor usar render.
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component routes={route.routes} {...props} />}
    />
  );
}

export default App;
