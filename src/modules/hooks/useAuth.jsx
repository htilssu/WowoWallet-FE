import {createContext, useContext, useEffect, useState} from 'react';
import {getUser} from '../user/user.js';

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = (props) => {
  const [auth, setAuth] = useState({
    user: {},
    isAuthenticate: false,
  });


  function handleSetUser(user) {
    setAuth((prevAuth) => ({
      ...prevAuth,
      user: user,
      isAuthenticate: true,
    }));
  }

  console.log(auth);
  useEffect(() => {
    getUser().then(value => {
      console.log(value);
      setAuth(prevState => {
        return {
          ...prevState,
          user: value.data,
          isAuthenticate: true
        }
      })
    });
  }, []);


  function reloadUser() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        getUser().then(value => {
          setAuth({
            ...auth,
            user: value.data.user,
          });
        });

      } catch (e) {
        console.log(e);
      }
    }
  }

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
