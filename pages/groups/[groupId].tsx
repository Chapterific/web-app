import { Paper, Typography, Grid, Button } from "@material-ui/core";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useGroup } from "../../hooks/useGroup";
import { AddUserForm } from "../../components/Groups/AddUserForm";
import { UsersInGroupList } from "../../components/Groups/UsersInGroupList";
import { ActiveBook } from "../../components/Groups/ActiveBook";

const GroupPaper = styled(Paper)`
  ${({ theme }) => `
    padding: ${theme.spacing(2)}px;
    margin-top: ${theme.spacing(1)}px;
  `}
`;

const Group = () => {
  const router = useRouter();
  const { groupId } = router.query;
  const { data, isLoading, isError } = useGroup(groupId);

  if (isLoading) return <div>loading... </div>;
  if (isError || !data) return <div>something went wrong..</div>;

  return (
    <div>
      <GroupPaper>
        <Typography variant="h4" component="h1">
          {data.name}
        </Typography>
      </GroupPaper>
      <Grid container>
        <Grid item lg={3}>
          <AddUserForm id={groupId} group={data}></AddUserForm>
          <UsersInGroupList groupData={data}></UsersInGroupList>
        </Grid>
        <Grid item lg={8}>
          <Paper style={{ marginTop: 16, padding: 8 }}>
            <Typography color="textPrimary" variant="h4" component="h4">
              Active Book
            </Typography>
          </Paper>
          {data?.books && <ActiveBook groupId={groupId} book={data.books[0]} />}
          <Button style={{ marginTop: 8 }} variant="contained" color="primary">
            Start a discussion
          </Button>
          {data?.books.map((book) => (
            <Paper key={book.id} style={{ marginTop: 16, padding: 8 }}>
              {book.volumeInfo.title}
            </Paper>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Group;
