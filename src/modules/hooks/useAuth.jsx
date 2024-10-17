import {createContext, useContext, useEffect, useState} from 'react';
import {getUser} from '../user/user.js';

const AuthContext = createContext({});
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = (props) => {
  const [auth, setAuth] = useState({
    user: null,
    isAuthenticate: false,
  });


  function handleSetUser(user) {
    setAuth((prevAuth) => ({
      ...prevAuth,
      user: user,
      isAuthenticate: true,
    }));
  }

  useEffect(() => {
    getUser().then(value => {
      setAuth(prevState => {
        return {
          ...prevState,
          user: value.data,
          isAuthenticate: true
        }
      })
    });
  }, []);

  function handleLogout() {
    localStorage.removeItem('token');
    setAuth({
      user: null,
      isAuthenticate: false,
    });
  }
  return (
      <AuthContext.Provider
          value={{user: auth.user, login: handleSetUser, logout: handleLogout, isAuthenticate: auth.isAuthenticate}}
      >
        {props.children}
      </AuthContext.Provider>
  );
};
