import { Paper, Typography, IconButton } from "@material-ui/core";
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

const Group = () => {
  const router = useRouter();
  const { groupId } = router.query;
  // const getGroups = useGroup();
  // const { data, isLoading, isError } = getGroups(groupId);
  const { data, isLoading, isError } = useGroup(groupId);

  if (isLoading) return <div>loading... </div>;
  if (isError || !data) return <div>something went wrong..</div>;
  return (
    <div>
      <Link href="/">
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
      </Link>
      <GroupPaper>
        <Typography variant="h4" component="h1">
          {data?.[0]?.name}
        </Typography>
      </GroupPaper>
    </div>
  );
};

export default Group;
