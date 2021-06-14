import Head from "next/head";
import fetch from "node-fetch";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";

import Layout from "../../components/layout";

import { getAllMovieIds } from "../../lib/movies";

const Poster = styled(Image)`
  display: flex;
  border-radius: 4px;
`;

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
    `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.API_KEY}&language=en-US`
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

      <Poster
        priority
        src={`https://image.tmdb.org/t/p/w1400_and_h450_face/${movie.backdrop_path}`}
        height={400}
        width={1200}
      />

      <div>{movie.title}</div>
      <div>{movie.description}</div>
      <Link href="/movies">
        <a>Back to list</a>
      </Link>
    </Layout>
  );
}
