import Image from "next/image";
import React from "react";
import defaultImage from "../public/movie-popcorn.jpeg";
import Link from "next/link";
export interface CardProps {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
}

const Card = ({
  id,
  title,
  overview,
  poster_path,
  vote_average,
}: CardProps) => {
  const src = poster_path
    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${poster_path}`
    : defaultImage;

  return (
    <Link href={`/movies/${id}`}>
      <div
        className="container p-2 w-80 h-96 rounded-md bg-card flex flex-col gap-3 border hover:bg-hover cursor-pointer"
        key={id}>
        <Image
          src={src}
          alt={title}
          width={90}
          height={90}
          className="flex rounded-lg w-52 h-60 mx-auto"
        />
        <h3 className="text-xl text-center">{title}</h3>
        <p className="text-center">{overview?.substring(0, 60)}...</p>
      </div>
    </Link>
  );
};

export default Card;
