import { queryCache, useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { Book } from "../components/Books/book";

const booksUrl = "https://www.googleapis.com/books/v1/volumes";

export function useBook(bookId) {
  console.log();
  return useQuery<Book, Error>(
    ["book", bookId],
    () => fetch(`${booksUrl}/${bookId}`).then((res) => res.json()),
    {
      initialData: () => {
        return queryCache.getQueryData(["book", bookId]);
      },
    }
  );
}

export function useBooks({ bookQuery }) {
  return useQuery(
    ["books", bookQuery],
    () =>
      fetch(`${booksUrl}?q=${bookQuery.replace(" ", "+")}`).then((res) =>
        res.json()
      ),
    {
      onSuccess: ({ items }) => {
        items?.forEach((item) =>
          queryCache.setQueryData(["book", item.id], item)
        );
        return;
      },
    }
  );
}
