import { useAuth0 } from "@auth0/auth0-react";
import { Typography } from "@material-ui/core";
import { LoginButton } from "./";

export const Login = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  // (Sean Rivard-Morton) [2020-10-09] TODO
  // Replace with better loading component
  if (isLoading) return <div>Loading</div>;
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
