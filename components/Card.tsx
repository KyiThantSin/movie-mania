import Image from "next/image";
import React from "react";

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
  return (
    <div className="container p-5 w-80 h-96 rounded-md bg-card flex justify-center flex-col gap-5" key={id}>
      <Image
        src={''}
        alt={title}
        width={60}
        height={60}
        className="flex rounded-lg justify-center"
      />
      <h3 className="text-xl text-center">{title}</h3>
      <p className="text-center">{overview.substring(0,90)}...</p>
    </div>
  );
};

export default Card;
