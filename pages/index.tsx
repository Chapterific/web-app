import { Typography, Container } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { BookList } from "../components/Books";
import { useForm } from "react-hook-form";
import { TextField } from "../components/Form";
import { useDebounce } from "../hooks/useDebounce";
import { useAppState } from "../hooks/useAppContext";

const MainContainer = styled(Container)`
  ${({ theme }) => `
    padding: ${theme.spacing(8)}px;
  `}
`;

export default function Books() {
  const [{ bookQuery }, setBookQuery] = useAppState();
  const { control } = useForm();
  const debouncedBookQuery = useDebounce(bookQuery, 2000);
  // (Sean Rivard-Morton) [2020-10-09] TODO:
  // Adjust page so it renders nicely on mobile
  return (
    <MainContainer maxWidth="md">
      <Typography color="textPrimary">Find Books</Typography>

      {
        // (Sean Rivard-Morton) [2020-10-09] TODO:
        // Refactor this into BookSearch.tsx, and add filters
      }
      <TextField
        onChange={setBookQuery}
        name="query"
        control={control}
        defaultValue={debouncedBookQuery || bookQuery}
      />

      <BookList bookQuery={bookQuery}></BookList>
    </MainContainer>
  );
}
