import {useNavigate, useSearchParams} from 'react-router-dom';
import {useEffect} from 'react';
import {ssoCallback} from '../modules/auth/auth.js';
import {setToken} from '../util/token.util.js';

export const callBackUrl = '/sso/callback';

const CallBackHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('Token');
  useEffect(() => {
    if (token) {
      try {
        setToken(token);
        ssoCallback().then();
        navigate('/');
      }
      catch (e) {
        navigate('/sign-in');
      }
    }
    else {
      navigate('/sign-in');
    }
  }, [navigate, token]);
  return (
      <div/>
  );
};

export default CallBackHandler;