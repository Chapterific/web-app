import { useQuery, useMutation } from "react-query";
import { useApi } from "./useApi";
import { useAuth0 } from "@auth0/auth0-react";

const config = {
  refetchOnWindowFocus: false,
};

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

export const useAddUserToGroup = (groupId) => {
  const api = useApi();

  return useMutation(async (data: { userId: string; name: string }) => {
    return api(`/groups/${groupId}/users`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  });
};

export const useCreateGroup = (userId: string) => {
  const api = useApi();
  return useMutation(async (groupName: string) => {
    return api(`/groups`, {
      method: "POST",
      body: JSON.stringify({ name: groupName, ownerId: userId }),
    });
  });
};

export const useSetReadTimes = (groupId, bookId) => {
  const api = useApi();
  return useMutation(async (times: { startDate?: any; endDate?: any }) => {
    return api(`/groups/${groupId}/books/${bookId}`, {
      method: "PATCH",
      body: JSON.stringify(times),
    });
  });
};
