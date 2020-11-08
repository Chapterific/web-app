import "../styles/globals.css";
import { createMuiTheme, ThemeProvider, Button } from "@material-ui/core";
import dynamic from "next/dynamic";
import styled, { ThemeProvider as StyleProvider } from "styled-components";

const NoSSRComponent = dynamic(() => import("../components/Root"), {
  ssr: false,
});

const AppBackground = styled.div`
  ${({ theme }) => `
    background-color:  ${theme.palette.background.default};
    height: 100vh;
  `}
`;

function MyApp({ Component, pageProps }) {
  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  // (Sean Rivard-Morton) [2020-11-06] Need to disable SSR for this route for
  // auth0 redirect. Not that it matters, as we're exporting a static application anyway.
  return (
    <ThemeProvider theme={theme}>
      <StyleProvider theme={theme}>
        <AppBackground>
          <NoSSRComponent Component={Component} pageProps={pageProps} />
        </AppBackground>
      </StyleProvider>
    </ThemeProvider>
  );
}

export default MyApp;
