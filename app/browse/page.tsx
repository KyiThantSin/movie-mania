"use client";
import Card, { CardProps } from "@/components/Card";
import Skeleton from "@/components/Skeleton";
import { fetchMovies, searchMovies } from "@/helper/movies";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

const page = () => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [movieLists, setMovieLists] = useState<CardProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMovies();
        setMovieLists(data);
      } catch (error) {
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
  const handleSearch = async(e:FormEvent) => {
    e.preventDefault();
    const data = await searchMovies(searchQuery);
    setMovieLists(data);
    setLoading(false);
  };

  //handle change
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <form className="grid grid-cols-2 gap-5 m-16 content-center" onSubmit={handleSearch}>
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
      <h3 className="text-2xl font-bold px-16">Trending Movies</h3>
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
