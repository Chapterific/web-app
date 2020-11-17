import { Typography } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "../Login";
import styled, { createGlobalStyle } from "styled-components";
import { Nav } from "./Nav";

const GlobalStyle = createGlobalStyle`
  ${({ theme }) => `
    body {
      background-color: ${theme.palette.background.default};
    }
  `}
`;

const Header = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-direction: column;
    .top {
      display: flex;
      flex-direction: row;
      .right {
        right: 0px;
        width: 100%;
        text-align: right;
      }
    }
  `}
`;

export const Layout = ({ children, pageTitle, subTitle }) => {
  const { isAuthenticated } = useAuth0();
  return (
    <Header>
      <GlobalStyle />
      <div className="top">
        <div>
          <Typography color="primary" variant="h3" component="h1">
            {pageTitle}
          </Typography>
          <Typography color="textPrimary">{subTitle}</Typography>
        </div>
        <div className="right">
          {isAuthenticated ? <LogoutButton></LogoutButton> : null}
          <Nav />
        </div>
      </div>
      {children}
    </Header>
  );
};
