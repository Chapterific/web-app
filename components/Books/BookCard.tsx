import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { Book } from "./book";
import styled from "styled-components";
import Link from "next/link";

const StyledCard = styled(Card)`
  ${({ theme }) => `
    display: flex;
    height: 150px;
        .book-media {
            height: 150px;
            width: 100px;
        }
        .book-card-content {
            display: flex;
            flex-direction: column;
            width: 100%;
        }
    `}
`;

const CardControls = styled.div`
  ${({ theme }) => `
        padding-top: ${theme.spacing(1)}px;
    `}
`;

export const BookCard = ({ book }: { book: Book }) => {
  return (
    <StyledCard>
      <CardMedia
        className="book-media"
        image={book.volumeInfo?.imageLinks?.thumbnail || "/"}
      />
      <CardContent className="book-card-content">
        <Typography color="textPrimary">{book.volumeInfo.title}</Typography>
        <Typography color="textSecondary">
          {book?.volumeInfo?.authors?.join(", ")}
        </Typography>
        <Rating
          name="read-only"
          value={book.volumeInfo.averageRating}
          readOnly
        />
        <CardControls>
          <Button color="primary" variant="contained">
            Add to Read List
          </Button>
          <Link href={`/books/${book.id}`}>
            <Button>See More</Button>
          </Link>
        </CardControls>
      </CardContent>
    </StyledCard>
  );
};
