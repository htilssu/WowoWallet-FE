import {useNavigate, useSearchParams} from 'react-router-dom';
import {setCookie} from '../util/cookieUtil.js';

export const callBackUrl = '/sso/callback';

const CallBackHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('Token');
  if (token) {
    setCookie('Token', token);
  }
  navigate('/sign-in');
  return (
      <div/>
  );
};

export default CallBackHandler;