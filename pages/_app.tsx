import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  console.log("test");
  return <Component {...pageProps} />;
}

export default MyApp;
