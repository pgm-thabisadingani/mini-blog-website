import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // JSON.parse data from a string to an object
  // get log in user from local storage else no use logged is
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (input) => {
    //taking in inputs and making an API request
    const res = await axios.post("/auth/login", input);
    setCurrentUser(res.data);
  };

  const logout = async (input) => {
    //taking in inputs and making an API request
    await axios.post("/auth/logout");
    setCurrentUser(null);
  };

  //from a object to string
  // update the localStorage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  // double coz its a prop thus {{}}
  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
