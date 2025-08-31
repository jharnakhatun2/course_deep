import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../auth/UserContext';



interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute = ({children}: PrivateRouteProps) => {
    const {user, loading} = useAuth()
    const location = useLocation();
    
    if(loading){
        return <div>Loading.....</div>
    }

    if(user && user.uid){
        return children;
    }
    return <Navigate to='/login' state={{form : location}}replace></Navigate>
};

export default PrivateRoute;