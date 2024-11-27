import {createContext, useContext, useEffect, useState} from 'react';
import {getToken, removeToken} from '../../util/token.util.js';
import {getUser} from '../user/user.js';
import {removeCookie, setCookie} from '../../util/cookie.util.js';
import {Modal} from '@mantine/core';
import {useLocalStorage} from '@mantine/hooks';
import {startRegistration} from '@simplewebauthn/browser';

const AuthContext = createContext({});
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = (props) => {
  const [auth, setAuth] = useState({
    user: null,
  });
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [webauthn, setWebAuthn] = useLocalStorage({
    defaultValue: {},
    deserialize: JSON.parse,
    serialize: JSON.stringify,
    key: 'webauthn',
  });

  useEffect(() => {
    removeCookie('userId');
    if (getToken() !== null) {
      getUser().then((user) => {
        setCookie('userId', user.id, 9999999);
        setAuth({
          user: user,
        });
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    }
  }, []);

  useEffect(() => {

    const ressp = fetch('https://sso.htilssu.id.vn/v1/generate-auth', {
      method: 'GET',
      credentials: 'include',
    });

    ressp.then(async (res) => {
      if (!res.ok){
        const resp = fetch('https://sso.htilssu.id.vn/v1/generate-registration', {
          method: 'GET',
          credentials: 'include',
        });

        resp.then(async (res) => {
          const data = await startRegistration({optionsJSON: await res.json()});
          await fetch('https://sso.htilssu.id.vn/v1/verify-registration', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(data),
          });
        });
      }
      const data = await res.json();
      setWebAuthn(JSON.stringify(data));
    });
    
  }, [auth, setWebAuthn]);

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
        <Modal opened={isOpen} onClose={() => {
          setIsOpen(false);
        }}>

        </Modal>
      </AuthContext.Provider>
  );
};
