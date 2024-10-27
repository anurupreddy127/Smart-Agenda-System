import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() => loginWithRedirect()}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
    >
      Log In with Auth0
    </button>
  );
};

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() => logout({ returnTo: window.location.origin })}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      Log Out
    </button>
  );
};

export const UserProfile = () => {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex items-center space-x-4">
      {user?.picture && (
        <img 
          src={user.picture} 
          alt={user.name} 
          className="h-10 w-10 rounded-full"
        />
      )}
      <div>
        <div className="font-medium text-gray-900">{user.name}</div>
        <div className="text-sm text-gray-500">{user.email}</div>
      </div>
    </div>
  );
};