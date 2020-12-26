import React from "react";
import { BrowserRouter as Switch, Redirect } from "react-router-dom";
import RouteWithLayout from "./components/RouteWithLayout";
import { Minimal as MinimalLayout } from "./layout";
import { Admin as AdminLayout } from "./layout";
import SignIn from "./pages/SignIn/SignIn";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import ViewProduct from "./pages/ViewProduct/ViewProduct"

import AdminPage from "./pages/Admin/Admin"


const Routes = () => {
  return (
    <>
      <Switch>
        {/* <Route path="/" component= */}
        <RouteWithLayout
          path="/"
          component={Home} 
          exact
          layout={MinimalLayout}
        />
         <RouteWithLayout
          path="/about"
          component={About}
          exact
          layout={MinimalLayout}
        />
        <RouteWithLayout
          path="/contact"
          component={Contact}
          exact
          layout={MinimalLayout}
          />
        <RouteWithLayout
          path="/sign-in"
          component={SignIn}
          layout={MinimalLayout}
        />
        <RouteWithLayout
          path="/product/:id"
          component={ViewProduct}
          exact
          layout={MinimalLayout}
        />
        <RouteWithLayout
          path="/admin"
          component={AdminPage}
          exact
          layout={AdminLayout}
          protectedRoute
        />
      </Switch>
    </>
  );
};

export default Routes;
