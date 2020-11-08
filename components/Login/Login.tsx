import { useAuth0 } from "@auth0/auth0-react";
import { Typography } from "@material-ui/core";
import { LoginButton } from "./";

export const Login = ({ children }) => {
  const { isAuthenticated } = useAuth0();
  if (isAuthenticated) return children;
  return (
    <>
      <Typography color="textSecondary">
        You're currently logged out. Lets change that.
      </Typography>
      <LoginButton />
    </>
  );
};
