"use client";
import { fetchMovieDetails, fetchTrailer } from "@/helper/movies";
import Image from "next/image";
import React, { MouseEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Genre = {
  id: number;
  name: string;
};

type Trailer = {
  key: string;
  id: number;
};
interface MovieDetailsProps {
  id: number;
  overview: string;
  poster_path: string | undefined;
  backdrop_path: string | undefined;
  title: string;
  vote_average: number;
  genres: Genre[] | undefined;
  release_date: string;
}

const MovieDetails = () => {
  const parmas: any = useParams();
  const [details, setDetails] = useState<MovieDetailsProps>();
  const [trailer, setTrailer] = useState<Trailer | undefined>();
  const [openTrailer, setOpenTrailer] = useState<Boolean>(true);
  const [iframeLoaded, setIframeLoaded] = useState<Boolean>(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetchMovieDetails(parmas.id);
        const trailerUrl = await fetchTrailer(parmas.id);
        setDetails(response);
        setTrailer(trailerUrl);
      } catch (error: any) {
        console.error("Error fetching details movies:", error);
      }
    };
    fetchDetails();
  }, []);

  //handle view trailer
  const trailerHandler = (e: MouseEvent<HTMLButtonElement>) => {
    //console.log("run");
    setOpenTrailer(!openTrailer);
  };

  return (
    <div className="p-24 flex flex-row gap-10 flex-wrap">
      {details && (
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${details.poster_path}`}
          height={350}
          width={350}
          alt={details.title}
          className="w-container h-4/5 rounded-lg "
        />
      )}
      {details ? (
        <div className="w-3/5 xs:w-screen">
          <div className="static">
            <h3 className="text-3xl font-medium">{details.title}</h3>
            <div className=" bg-yellow-400 absolute lg:w-16 lg:h-16 md:w-10 md:h-10 text-center p-2 text-3xl text-white right-8 ">
              {details.vote_average?.toFixed(1)}
            </div>
            <div className="mt-6 grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-3 gap-2 w-1/2 ">
              {details.genres &&
                details.genres.map((genre: Genre) => {
                  return (
                    <p className="rounded-full text-center border-2 border-fuchsia-300 bg-fuchsia-500 text-white text-sm w-auto p-1 drop-shadow-md">
                      {genre.name}
                    </p>
                  );
                })}
            </div>
            <h4 className="mt-6 text-xl font-bold">Overview</h4>
            <p className="mt-2">{details.overview}</p>
            <p className="mt-8 text-zinc-700">
              <b>Relased Date:</b> {details.release_date}{" "}
            </p>
            <button
              className="mt-6 bg-blue-600 text-md p-3 w-64 h-12 cursor-pointer rounded hover:bg-blue-600 text-white"
              onClick={trailerHandler}>
              Watch Trailer
            </button>

            <div className="mt-8">
              {!iframeLoaded && !openTrailer && (
                <div className="w-full h-full flex items-center justify-center text-xl p-8">
                  Loading...
                </div>
              )}
              {!openTrailer && (
                <iframe
                  height="315"
                  src={`${process.env.NEXT_PUBLIC_TRAILER_URL}embed/${trailer?.key}`}
                  title={details.title}
                  className="sm:w-4/5 md:w-full lg:w-3/5"
                  onLoad={() => setIframeLoaded(true)}
                  allowFullScreen></iframe>
              )}
            </div>
          </div>
        </div>
      ) : (
        <b className="flex justify-center text-center">Loading...</b>
      )}
    </div>
  );
};

export default MovieDetails;
