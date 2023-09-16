import axios from "axios";

export const fetchMovies = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/trending/movie/day?language=en-US`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
      }
    );
    if (response.data) {
      console.log(response.data.results);
      return response.data.results
    }
  } catch (err: any) {
    console.log("fetch movies error", err.response);
    return []
  }
};

export const searchMovies = async (query: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/search/movie?query=${query}&include_adult=${false}&language=en-US`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
      }
    );
    if (response.data) {
      console.log(response.data.results);
      return response.data.results
    }
  } catch (err: any) {
    console.log("search movies error", err.response);
    return []
  }
}

export const fetchMovieDetails = async(id: number) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/movie/${id}?language=en-US`,
      {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
      }
    );
    if(response.data) {
      console.log(response.data);
      return response.data
    }
  } catch (err: any) {
    console.log("fetch movies details error", err.response);
    return []
  }
}