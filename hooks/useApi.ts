import {
  useQuery,
  useMutation,
  useQueryCache,
  QueryCache,
  ReactQueryCacheProvider,
  queryCache,
} from "react-query";
import { useAuth0 } from "@auth0/auth0-react";

const wishUrl =
  "https://j9ogf83xx7.execute-api.eu-west-2.amazonaws.com/default/wish-list-service";

export const useWishList = () => {
  const { getAccessTokenSilently } = useAuth0();

  return useQuery("posts", async () => {
    const accessToken = await getAccessTokenSilently({
      audience: `https://auth0-jwt-authorizer`,
      scope: "read:current_user update:current_user_metadata",
    });
    return fetch(wishUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res: any) => res.json());
  });
};

export const useDeleteWishList = () => {
  const { getAccessTokenSilently } = useAuth0();

  return useMutation(
    async (id) => {
      const accessToken = await getAccessTokenSilently({
        audience: `https://auth0-jwt-authorizer`,
        scope: "read:current_user update:current_user_metadata",
      });
      return fetch(wishUrl, {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res: any) => res.json());
    },
    {
      onSuccess: () => queryCache.refetchQueries("wishlists"),
    }
  );
};

export const useCreateWishList = () => {
  const { getAccessTokenSilently } = useAuth0();
  return useMutation(
    async (values) => {
      const accessToken = await getAccessTokenSilently({
        audience: `https://auth0-jwt-authorizer`,
        scope: "read:current_user update:current_user_metadata",
      });
      return fetch(wishUrl, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => res.json());
    },
    {
      onSuccess: () => queryCache.refetchQueries("wishlists"),
    }
  );
};
