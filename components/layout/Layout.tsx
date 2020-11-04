import React from "react";
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from "@material-ui/core/styles";
import { ThemeProvider } from "styled-components";
import { Container } from "@material-ui/core";
import styled from "styled-components";

const StyledContainer = styled.div`
  ${({ theme }) => `
  background-color: ${theme.palette.background.default};
  padding: ${theme.spacing(10)}px;
  height: 100%;
  `}
`;

const ThemedContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledContainer>
      <Container>{children}</Container>
    </StyledContainer>
  );
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = React.useState(true);
  const theme = createMuiTheme({
    palette: {
      type: isDark ? "dark" : "light",
    },
  });
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <ThemedContainer>{children}</ThemedContainer>
      </ThemeProvider>
    </MuiThemeProvider>
  );
};
