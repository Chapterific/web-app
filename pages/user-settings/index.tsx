import { useUsers } from "../../hooks/useUsers";

const UserSettings = () => {
  const getData = useUsers();
  const { isLoading, isError, data } = getData("01");
  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;
  if (!data) return <div>oops</div>;
  const [user] = data;
  return (
    <>
      <div>boop</div>
      <li>
        {Object.entries(user).map(([key, val]) => {
          return (
            <ul key={val}>
              {key}: {val}
            </ul>
          );
        })}
      </li>
    </>
  );
};

export default UserSettings;
