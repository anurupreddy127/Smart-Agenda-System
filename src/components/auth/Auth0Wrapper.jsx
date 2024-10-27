import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import LoadingSpinner from '../common/LoadingSpinner';

export const Auth0Wrapper = ({ children }) => {
  const { isLoading, error } = useAuth0();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-red-500">Authentication error: {error.message}</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return <>{children}</>;
};

export default Auth0Wrapper;