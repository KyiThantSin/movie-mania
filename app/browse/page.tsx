'use client'
import Card, { CardProps } from "@/components/Card";
import Skeleton from "@/components/Skeleton";
import { fetchMovies } from "@/helper/movies";
import React, { useEffect, useState } from "react";
                 
const page = () => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [movieLists, setMovieLists] = useState<CardProps[]>([]);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const data = await fetchMovies();
        setMovieLists(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }finally{
        setLoading(false)
      }
    }
    fetchData();
  }, []);
  console.log(movieLists)

  const placeholders = Array.from({length : movieLists.length}).map((index) => {
    return (
      <Skeleton />
    )
  })

  return (
    <>
    <div className="p-16 grid grid-cols-4 gap-20">
      { !loading ? movieLists && movieLists?.map((movie: any) => {
        return (
          <Card id={movie.id} title={movie.title} backdrop_path={movie.backdrop_path} overview={movie.overview} poster_path={movie.poster_path} release_date={movie.release_date} vote_average={movie.vote_average}/>
        )
      }) : placeholders }
    </div>
    { !loading && movieLists && movieLists.length === 0 && <b className="flex justify-center">No movies at the moment.</b>}
    </>
  );
};

export default page;
