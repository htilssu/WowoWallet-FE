import {useNavigate, useSearchParams} from 'react-router-dom';
import {setCookie} from '../util/cookieUtil.js';

export const callBackUrl = '/sso/callback';

const CallBackHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('Token');
  if (token) {
    try {
      setCookie('Token', token);
      navigate('/')
    } catch (e) {
      navigate('/sign-in')
    }
  }
  navigate('/sign-in');
  return (
      <div/>
  );
};

export default CallBackHandler;