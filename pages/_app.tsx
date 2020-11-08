import "../styles/globals.css";
import {
  createMuiTheme,
  ThemeProvider,
  Button,
  colors,
} from "@material-ui/core";
import dynamic from "next/dynamic";
import styled, { ThemeProvider as StyleProvider } from "styled-components";
import React from "react";

const NoSSRComponent = dynamic(() => import("../components/Root"), {
  ssr: false,
});

const AppBackground = styled.div`
  ${({ theme }) => `
    background-color: ${theme.palette.background.default};
    height: 100vh;
  `}
`;

type PaletteType = "light" | "dark";

function MyApp({ Component, pageProps }) {
  const [paletteType, setPaletteType] = React.useState<PaletteType>("dark");
  const theme = createMuiTheme({
    palette: {
      type: paletteType,
      primary: {
        main: colors.red["A700"],
      },
      secondary: {
        main: colors.cyan["A400"],
      },
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
