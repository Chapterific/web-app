import { Typography } from "@material-ui/core";

export const Layout = ({ children, pageTitle, subTitle }) => {
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
      </span>
      {children}
    </>
  );
};
