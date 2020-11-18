import { IconButton } from "@material-ui/core";
import { Settings, Home } from "@material-ui/icons";
import { useUsers } from "../../hooks/useUsers";
import Link from "next/link";

export const Nav = () => {
  const data = useUsers();
  return (
    <>
      <Link href="/user-settings">
        <IconButton title="settings">
          <Settings />
        </IconButton>
      </Link>
    </>
  );
};
