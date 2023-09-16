"use client";
import { fetchMovieDetails } from "@/helper/movies";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Genre = {
  id: number;
  name: string;
};

interface MovieDetailsProps {
  id: number;
  overview: string;
  poster_path: string | undefined;
  title: string;
  vote_average: number;
  genres: Genre[] | undefined;
}

const MovieDetails = () => {
  const parmas: any = useParams();
  const [details, setDetails] = useState<MovieDetailsProps>();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetchMovieDetails(parmas.id);
        setDetails(response);
      } catch (error: any) {
        console.error("Error fetching details movies:", error);
      }
    };
    fetchDetails();
  }, []);

  return (
    <div>
      {details ? (
        <div className="p-16 flex flex-row gap-20">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${details.poster_path}`}
            height={200}
            width={300}
            alt={details.title}
            className="rounded-md"
          />
          <div>
            <h3 className="text-3xl font-medium">{details.title}</h3>
            <div className="mt-3 grid grid-cols-4 gap-2 ">
              {details.genres &&
                details.genres.map((genre: Genre) => {
                  return (
                    <p className="rounded-full text-center border-2 border-fuchsia-300 bg-fuchsia-400 text-white text-sm w-auto p-1 drop-shadow-md">
                      {genre.name}
                    </p>
                  );
                })}
            </div>
          </div>
        </div>
      ) : (
        <b className="text-xl flex justify-center">Loading...</b>
      )}
    </div>
  );
};

export default MovieDetails;
