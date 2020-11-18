import { Paper, Typography } from "@material-ui/core";
import styled from "styled-components";

const UserPaper = styled(Paper)`
  ${({ theme }) => `
        padding: ${theme.spacing(2)}px;
        margin: ${theme.spacing(2)}px;
        ul {
            list-style-type: none;
            padding: 0px;
        }
    `}
`;

export const UsersInGroupList = ({ groupData }: { groupData: any }) => {
  const { users } = groupData;

  return (
    <UserPaper>
      <Typography variant="subtitle1" component="h3">
        Users:
      </Typography>
      <ul>
        {users?.map((user) => (
          // (Sean Rivard-Morton) [2020-11-17] TODO
          // Add user details to userInGroup entity
          <li>{user.email}</li>
        ))}
      </ul>
    </UserPaper>
  );
};
