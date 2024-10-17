import {useNavigate, useSearchParams} from 'react-router-dom';
import {setCookie} from '../util/cookie.util.js';
import {useEffect} from 'react';

export const callBackUrl = '/sso/callback';

const CallBackHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('Token');
  useEffect(() => {
    if (token) {
      try {
        setCookie('Token', token);
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