import React from "react";
import { Paper, Typography, TextField, IconButton } from "@material-ui/core";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import SearchIcon from "@material-ui/icons/Search";

const SearchContainer = styled(Paper)`
  ${({ theme }) => `
        padding: ${theme.spacing(2)}px;
        display: flex;
        flex-wrap: nowrap;
    `}
`;

export const BookSearch = ({ query }) => {
  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <SearchContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="search"
          control={control}
          defaultValue={query}
          as={<TextField className="search-field"></TextField>}
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </form>
    </SearchContainer>
  );
};
