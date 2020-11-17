import { Paper, TextField, Typography, Button } from "@material-ui/core";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { useAddUserToGroup } from "../../../hooks/useGroup";

const UserFormPaper = styled(Paper)`
  ${({ theme }) => `
        padding: ${theme.spacing(2)}px;
        margin: ${theme.spacing(2)}px;
    `}
`;

export const AddUserForm = ({ groupId }) => {
  const { control, handleSubmit } = useForm();
  const [addToGroup] = useAddUserToGroup(groupId);
  const addUser = handleSubmit((data: any) => addToGroup(data));
  return (
    <UserFormPaper>
      <Typography variant="subtitle1" component="h5">
        add user
      </Typography>
      <Controller
        name="userId"
        control={control}
        defaultValue=""
        as={<TextField />}
      />
      <Button onClick={addUser} variant="contained" color="primary">
        Add User
      </Button>
    </UserFormPaper>
  );
};
