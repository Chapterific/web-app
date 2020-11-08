import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";

const booksUrl = "https://www.googleapis.com/books/v1/volumes";

const getBooks = async (query) => {
  const data = await fetch(`${booksUrl}?q=${query.replace(" ", "+")}`);
  return data.json();
};

export function useBooks({ bookQuery }) {
  return useQuery(bookQuery, getBooks, {
    enabled: bookQuery,
  });
}
