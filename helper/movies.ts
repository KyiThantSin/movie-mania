import axios from "axios";

export const fetchMovies = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/discover/movie`,
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
