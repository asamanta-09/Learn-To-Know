import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'

function ProtectedRouteAdmin({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/admins/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    if (decoded.role !== 'admin') {
      return <Navigate to="/admins/login" replace />;
    }
    return children;
  } catch (err) {
    console.error("Invalid token:", err);
    return <Navigate to="/admins/login" replace />;
  }
}

export default ProtectedRouteAdmin;
