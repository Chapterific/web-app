import { useBooks } from "../../hooks/useBooks";
import { Card, CardContent, Typography } from "@material-ui/core";
import styled from "styled-components";

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
  const { data } = useBooks(bookQuery);
  if (!data) return <div>sorry</div>;

  return (
    <BooksList>
      {data?.items.map((book) => {
        return (
          <li key={book.id}>
            <Card>
              <CardContent>
                <Typography color="textPrimary">
                  {book.volumeInfo.title}
                </Typography>
              </CardContent>
            </Card>
          </li>
        );
      })}
    </BooksList>
  );
};
