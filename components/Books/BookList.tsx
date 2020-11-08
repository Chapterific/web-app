import { useBooks } from "../../hooks/useBooks";
import { Card, CardContent, Typography } from "@material-ui/core";
import styled from "styled-components";
import { BookCard } from "./BookCard";

const BooksList = styled.ul`
  ${({ theme }) => `
    list-style-type: none;
    padding: 0px;
    li {
        margin: ${theme.spacing(1)}px;
    }
  `}
`;

export const BookList = (bookQuery) => {
  const { data, isLoading, isError } = useBooks(bookQuery);
  if (isLoading) return <div>loading</div>;
  if (isError) return <div>No Books</div>;

  return (
    <BooksList>
      {data?.items.map((book) => {
        return (
          <li key={book.id}>
            <BookCard book={book}></BookCard>
          </li>
        );
      })}
    </BooksList>
  );
};
