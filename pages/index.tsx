import Head from "next/head";
import { Paper } from "@material-ui/core";
import { BookList } from "../components/books";

export async function getStaticProps() {
  const req = `https://www.googleapis.com/books/v1/volumes?q=blink+malcolm`;
  const res = await fetch(req);
  const items = await res.json();
  return {
    props: {
      items,
    },
  };
}

export default function Home({ items }) {
  return (
    <div>
      <Head>
        <title>Chapterific</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Paper>sup</Paper>
        <BookList data={items}></BookList>
      </main>

      <footer></footer>
    </div>
  );
}
