import {createContext, useContext, useEffect, useState} from 'react';
import {removeToken} from '../../util/token.util.js';
import {getUser} from '../user/user.js';

const AuthContext = createContext({});
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = (props) => {
  const [auth, setAuth] = useState({
    user: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser().then((user) => {
      setAuth({
        user: user,
      });
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  function handleSetUser(user) {
    setAuth((prevAuth) => ({
      ...prevAuth,
      user: user,
    }));
  }

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
            loading,
          }}
      >
        {props.children}
      </AuthContext.Provider>
  );
};
