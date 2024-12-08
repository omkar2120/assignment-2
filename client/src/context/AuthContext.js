

import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const decodeToken = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(window.atob(base64)); // Decode the payload part of the JWT
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const isTokenExpired = (token) => {
    const decodedToken = decodeToken(token);
    if (decodedToken) {
      const currentTime = Date.now() / 1000; 
      return decodedToken.exp < currentTime; 
    }
    return true; 
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token && !isTokenExpired(token)) {
      const decodedToken = decodeToken(token);
      setUser(decodedToken); 
    } else {
      localStorage.removeItem("token"); 
      setUser(null);
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }
  }, []); 

  const login = (token) => {
    localStorage.setItem("token", token);
    const decodedToken = decodeToken(token);
    setUser(decodedToken); 
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    if (window.location.pathname !== "/") {
      window.location.href = "/";
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

