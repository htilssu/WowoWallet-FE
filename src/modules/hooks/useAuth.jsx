import {createContext, useContext, useEffect, useState} from 'react';
import {getAuthByToken, removeToken} from '../../util/token.util.js';

const AuthContext = createContext({});
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = (props) => {
  const [auth, setAuth] = useState({
    user: getAuthByToken(),
    isAuthenticate: true,
  });

  function handleSetUser(user) {
    setAuth((prevAuth) => ({
      ...prevAuth,
      user: user,
      isAuthenticate: true,
    }));
  }

  useEffect(() => {
    if (!auth.user) {
      setAuth({
        user: null,
        isAuthenticate: false,
      });
    }
  }, [auth]);

  function handleLogout() {
    removeToken();
    setAuth({
      user: null,
      isAuthenticate: false,
    });
  }

  return (
      <AuthContext.Provider
          value={{
            user: auth.user,
            login: handleSetUser,
            logout: handleLogout,
            isAuthenticate: auth.isAuthenticate,
          }}
      >
        {props.children}
      </AuthContext.Provider>
  );
};
