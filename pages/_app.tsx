import "../styles/globals.css";
import { createMuiTheme, ThemeProvider, colors } from "@material-ui/core";
import dynamic from "next/dynamic";
import { ThemeProvider as StyleProvider } from "styled-components";
import React from "react";

const NoSSRComponent = dynamic(() => import("../components/Root"), {
  ssr: false,
});

type PaletteType = "light" | "dark";

function MyApp({ Component, pageProps }) {
  const [paletteType] = React.useState<PaletteType>("dark");

  // (Sean Rivard-Morton) [2020-11-09] TODO:
  // Add functionality to toggle themes. preferrably from settings or a navbar
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
        <NoSSRComponent Component={Component} pageProps={pageProps} />
      </StyleProvider>
    </ThemeProvider>
  );
}

export default MyApp;
