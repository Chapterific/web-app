import { useQuery, useMutation, queryCache, useQueryCache } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";

interface WishListPost {
  id?: string;
  url: string;
  description: string;
  name: string;
}

interface UpdateWishList {
  item: WishListPost;
  method: "POST" | "PATCH";
}

interface WishList {
  Count: number;
  Items: WishListPost[];
  ScannedCount: number;
}

const wishUrl =
  "https://j9ogf83xx7.execute-api.eu-west-2.amazonaws.com/default/wish-list-service";

const tokenConfig = {
  audience: `https://auth0-jwt-authorizer`,
  scope: "read:current_user update:current_user_metadata",
};

export const useWishList = () => {
  const { getAccessTokenSilently } = useAuth0();

  const config = {
    refetchOnWindowFocus: false,
  };

  return useQuery<WishList>({
    queryKey: "wishes",
    queryFn: async () => {
      const accessToken = getAccessTokenSilently(tokenConfig);
      return fetch(wishUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => res.json());
    },
    config,
  });
};

export const useDeleteWishList = () => {
  const cache = useQueryCache();
  const { getAccessTokenSilently } = useAuth0();
  return useMutation(
    async (id: string) => {
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
    async ({ item, method }: UpdateWishList) => {
      const accessToken = await getAccessTokenSilently(tokenConfig);
      return fetch(wishUrl, {
        method,
        body: JSON.stringify(item),
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
    },
    {
      onSuccess: () => cache.invalidateQueries("wishes"),
    }
  );
};
