import { Button, Typography } from "@material-ui/core";
import { Container } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const MainContainer = styled(Container)`
  ${({ theme }) => `
    padding: ${theme.spacing(8)}px;
`}
`;

export default function Home() {
  const { isAuthenticated } = useAuth0();
  return (
    <MainContainer maxWidth="md">
      <Typography color="textPrimary">Sup</Typography>
    </MainContainer>
  );
}
