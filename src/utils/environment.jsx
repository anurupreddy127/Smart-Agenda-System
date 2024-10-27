export const getEnvVar = (name) => {
    const value = process.env[name];
    if (!value) {
      console.warn(`Environment variable ${name} is not defined`);
    }
    return value;
  };
  
  export const config = {
    auth0: {
      domain: getEnvVar('REACT_APP_AUTH0_DOMAIN'),
      clientId: getEnvVar('REACT_APP_AUTH0_CLIENT_ID'),
      audience: getEnvVar('REACT_APP_AUTH0_AUDIENCE'),
      redirectUri: getEnvVar('REACT_APP_AUTH0_REDIRECT_URI'),
    },
    api: {
      url: getEnvVar('REACT_APP_API_URL'),
    },
    env: getEnvVar('REACT_APP_ENV'),
    app: {
      baseUrl: getEnvVar('REACT_APP_BASE_URL'),
      callbackUrl: getEnvVar('REACT_APP_CALLBACK_URL'),
      logoutUrl: getEnvVar('REACT_APP_LOGOUT_URL'),
    }
  };