import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSignUp = () => {
    loginWithRedirect({
      appState: { returnTo: "/dashboard" },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  const handleLogin = () => {
    loginWithRedirect({
      appState: { returnTo: "/dashboard" },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Event Automator
        </h1>
        <h2 className="mt-2 text-2xl font-bold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Secure authentication powered by Auth0
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <button
            onClick={handleSignUp}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 mb-4"
            aria-label="Sign Up"
          >
            Sign Up
          </button>

          <button
            onClick={handleLogin}
            className="w-full flex justify-center py-2 px-4 border border-primary-600 rounded-md shadow-sm text-sm font-medium text-primary-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            aria-label="Log In"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
