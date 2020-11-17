import { useQuery } from "react-query";
import { useApi } from "./useApi";
import { useAuth0 } from "@auth0/auth0-react";

const config = {
  refetchOnWindowFocus: false,
};
const baseUrl = "https://79bidrpbo9.execute-api.eu-west-2.amazonaws.com/prod";

export const useUsers = (id) => {
  const api = useApi();

  return useQuery<any>({
    config,
    queryKey: "users",
    queryFn: async () => api(`/users/${id}`),
  });
};