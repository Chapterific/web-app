import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";

export const Root = ({ Component, pageProps }) => {
  return (
    <>
      <Auth0Provider
        domain="chapterific.eu.auth0.com"
        clientId="Iitf46uMtWldl9Orcg03ibtmeEkXlXWB"
        redirectUri={window.location.origin}
        audience="https://auth0-jwt-authorizer"
        scope="read:current_user update:current_user_metadata"
        useRefreshTokens={true}
      >
        <Component {...pageProps} />
      </Auth0Provider>
    </>
  );
};
