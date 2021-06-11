export async function getAllMovieIds() {
  const data = await fetch(
    "https://api.themoviedb.org/3/trending/all/week?api_key=6dbcf6b4d31b238d4f21cd54be3ce1c1&language=en-US"
  );
  const result = await data.json();
  const ids = result.results.map((movie) => {
    return {
      params: {
        id: movie.id.toString(),
      },
    };
  });

  return ids;
}
