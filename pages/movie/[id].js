import Head from "next/head";
import fetch from "node-fetch";
import Link from "next/link";

import Layout from "../../components/layout";

import { getAllMovieIds } from "../../lib/movies";

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = await getAllMovieIds();
  console.log("paths: ", paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?api_key=6dbcf6b4d31b238d4f21cd54be3ce1c1&language=en-US`
  );

  const result = await data.json();
  console.log("result: ", result);
  return {
    props: {
      movie: result,
    },
  };
}

export default function Movie({ movie }) {
  return (
    <Layout>
      <Head>
        <title>{movie.title}</title>
      </Head>
      <div>{movie.title}</div>
      <Link href="/movies">
        <a>Back to list</a>
      </Link>
    </Layout>
  );
}
