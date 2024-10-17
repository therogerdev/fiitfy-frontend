import { Navigate, useLocation } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!token) {
    // Pass only the pathname to avoid the cloning error
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}
