import { useUsers } from "../../hooks/useUsers";
import { Typography, Paper, Button } from "@material-ui/core";
import styled from "styled-components";
import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";

const UserPaper = styled(Paper)`
  ${({ theme }) => `
      padding: ${theme.spacing(1)}px;
    `}
`;

// (Sean Rivard-Morton) [2020-11-16] TODO
// turn this into a form
const UserSettings = () => {
  const { isLoading, isError, data } = useUsers();
  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;
  if (!data) return <div>oops</div>;
  return (
    <UserPaper>
      <Typography component="h3">User Settings</Typography>
      <ul>
        {Object.entries(data).map(([key, val]: [any, any]) => {
          if (key === "groups") {
            return val.map((group) => {
              const [_, id] = group.pk.split("#");
              return (
                <Link key={id} href={`/groups/${id}`}>
                  <Button
                    style={{ margin: 8 }}
                    variant="contained"
                    color="primary"
                  >
                    {group.name}
                  </Button>
                </Link>
              );
            });
          }
          return (
            <li key={key}>
              {key}: {val}
            </li>
          );
        })}
      </ul>
    </UserPaper>
  );
};

export default UserSettings;
