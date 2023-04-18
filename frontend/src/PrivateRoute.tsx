import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  path: string;
  component: React.ComponentProps<any>;
  isAuthenticated: boolean;
}

function PrivateRoute(props: PrivateRouteProps) {

  return props.isAuthenticated ?
    props.component : <Navigate replace={true} to="/login" />;
}

export default PrivateRoute;
