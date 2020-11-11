import { Paper, Button, TextField, Card } from "@material-ui/core";
import styled from "styled-components";
import {
  useWishList,
  useCreateWishList,
  useDeleteWishList,
} from "../../hooks/useApi";
import { Controller, useForm } from "react-hook-form";

const TestPaper = styled(Paper)`
  padding: 28px;
  width: 400px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  /* width: 300px; */
`;

const WishList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0px;
  /* width: 400px; */
  list-style-type: none;
`;

const WishListCard = styled(Card)`
  ${({ theme }) => `
    display: flex;
    flex-direction: column;
    padding: ${theme.spacing(1)}px;
    margin: ${theme.spacing(2)}px;
    width: 350px;
  `}
`;

const wishListItem: any = {
  name: "sean",
  description: "is a dev",
  url: "none",
};

const Page = () => {
  const { data, isLoading, isError } = useWishList();
  const { control, handleSubmit } = useForm();
  const [updateWishList] = useCreateWishList();
  const [deleteItem] = useDeleteWishList();

  if (isLoading) return <div>loading</div>;
  if (isError || !data) return <div>There was an error..</div>;

  const onSubmit = (data) => updateWishList({ method: "POST", item: data });

  return (
    <>
      <WishList>
        {data?.Items?.map(({ id, ...item }) => (
          <li key={id}>
            <WishListCard raised={true}>
              {Object.entries(item).map(([key, val]) => {
                return (
                  <Controller
                    key={key}
                    label={key}
                    defaultValue={val}
                    control={control}
                    name={`${id}.${key}`}
                    as={<TextField />}
                  />
                );
              })}
              <Button
                style={{ marginTop: 24 }}
                onClick={handleSubmit((data) =>
                  updateWishList({ method: "PATCH", item: { ...data[id], id } })
                )}
                variant="outlined"
                color="primary"
              >
                Update
              </Button>
              <Button
                style={{ marginTop: 8 }}
                onClick={() => deleteItem(id)}
                variant="contained"
                color="primary"
              >
                Delete
              </Button>
            </WishListCard>
          </li>
        ))}
      </WishList>
      <TestPaper>
        <StyledForm>
          {Object.keys(wishListItem).map((i) => (
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
            onClick={handleSubmit(onSubmit)}
          >
            Add
          </Button>
        </StyledForm>
      </TestPaper>
    </>
  );
};

export default Page;
