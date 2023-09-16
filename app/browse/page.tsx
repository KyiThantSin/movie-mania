"use client";
import Card, { CardProps } from "@/components/Card";
import Skeleton from "@/components/Skeleton";
import {
  fetchMovieByGenres,
  fetchMovieGenres,
  fetchMovies,
  searchMovies,
} from "@/helper/movies";
import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
interface MovieGenresProps {
  id: number;
  name: string;
}

const page = () => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [movieLists, setMovieLists] = useState<CardProps[]>([]);
  const [movieGenres, setMovieGenres] = useState<MovieGenresProps[]>([]);
  const [activeGenre, setActiveGenre] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMovies();
        const genres = await fetchMovieGenres();
        setMovieLists(data);
        setMovieGenres(genres);
      } catch (error: any) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  //console.log(movieLists);

  //skeleton loading
  const placeholders = Array.from({ length: movieLists.length }).map(
    (index) => {
      return <Skeleton />;
    }
  );

  //search
  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    const data = await searchMovies(searchQuery);
    setMovieLists(data);
    setLoading(false);
  };

  //handle change
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  //by geners
  const handleSearchByGenres = async (query: string) => {
    const response = await fetchMovieByGenres(query);
    setMovieLists(response);
    setActiveGenre(query === activeGenre ? null : query);
  };

  return (
    <>
      <form
        className="grid grid-cols-2 gap-5 m-16 mb-6 content-center"
        onSubmit={handleSearch}>
        <input
          className="w-auto h-5 p-6 rounded-lg border-2	"
          type="text"
          id="search"
          name="search"
          placeholder="Search by movie name"
          value={searchQuery}
          onChange={handleOnChange}
          required
        />
        <button
          type="submit"
          className="bg-fuchsia-700 hover:bg-fuchsia-800 w-20 rounded text-white">
          Search
        </button>
      </form>

      <h3 className="text-xl font-bold px-16">Genres</h3>
      <div className="mt-4 mx-16 mb-8 flex flex-wrap flex-row lg:gap-6 gap-4">
        {movieGenres &&
          movieGenres.slice(0, 14).map((genre: MovieGenresProps) => {
            const isActive = activeGenre == genre.name;
            return (
              <button
                className={`rounded-2xl text-center border-2 text-md sm:text-md lg:w-auto w-auto p-1 sm:p-2 drop-shadow-md cursor-pointer mt-2 ${
                  isActive
                    ? "bg-fuchsia-500 text-white border-fuchsia-500"
                    : "border-fuchsia-500 text-fuchsia-500"
                } hover:bg-fuchsia-400 hover:text-white`}
                key={genre.id}
                onClick={() => handleSearchByGenres(genre.name)}>
                {genre.name}
              </button>
            );
          })}
      </div>

      <h3 className="text-2xl font-bold px-16 mt-6">Trending Movies</h3>
      <div className="p-16 grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-20">
        {!loading
          ? movieLists &&
            movieLists?.map((movie: any) => {
              return (
                <Card
                  id={movie.id}
                  title={movie.title}
                  overview={movie.overview}
                  poster_path={movie.poster_path}
                  vote_average={movie.vote_average}
                />
              );
            })
          : placeholders}
      </div>
      {!loading && movieLists && movieLists.length === 0 && (
        <b className="flex justify-center">No movies at the moment.</b>
      )}
    </>
  );
};

export default page;
