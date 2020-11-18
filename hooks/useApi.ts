import { useAuth0 } from "@auth0/auth0-react";

// const baseUrl = "https://79bidrpbo9.execute-api.eu-west-2.amazonaws.com/prod";

export const useApi = () => {
  const { getAccessTokenSilently } = useAuth0();

  return async (url, { headers, ...options }: any = { headers: {} }) => {
    const accessToken = await getAccessTokenSilently();
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      ...options,
      headers: {
        ...headers,
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json());
  };
};
