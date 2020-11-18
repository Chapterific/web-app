import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { Container } from "@material-ui/core";
import { Layout } from "../Layout";
import { Login } from "../Login";
import { ReactQueryCacheProvider, QueryCache } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import { AppStateProvider } from "../../hooks/useAppContext";

const queryCache = new QueryCache();

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
        <ReactQueryCacheProvider queryCache={queryCache}>
          <AppStateProvider>
            <Container>
              <Login>
                <Layout pageTitle="Chapterific" subTitle="It's terrific.">
                  <Component {...pageProps} />
                </Layout>
              </Login>
            </Container>
          </AppStateProvider>
          {process.env.NODE_ENV ? (
            <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
          ) : null}
        </ReactQueryCacheProvider>
      </Auth0Provider>
    </>
  );
};
