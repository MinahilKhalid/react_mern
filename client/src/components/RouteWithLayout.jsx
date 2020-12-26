import React from "react";
import { Route } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { Redirect } from "react-router-dom";

const RouteWithLayout = (props) => {
  const { protectedRoute } = props;
  const { userData, isAuthenticated } = useUserContext();
  const { layout: Layout, component: Component, ...rest } = props;
  console.log("Path: ", { ...rest.path });


  return protectedRoute ? (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) return <Redirect to="/" />;
        // if (userData.user != undefined && userData.user.user_type != "admin") return <Redirect to="/" />;
        // if (isAuthenticated && { ...rest.path } === "/sign-in") return <Redirect to="/admin" />
        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  ) : (
    <Route
      {...rest}
      render={(props) => {
        // if (isAuthenticated) return <Redirect to="/" />;
        if (userData.user != undefined && userData.user.user_type === "admin") return <Redirect to="/admin" />
        if (isAuthenticated && { ...rest }.path === "/sign-in") return <Redirect to="/" />
        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};

export default RouteWithLayout;
