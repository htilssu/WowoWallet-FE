import {createContext, useContext, useEffect, useState} from 'react';
import {getAuthByToken, removeToken} from '../../util/token.util.js';

const AuthContext = createContext({});
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = (props) => {
  const [auth, setAuth] = useState({
    user: getAuthByToken(),
  });

  function handleSetUser(user) {
    setAuth((prevAuth) => ({
      ...prevAuth,
      user: user,
    }));
  }


  useEffect(() => {
    console.log(123);
    if (!auth) {
      setAuth({
        user: null,
      });
    }
  }, [auth]);

  function handleLogout() {
    removeToken();
    setAuth({
      user: null,
    });
  }

  return (
      <AuthContext.Provider
          value={{
            user: auth.user,
            login: handleSetUser,
            logout: handleLogout,
          }}
      >
        {props.children}
      </AuthContext.Provider>
  );
};
