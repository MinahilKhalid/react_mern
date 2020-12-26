import React, { useState, createContext, useEffect, useContext } from 'react';
import axios from 'axios'

export const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

const UserContextProvider = (props) => {
  const [products, setProducts] = useState();
  const [page, setPage] = useState("products");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  })

  useEffect(() => {
    const isLoggedIn = async () => {
      let getToken = localStorage.getItem('api-auth-token')
      if (getToken === null) {
        localStorage.setItem("api-auth-token", "")
        getToken = ""
      }
      const user = await axios.get(`${process.env.REACT_APP_API_URL}/user`, { headers: { "x-auth-token": getToken } })
      setIsAuthenticated(true)
      setUserData({
        user: user.data,
        token: getToken
      })
    }
    isLoggedIn();
  }, [])


  return (
    <UserContext.Provider value={{ userData, isAuthenticated, products, page, setPage, setProducts, setIsAuthenticated, setUserData }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
