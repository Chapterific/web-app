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

const fetchWishList = (accessToken) =>
  fetch(wishUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

// const useApi = async (url, opts: any = {}) => {
//   const { getAccessTokenSilently } = useAuth0();
//   const accessToken = await getAccessTokenSilently({
//     audience: `https://auth0-jwt-authorizer`,
//     scope: "read:current_user update:current_user_metadata",
//   });
//   const { headers, ...options } = opts;

//   const request = await() => {
//     return fetch(url, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         ...opts.headers,
//       },
//       ...options,
//     });
//   };

//   return request;
// };

// export const useWishList2 = async () => {
//   const request = useApi(wishUrl);
//   console.log(request);
//   return useQuery(
//     "wishlist",
//     async () => await request().then((res) => res.json())
//   );
// };

export const useWishList = () => {
  const { getAccessTokenSilently } = useAuth0();
  return useQuery("wishlist", async () => {
    const accessToken = await getAccessTokenSilently({
      audience: `https://auth0-jwt-authorizer`,
      scope: "read:current_user update:current_user_metadata",
    });
    return fetchWishList(accessToken).then((res) => res.json());
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
      onSuccess: () => queryCache.refetchQueries("posts"),
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
      onSuccess: () => queryCache.refetchQueries("posts"),
    }
  );
};
