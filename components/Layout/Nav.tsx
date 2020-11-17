import { IconButton } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/settings";
import HomeIcon from "@material-ui/icons/home";
import Link from "next/link";

export const Nav = () => {
  return (
    <>
      <Link href="/user-settings">
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </Link>
      <Link href="/">
        <IconButton>
          <HomeIcon />
        </IconButton>
      </Link>
    </>
  );
};
