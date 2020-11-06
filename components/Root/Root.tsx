import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";

export const Root = ({ Component, pageProps }) => {
  return (
    <>
      <Auth0Provider
        domain="chapterific.eu.auth0.com"
        clientId="Iitf46uMtWldl9Orcg03ibtmeEkXlXWB"
        redirectUri={window.location.origin}
      >
        <Component {...pageProps} />
      </Auth0Provider>
    </>
  );
};
