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

const tokenConfig = {
  audience: `https://auth0-jwt-authorizer`,
  scope: "read:current_user update:current_user_metadata",
};

export const useWishList = () => {
  const { getAccessTokenSilently } = useAuth0();
  const accessToken = getAccessTokenSilently(tokenConfig);
  return useQuery("wishes", () =>
    fetchWishList(accessToken).then((res: any) => res.json())
  );
};

export const useDeleteWishList = () => {
  const { getAccessTokenSilently } = useAuth0();
  return useMutation(async (id) => {
    const accessToken = await getAccessTokenSilently(tokenConfig);
    return fetch(wishUrl, {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res: any) => res.json());
  });
};

const t =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRmQmdGZXE1ODd4YlA2c0JpaWhOZiJ9.eyJpc3MiOiJodHRwczovL2NoYXB0ZXJpZmljLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1ZmE5NzEzYjA5NmJiNzAwNzZhNmM5NTAiLCJhdWQiOlsiaHR0cHM6Ly9hdXRoMC1qd3QtYXV0aG9yaXplciIsImh0dHBzOi8vY2hhcHRlcmlmaWMuZXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTYwNTAxMDU1MSwiZXhwIjoxNjA1MDk2OTUxLCJhenAiOiJJaXRmNDZ1TXRXbGRsOU9yY2cwM2lidG1lRWtYbFhXQiIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.e9uc6X_LZ_DsrHmqbEh6eoe3EbYcmm-kCVI52qyiTbql05XtKf3herhGTeII5brKcW__Hyef2od-TJUaJJQPwwv8ycPPRXYeHhm6ORHRCi2qf-X8wsNaEHJRII0yR01zpRwslyGUOGMY22hhWODYnavKI_h_Ze1ieKq-4LYm8K6HbhQCuDSstGhw4y4PG8diUUnSCUS3JyfUcfvcpALhJzalJGyfVUbxBaLJHdfMGcVoahFohjrHRlSwZrmxrKtimXvG4FWUBLXZtcYpJLWGytji95YH__dQw9oC8vMdsqdFDqXy_zg0eVuN_I8EvI-1ONKa1zN5UxmXRFMamiXYtg";

export const useCreateWishList = () => {
  const { getAccessTokenSilently } = useAuth0();
  // const accessToken = await getAccessTokenSilently(tokenConfig);
  return useMutation(
    (values) => {
      return fetch(wishUrl, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          Authorization: `Bearer ${t}`,
        },
      }).then((res) => res.json());
    },
    {
      onMutate: (newWish) => {
        const oldPosts = queryCache.getQueryData("wishes");
        console.log(oldPosts);
        return;
      },
    }
  );
};
