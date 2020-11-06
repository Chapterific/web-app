import "../styles/globals.css";
import { Auth0Provider } from "@auth0/auth0-react";

function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain="chapterific.eu.auth0.com"
      clientId="Iitf46uMtWldl9Orcg03ibtmeEkXlXWB"
      redirectUri="http://localhost:3000"
    >
      <Component {...pageProps} />
    </Auth0Provider>
  );
}

export default MyApp;
