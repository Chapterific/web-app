import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { Book } from "../components/Books/book";

const booksUrl = "https://www.googleapis.com/books/v1/volumes";

const getBooks = async (query) => {
  const data = await fetch(`${booksUrl}?q=${query.replace(" ", "+")}`);
  return data.json();
};

const getBook = async (bookId) => {
  const data = await fetch(`${booksUrl}/${bookId}`);
  return data.json();
};

export function useBook(bookId) {
  return useQuery<Book, Error>(bookId, getBook, {
    enabled: bookId,
  });
}

export function useBooks({ bookQuery }) {
  return useQuery(bookQuery, getBooks, {
    enabled: bookQuery,
  });
}
