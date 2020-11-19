import { Typography, Container, Paper } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { BookList } from "../components/Books";
import { useForm } from "react-hook-form";
import { TextField } from "../components/Form";
import { useDebounce } from "../hooks/useDebounce";
import { useAppState } from "../hooks/useAppContext";
import { useUsers } from "../hooks/useUsers";
import { useGroup } from "../hooks/useGroup";

const MainContainer = styled(Container)`
  ${({ theme }) => `
    padding: ${theme.spacing(8)}px;
  `}
`;

const HomePaper = styled(Paper)`
  ${({ theme }) => `
    padding: ${theme.spacing(3)}px;
    margin:  ${theme.spacing(2)}px;
  `}
`;

export default function Books() {
  const [{ bookQuery, activeGroup }, setBookQuery] = useAppState();
  const { control } = useForm();
  const { data: user, isLoading, isError } = useUsers();
  const debouncedBookQuery = useDebounce(bookQuery, 2000);

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>oopos</div>;
  const group = user.groups.find((group) => group.name === activeGroup);
  console.log(user.groups);
  // (Sean Rivard-Morton) [2020-10-09] TODO:
  // Adjust page so it renders nicely on mobile
  return (
    <MainContainer maxWidth="md">
      <Typography color="textPrimary">
        Find Books to add to {activeGroup}
      </Typography>
      {
        // (Sean Rivard-Morton) [2020-10-09] TODO:
        // Refactor this into BookSearch.tsx, and add filters
      }
      <TextField
        onChange={(bookQuery) => setBookQuery({ bookQuery })}
        name="query"
        control={control}
        defaultValue={debouncedBookQuery || bookQuery}
      />

      <BookList
        groupToAddTo={group?.pk.replace("g#", "")}
        bookQuery={bookQuery}
      ></BookList>
    </MainContainer>
  );
}
