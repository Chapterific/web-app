import React from "react";
import { Card, CardContent, Typography, CardMedia } from "@material-ui/core";
import styled from "styled-components";

const BookListItem = styled.li`
  ${({ theme }) => `
        list-style-type: none;
        padding: ${theme.spacing(1)}px;
    `}
`;

export const BookList = ({ data }: any) => {
  console.log(data);
  const { items } = data;
  return (
    <ul style={{ padding: 0 }}>
      {items.map((book) => {
        return (
          <BookListItem key={book.id}>
            <Card style={{ display: "flex", height: 150, overflow: "auto" }}>
              <CardMedia
                style={{ height: 150, minWidth: 100 }}
                image={book.volumeInfo.imageLinks?.thumbnail || "sorry"}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {book.volumeInfo.title}
                </Typography>
                <Typography
                  style={{ padding: 4 }}
                  variant="body2"
                  color="textSecondary"
                  component="p"
                >
                  Pages: {book.volumeInfo.pageCount} | Rating:{" "}
                  {book.volumeInfo.averageRating} | Author:{" "}
                  {book.volumeInfo?.authors?.join(", ")}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {book.volumeInfo.description}
                </Typography>
              </CardContent>
            </Card>
          </BookListItem>
        );
      })}
    </ul>
  );
};
