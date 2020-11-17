import { useRouter } from "next/router";
import { Paper, Typography, Button, IconButton } from "@material-ui/core";
import styled from "styled-components";
import { useBook } from "../../hooks/useBooks";
import { BookCard } from "../../components/Books/BookCard";
import { Rating } from "@material-ui/lab";
import parse from "html-react-parser";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Link from "next/link";

const BookPaper = styled(Paper)`
  ${({ theme }) => `
    padding: ${theme.spacing(2)}px;
  `}
`;

const Book = () => {
  const router = useRouter();
  const { bookId } = router.query;
  const { data, isLoading, isError } = useBook(bookId);
  // (Sean Rivard-Morton) [2020-10-09] TODO:
  // Make loading and error state more sexy
  if (isLoading) return <div>loading</div>;
  if (isError) return <div>oops</div>;
  return (
    <div>
      <Link href="/">
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
      </Link>
      <BookPaper>
        <Typography variant="h2" component="h1">
          {data.volumeInfo.title}
        </Typography>
        <Typography variant="subtitle1" component="h2">
          Author: {data.volumeInfo.authors?.join(", ")}
        </Typography>
        <Rating value={data.volumeInfo?.averageRating || 0} readOnly />
        <Typography variant="body1">
          {
            // (Sean Rivard-Morton) [2020-10-09] TODO
            // fix console warnings from improperly nested html from parse
          }
          {parse(
            data.volumeInfo.description ?? "This book has not been described :("
          )}
        </Typography>
        <Typography variant="body1">
          Page Count: {data.volumeInfo.pageCount}
        </Typography>
        <Button color="primary" variant="contained">
          Add To Read List
        </Button>
      </BookPaper>
    </div>
  );
};

export default Book;
