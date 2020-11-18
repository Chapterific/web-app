import { useUsers } from "../../hooks/useUsers";
import {
  Typography,
  Paper,
  Button,
  Grid,
  TextField,
  IconButton,
} from "@material-ui/core";
import styled from "styled-components";
import Link from "next/link";
import { useAuth0 } from "@auth0/auth0-react";
import { useCreateGroup } from "../../hooks/useGroup";
import { useForm, Controller } from "react-hook-form";
import AddButton from "@material-ui/icons/Add";

const PageHeader = styled(Paper)`
  ${({ theme }) => `
      padding: ${theme.spacing(2)}px;
      margin-top: ${theme.spacing(1)}px;
    `}
`;

const FormRow = styled.div`
  ${({ theme }) => `
    line-height: 48px;
  `}
`;

// (Sean Rivard-Morton) [2020-11-16] TODO
// turn this into a form
export const UserSettings = () => {
  const { isLoading, isError, data } = useUsers();
  const { user } = useAuth0();
  const [newGroup] = useCreateGroup(user.email);
  const { control, handleSubmit } = useForm();
  const onSubmit = handleSubmit(({ groupName }) => newGroup(groupName));

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;
  if (!data) return <div>oops</div>;

  return (
    <>
      <PageHeader>
        {/** (Sean Rivard-Morton) [2020-11-17] TODO
         * refactor this into a breadcrumb
         */}
        <Typography component="h3">Home / User Settings</Typography>
      </PageHeader>
      <Grid container spacing={2}>
        <Grid item lg={4}>
          <PageHeader>
            <Typography variant="h4" component="h3" style={{ marginBottom: 8 }}>
              User Profile
            </Typography>
            <Typography component="p">Email: {user?.email}</Typography>
            <Typography component="p">name: Sean Rivard-Morton</Typography>
            <Typography component="p">nickname: Sean</Typography>
          </PageHeader>
        </Grid>
        <Grid item lg={8}>
          <PageHeader>
            <Typography variant="h4" component="h3">
              Your Chapters
            </Typography>
            <FormRow>
              <Controller
                defaultValue=""
                control={control}
                name="groupName"
                label="Group Name"
                as={<TextField />}
              />
              <IconButton onClick={onSubmit}>
                <AddButton />
              </IconButton>
            </FormRow>
          </PageHeader>

          {data?.groups.map((group) => (
            <PageHeader key={group.pk}>
              <Link passHref href={`groups/${group.pk.replace("g#", "")}`}>
                <a>
                  <Typography variant="h5" component="h5">
                    {group.name}
                  </Typography>
                </a>
              </Link>
            </PageHeader>
          ))}
        </Grid>
      </Grid>
    </>
  );
};
