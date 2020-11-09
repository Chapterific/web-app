import { Paper, Button, TextField } from "@material-ui/core";
import styled from "styled-components";
import {
  useWishList,
  useWishList2,
  useCreateWishList,
} from "../../hooks/useApi";
import { Controller, useForm } from "react-hook-form";

const TestPaper = styled(Paper)`
  padding: 28px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Page = () => {
  const { data, isLoading, isError } = useWishList();
  const { control, handleSubmit } = useForm();
  const [updateWishList] = useCreateWishList();

  if (isLoading) return <div>loading</div>;
  if (isError || !data) return <div>There was an error..</div>;

  const item: any = {
    name: "sean",
    description: "is a dev",
    url: "none",
  };
  const onSubmit = (data) => updateWishList(data);
  return (
    <TestPaper>
      <ul>
        {data?.Items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(item).map((i) => (
          <Controller
            key={i}
            label={i}
            defaultValue=""
            control={control}
            name={i}
            as={<TextField />}
          />
        ))}
        <Button
          style={{ marginTop: 24 }}
          color="primary"
          variant="contained"
          type="submit"
        >
          Add
        </Button>
      </StyledForm>
    </TestPaper>
  );
};

export default Page;
