import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth.jsx';

const ProtectedLayout = () => {
  const {user} = useAuth();

  if (!user) {
    return <Navigate to="/sign-in" replace={true}/>;
  }

  return <Outlet/>;
};

export default ProtectedLayout;