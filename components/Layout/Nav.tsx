import { IconButton } from "@material-ui/core";
import { Settings, Home } from "@material-ui/icons";
// import HomeIcon from "@material-ui/icons/home";
import Link from "next/link";

export const Nav = () => {
  return (
    <>
      <Link href="/user-settings">
        <IconButton>
          <Settings />
        </IconButton>
      </Link>
      <Link href="/">
        <IconButton>
          <Home />
        </IconButton>
      </Link>
    </>
  );
};
