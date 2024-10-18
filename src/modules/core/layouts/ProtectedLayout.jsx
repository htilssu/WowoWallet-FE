import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth.jsx';

const ProtectedLayout = () => {
  const {isAuthenticate} = useAuth();

  if (!isAuthenticate) {
    console.log(123);
    return <Navigate to="/sign-in" replace={true}/>;
  }

  return <Outlet/>;
};

export default ProtectedLayout;