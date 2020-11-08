import { Typography } from "@material-ui/core";
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "../Login";

export const Layout = ({ children, pageTitle, subTitle }) => {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      <span
        style={{
          height: "100%",
          verticalAlign: "text-bottom",
        }}
      >
        <Typography color="primary" variant="h3" component="h1">
          {pageTitle}
        </Typography>
        <Typography color="textPrimary">{subTitle}</Typography>
        {isAuthenticated ? <LogoutButton></LogoutButton> : null}
      </span>
      {children}
    </>
  );
};