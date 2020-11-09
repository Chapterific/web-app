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

export default function Home() {
  const [{ bookQuery }, setBookQuery] = useAppState();
  const { control } = useForm();
  const debouncedBookQuery = useDebounce(bookQuery, 2000);
  return (
    <MainContainer maxWidth="md">
      <Typography color="textPrimary">Find Books</Typography>

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
