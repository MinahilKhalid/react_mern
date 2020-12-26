import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import history from './utils/history'
import "./App.css";
import Routes from "./Routes";
import UserContextProvider, { useUserContext } from './context/UserContext'

const App = () => {

  return (
    <>
      <UserContextProvider>
        <Router history={history}>
          <Routes />
        </Router>
      </UserContextProvider>
    </>

  )
};

export default App;
