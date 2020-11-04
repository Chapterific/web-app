import React from "react";
import { useImmer } from "use-immer";

export const useBooks = (books, query) => {
  const [newBooks, updateBooks] = useImmer(books);
  const [newQuery, updateQuery] = React.useState(query);

  React.useEffect(() => {
    const getBooks = async (test) => {
      const req = `https://www.googleapis.com/books/v1/volumes?q=${test.replace(
        " ",
        "+"
      )}`;
      const res = await fetch(req);
      const items = await res.json();
      updateBooks((draft) => {
        draft = items;
        return draft;
      });
      return items;
    };
    getBooks(newQuery);
  }, [newQuery]);

  return { books: newBooks, search: newQuery, updateQuery };
};
