import {
  Paper,
  TextField,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { useAddUserToGroup } from "../../../hooks/useGroup";
import AddButton from "@material-ui/icons/Add";

const UserFormPaper = styled(Paper)`
  ${({ theme }) => `
        padding: ${theme.spacing(2)}px;
        margin: ${theme.spacing(2)}px;
    `}
`;

export const AddUserForm = ({ group, id }) => {
  const { control, handleSubmit } = useForm();
  const [addToGroup] = useAddUserToGroup(id);
  const addUser = handleSubmit(({ userId }: any) =>
    addToGroup({ userId, name: group.name })
  );
  return (
    <UserFormPaper>
      <Controller
        name="userId"
        control={control}
        defaultValue=""
        label="invite user"
        as={<TextField />}
      />
      <IconButton onClick={addUser}>
        <AddButton></AddButton>
      </IconButton>
    </UserFormPaper>
  );
};
