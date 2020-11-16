import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { useApi } from "./useApi";

const config = {
  refetchOnWindowFocus: false,
};

export const useUsers = () => {
  const api = useApi();

  return (id) =>
    useQuery<any>({
      config,
      queryKey: "users",
      queryFn: async () => api(`/users/${id}`),
    });
};
