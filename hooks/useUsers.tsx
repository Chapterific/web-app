import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";

const url =
  "https://79bidrpbo9.execute-api.eu-west-2.amazonaws.com/prod/users/01";

const tokenConfig = {
  audience: `https://auth0-jwt-authorizer`,
  scope: "read:current_user update:current_user_metadata",
};
const config = {
  refetchOnWindowFocus: false,
};

export const useUsers = () => {
  const { getAccessTokenSilently } = useAuth0();
  return useQuery({
    config,
    queryKey: "users",
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently(tokenConfig);
      return fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
  });
};
