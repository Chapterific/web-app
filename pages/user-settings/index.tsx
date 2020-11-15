import { useUsers } from "../../hooks/useUsers";

const UserSettings = () => {
  const { data } = useUsers();
  console.log(data);
  return <>sup</>;
};

export default UserSettings;
