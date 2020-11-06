import "../styles/globals.css";
import { Auth0Provider } from "@auth0/auth0-react";
import dynamic from "next/dynamic";

const NoSSRComponent = dynamic(() => import("../components/Root"), {
  ssr: false,
});

function MyApp({ Component, pageProps }) {
  // (Sean Rivard-Morton) [2020-11-06] Need to disable SSR for this route for
  // auth0 redirect. Not that it matters, as we're exporting a static application anyway.
  return <NoSSRComponent Component={Component} pageProps={pageProps} />;
}

export default MyApp;
