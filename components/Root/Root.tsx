import React from "react";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { Container } from "@material-ui/core";
import { Layout } from "../Layout";
import { Login } from "../Login";
import { ReactQueryCacheProvider, QueryCache } from "react-query";

const queryCache = new QueryCache();

export const Root = ({ Component, pageProps }) => {
  return (
    <Auth0Provider
      domain="chapterific.eu.auth0.com"
      clientId="Iitf46uMtWldl9Orcg03ibtmeEkXlXWB"
      redirectUri={window.location.origin}
      audience="https://auth0-jwt-authorizer"
      scope="read:current_user update:current_user_metadata"
      useRefreshTokens={true}
    >
      <ReactQueryCacheProvider queryCache={queryCache}>
        <Container maxWidth="md">
          <Layout pageTitle="Chapterific" subTitle="It's terrific.">
            <Login>
              <Component {...pageProps} />
            </Login>
          </Layout>
        </Container>
      </ReactQueryCacheProvider>
    </Auth0Provider>
  );
};
