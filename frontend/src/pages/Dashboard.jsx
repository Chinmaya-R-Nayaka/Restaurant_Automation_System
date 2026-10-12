
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user, loading } = useAuth();

    if(loading){
        return <p>Loading dashboard...</p>;
    }
    if(!user){
        return <Navigate to="/login" replace />;
    }

    switch(user.role){
        case 'customer':
            return <Navigate to="/customer/dashboard" replace />;

        case 'sales_clerk':
            return <Navigate to="/clerk/dashboard" replace />;

        case 'manager':
            return <Navigate to="/manager/dashboard" replace />;

        default:
            return <Navigate to="/login" replace />;
    }
};

export default Dashboard;
