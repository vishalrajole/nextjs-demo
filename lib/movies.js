export async function getAllMovieIds() {
  const data = await fetch(
    `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.API_KEY}&language=en-US`
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
