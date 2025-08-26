import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import {toast} from 'react-toastify';

function ProtectedRouteStudent({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/students/login" replace />;
  }
  try {
    const decoded = jwtDecode(token);
    if (decoded.role !== 'student') {
      toast.warning("Access denied..You don't have permission");
      return;
    }
    return children;
  } catch (err) {
    return <Navigate to="/students/login" replace />;
  }
}

export default ProtectedRouteStudent;
