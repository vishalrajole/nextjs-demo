import Link from "next/link";
import fetch from "node-fetch";
import Image from "next/image";
import styled from "styled-components";
import Layout from "../../components/layout";

// import useSWR from "swr";

const Title = styled.h1`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary};
`;

const Label = styled.p`
  font-size: 14px;
  font-weight: 600;
`;
const Value = styled.span`
  font-size: 14px;
  font-weight: 400;
`;

const DetailsWrapper = styled.div`
  display: inline-flex;
`;

const MediaType = styled.span`
  text-transform: capitalize;
  font-weight: 400;
`;

const Details = styled.div`
  margin: 20px;
  color: #000;
`;

const Poster = styled(Image)`
  display: inline-flex;
  border-radius: 4px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
`;

const ListItem = styled.li`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 20px;
`;

export async function getServerSideProps() {
  const data = await fetch(
    `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.API_KEY}&language=en-US`
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
    `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.API_KEY}&language=en-US`,
    () => {
      return fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.API_KEY}&language=en-US`,
        {
          method: "GET",
        }
      );
    }
  );
  */
  return (
    <Layout>
      <List>
        {movies.map((movie) => {
          return (
            <Link href={`movie/${movie.id}`} key={movie.id}>
              <ListItem>
                <DetailsWrapper>
                  <Poster
                    priority
                    src={`https://image.tmdb.org/t/p/w1400_and_h450_face/${movie.backdrop_path}`}
                    height={300}
                    width={400}
                  />
                  <Details>
                    <Title>{movie.title || movie.name}</Title>
                    <Label>
                      Description: <Value>{movie.overview}</Value>
                    </Label>
                    {movie.release_date && (
                      <Label>
                        Release date: <Value>{movie.release_date}</Value>
                      </Label>
                    )}
                    {movie.vote_average && (
                      <Label>
                        Ratings: <Value>{movie.vote_average}</Value>
                      </Label>
                    )}
                    {movie.original_language && (
                      <Label>
                        Language: <Value>{movie.original_language}</Value>
                      </Label>
                    )}
                    {movie.media_type && (
                      <Label>
                        Media type: <MediaType>{movie.media_type}</MediaType>
                      </Label>
                    )}
                  </Details>
                </DetailsWrapper>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Layout>
  );
}
