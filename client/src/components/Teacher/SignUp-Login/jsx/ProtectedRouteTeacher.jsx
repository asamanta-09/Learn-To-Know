import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import {toast} from 'react-toastify';

function ProtectedRouteTeacher({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/teachers/login" replace />;
  }
  try {
    const decoded = jwtDecode(token);
    if (decoded.role !== 'teacher') {
      toast.warning("Access denied..You don't have permission");
      return;
    }
    return children;
  } catch (err) {
    return <Navigate to="/teachers/login" replace />;
  }
}

export default ProtectedRouteTeacher;
