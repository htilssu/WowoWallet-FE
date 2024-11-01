import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth.jsx';
import LoadingPageSkeleton from '../../../components/LoadingPageSkeleton.jsx';

const ProtectedLayout = () => {
  const {user, loading} = useAuth();

  if (loading) {
    return <LoadingPageSkeleton/>;
  }

  if (!user) {
    return <Navigate to="/sign-in" replace={true}/>;
  }

  return <Outlet/>;
};

export default ProtectedLayout;