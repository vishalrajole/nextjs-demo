import Link from "next/link";
import fetch from "node-fetch";
import Image from "next/image";

// import useSWR from "swr";

export async function getStaticProps() {
  const data = await fetch(
    "https://api.themoviedb.org/3/trending/all/week?api_key=6dbcf6b4d31b238d4f21cd54be3ce1c1&language=en-US"
  );
  const result = await data.json();
  console.log("data: ", result);
  return {
    props: {
      movies: result.results,
      page: result.page,
    },
  };
}

export default function Movies({ movies, page }) {
  /***
   * For client side rendering
   * 
   * const { data, error } = useSWR(
    "https://api.themoviedb.org/3/trending/all/day?api_key=6dbcf6b4d31b238d4f21cd54be3ce1c1&language=en-US",
    () => {
      return fetch(
        " https://api.themoviedb.org/3/trending/all/day?api_key=6dbcf6b4d31b238d4f21cd54be3ce1c1&language=en-US",
        {
          method: "GET",
        }
      );
    }
  );
  */
  return (
    <>
      <ul>
        {movies.map((movie) => {
          return (
            <Link href={`movie/${movie.id}`} key={movie.id}>
              <li>
                {movie.title}
                <br />
                {movie.release_date}
                <br />
                {movie.overview}
                <br />
                <Image
                  priority
                  src={`https://image.tmdb.org/t/p/w1400_and_h450_face/${movie.backdrop_path}`}
                  height={144}
                  width={144}
                />
              </li>
            </Link>
          );
        })}
      </ul>
    </>
  );
}
