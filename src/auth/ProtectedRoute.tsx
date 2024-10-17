import { checkTokenValidity } from '@/lib/checkTokenValidity';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const isValid = checkTokenValidity();

  if (!isValid) {
    return (
      <Navigate
        to='/login'
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return children;
};
