import { queryCache, useQuery } from "react-query";
import { Book } from "../components/Books/book";

const booksUrl = "https://www.googleapis.com/books/v1/volumes";

export function useBook(bookId) {
  return useQuery<Book, Error>(
    ["book", bookId],
    () => fetch(`${booksUrl}/${bookId}`).then((res) => res.json()),
    {
      initialData: () => {
        // (Sean Rivard-Morton) [2020-10-09] Note
        // If the cache already contains the book we're looking for,
        // that one instead. This means less loading time!
        return queryCache.getQueryData(["book", bookId]);
      },
    }
  );
}

interface Books {
  items: Book[];
  kind: string;
  totalItems: number;
}

export function useBooks(bookQuery) {
  return useQuery<Books>(
    ["books", bookQuery],
    () =>
      fetch(`${booksUrl}?q=${bookQuery.replace(" ", "+")}`).then((res) =>
        res.json()
      ),
    {
      // (Sean Rivard-Morton) [2020-10-09] Note
      // books aren't changing often enough to warrant frequent updates.
      staleTime: 1000 * 60,
      onSuccess: ({ items }) => {
        // (Sean Rivard-Morton) [2020-10-09] Note:
        // If a list of books has been fetched, cache them so we don't have to
        // do an individual fetch later. It's pretty cool.
        items?.forEach((item) => {
          queryCache.setQueryData(["book", item.id], item);
        });
        return;
      },
    }
  );
}
