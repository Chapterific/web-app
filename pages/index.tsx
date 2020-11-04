import Head from "next/head";
import { Paper } from "@material-ui/core";
import { BookList, BookSearch } from "../components/books";

export async function getStaticProps() {
  const query = "green lights";
  const req = `https://www.googleapis.com/books/v1/volumes?q=${query.replace(
    " ",
    "+"
  )}`;
  const res = await fetch(req);
  const items = await res.json();
  return {
    props: {
      items,
      query,
    },
  };
}

export default function Home({ items, query }) {
  return (
    <div>
      <Head>
        <title>Chapterific</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <BookSearch query={query}></BookSearch>
        <BookList data={items}></BookList>
      </main>

      <footer></footer>
    </div>
  );
}
