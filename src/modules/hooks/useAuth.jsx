import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext({});
export const useAuth = () => useContext(Context);
export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isAuthenticate, setIsAuthenticate] = useState(true)

  function handleSetUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setIsAuthenticate(true)
  }

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticate(false)
  }

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  return (
    <Context.Provider
      value={{ user, login: handleSetUser, logout: handleLogout, isAuthenticate }}
    >
      {props.children}
    </Context.Provider>
  );
};
