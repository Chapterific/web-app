import { useQuery, useMutation, queryCache, useQueryCache } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";

const wishUrl =
  "https://j9ogf83xx7.execute-api.eu-west-2.amazonaws.com/default/wish-list-service";

const tokenConfig = {
  audience: `https://auth0-jwt-authorizer`,
  scope: "read:current_user update:current_user_metadata",
};

export const useWishList = () => {
  const { getAccessTokenSilently } = useAuth0();
  return useQuery("wishes", async () => {
    const accessToken = getAccessTokenSilently(tokenConfig);
    return fetch(wishUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json());
  });
};

export const useDeleteWishList = () => {
  const cache = useQueryCache();
  const { getAccessTokenSilently } = useAuth0();
  return useMutation(
    async (id) => {
      const accessToken = await getAccessTokenSilently(tokenConfig);
      return fetch(wishUrl, {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res: any) => res.json());
    },
    {
      onSuccess: () => cache.invalidateQueries("wishes"),
    }
  );
};

export const useCreateWishList = () => {
  const cache = useQueryCache();
  const { getAccessTokenSilently } = useAuth0();
  return useMutation(
    async (values) => {
      const accessToken = await getAccessTokenSilently(tokenConfig);
      return fetch(wishUrl, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => res.json());
    },
    {
      onSuccess: () => cache.invalidateQueries("wishes"),
    }
  );
};
