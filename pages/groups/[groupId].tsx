import { Paper, Typography, IconButton, Card, Button } from "@material-ui/core";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useGroup } from "../../hooks/useGroup";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Link from "next/link";

const GroupPaper = styled(Paper)`
  ${({ theme }) => `
    padding: ${theme.spacing(3)}px;
  `}
`;

const BookCard = styled(Card)`
  ${({ theme }) => `
    padding: ${theme.spacing(2)}px;
    margin: ${theme.spacing(2)}px;
  `}
`;

const Group = () => {
  const router = useRouter();
  const { groupId } = router.query;
  const { data, isLoading, isError } = useGroup(groupId);

  if (isLoading) return <div>loading... </div>;
  if (isError || !data) return <div>something went wrong..</div>;
  console.log(data.books);
  return (
    <div>
      <GroupPaper>
        <Typography variant="h4" component="h1">
          {data.name}
        </Typography>
      </GroupPaper>
      <ul>
        {data.books.map((book) => (
          <li key={book.id}>
            <BookCard>
              <Typography variant="h5">{book.volumeInfo.title}</Typography>
              <Link href={`/books/${book.id}`}>
                <Button variant="outlined" color="primary">
                  See More
                </Button>
              </Link>
            </BookCard>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Group;
