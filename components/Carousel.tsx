"use client";
import React, { useEffect, useState } from "react";
import "@/app/globals.css";
import defaultImage from "../public/movie-popcorn.jpeg";
import Image from "next/image";
import { fetchUpcomingMovies } from "@/helper/movies";

interface UpcomingMovies {
  id: number;
  poster_path: string;
  title: string;
}

const Carousel = () => {
  const [imageLists, setImageLists] = useState<UpcomingMovies[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await fetchUpcomingMovies();
        setImageLists(data);
      } catch (error: any) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="overflow-hidden w-screen">
      <div className="marquee flex animate-marquee gap-4 md:gap-10 lg:gap-20 xl:gap-20">
        {imageLists &&
          imageLists.map((image: UpcomingMovies) => {
            return (
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${image.poster_path}`}
                alt={image.title}
                width={100}
                height={90}
                key={image.id}
                className="flex rounded-lg w-60 h-60 mx-auto"
              />
            );
          })}
      </div>
    </div>
  );
};

export default Carousel;
