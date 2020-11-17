import { useQuery, useMutation } from "react-query";
import { useApi } from "./useApi";
import { useAuth0 } from "@auth0/auth0-react";

const config = {
  refetchOnWindowFocus: false,
};

const baseUrl = "https://79bidrpbo9.execute-api.eu-west-2.amazonaws.com/prod";

export const useGroup = (id) => {
  const api = useApi();

  return useQuery<any>({
    config,
    queryKey: "groups",
    queryFn: async () => api(`/groups/${id}`),
  });
};

export const useBookInGroup = (groupId) => {
  const api = useApi();

  return useMutation(async (book: any) => {
    return api(`/groups/${groupId}/books`, {
      method: "POST",
      body: JSON.stringify(book),
    });
  });
};
