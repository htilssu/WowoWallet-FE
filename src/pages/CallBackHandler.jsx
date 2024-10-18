import {useNavigate, useSearchParams} from 'react-router-dom';
import {setCookie} from '../util/cookie.util.js';
import {useEffect} from 'react';
import {ssoCallback} from '../modules/auth/auth.js';

export const callBackUrl = '/sso/callback';

const CallBackHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('Token');
  useEffect(() => {
    if (token) {
      try {
        setCookie('Token', token, 60 * 60 * 24 * 7);
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