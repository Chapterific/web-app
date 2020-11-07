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

const params: any = {
  audience: `https://auth0-jwt-authorizer`,
  scope: "read:current_user update:current_user_metadata",
};

const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRmQmdGZXE1ODd4YlA2c0JpaWhOZiJ9.eyJpc3MiOiJodHRwczovL2NoYXB0ZXJpZmljLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwNTQwNzM2NTY1ODM1NjEyNTEzNCIsImF1ZCI6WyJodHRwczovL2F1dGgwLWp3dC1hdXRob3JpemVyIiwiaHR0cHM6Ly9jaGFwdGVyaWZpYy5ldS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjA0Nzg1MTgzLCJleHAiOjE2MDQ4NzE1ODMsImF6cCI6IklpdGY0NnVNdFdsZGw5T3JjZzAzaWJ0bWVFa1hsWFdCIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.mbSHxDKANZrx0QXxYkfNQavYx65-v7Zx6otiFzHuKQpufAqHPu4Nh2mLDCO_fvWQbIWNEtGetV3815aibd9iQtDxKUlA3cCg3Eqj6N930HGTs88OkklmA2Gjqw6ZjUlMcIjai0hdafiXev2Ff7qxkiV0Jnv66svDZueHqM6x1QjxOxYiheneBkc2-PGosIZAkhdhR4MxwcmoA2F3aGgeWNDS0gJC0VO6dHf28aAfxqayyolMCM1kP6YQsR68S2dVwIGhlbevaI5a9Nnijgiv40nfIounpleLu017O-kzx02kfi9FA_N4E0q5qJVmouLe4624Bo_5RTcJ816xnWKNeQ";

export const useWishList = () => {
  const { getAccessTokenSilently } = useAuth0();

  return useQuery("posts", async () => {
    // const accessToken = await getAccessTokenSilently({
    //   audience: `https://auth0-jwt-authorizer`,
    //   scope: "read:current_user update:current_user_metadata",
    // });
    return fetch(wishUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res: any) => res.json());
  });
};

export const useDeleteWishList = () => {
  const { getAccessTokenSilently } = useAuth0();

  return useMutation(
    async (id) => {
      //   const accessToken = await getAccessTokenSilently({
      //     audience: `https://auth0-jwt-authorizer`,
      //     scope: "read:current_user update:current_user_metadata",
      //   });
      return fetch(wishUrl, {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res: any) => res.json());
    },
    {
      onSuccess: () => queryCache.refetchQueries("wishlists"),
    }
  );
};

export const useCreateWishList = () => {
  return useMutation(
    async (values) => {
      return fetch(wishUrl, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json());
    },
    {
      onSuccess: () => queryCache.refetchQueries("wishlists"),
    }
  );
};
