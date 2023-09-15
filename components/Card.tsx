import Image from "next/image";
import React from "react";
import defaultImage from "../public/movie-popcorn.jpeg";
export interface CardProps {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

const Card = ({id, title, backdrop_path, overview, poster_path, release_date,vote_average}: CardProps) => {

  const src = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : defaultImage;

  return (
    <div className="container p-2 w-80 h-96 rounded-md bg-card flex flex-col gap-3 border" key={id}>
      <Image
        src={src}
        alt={title}
        width={90}
        height={90}
        className="flex rounded-lg w-52 h-60 mx-auto"
      />
      <h3 className="text-xl text-center">{title}</h3>
      <p className="text-center">{overview.substring(0,60)}...</p>
    </div>
  );
};

export default Card;
