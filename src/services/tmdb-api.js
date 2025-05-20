import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZmJlNDdmNmZlYmNjNzM4MzgzMmNjNzBlNWM3ZTFmZCIsIm5iZiI6MTc0NzY1ODA1NC4yMiwic3ViIjoiNjgyYjI1NDZhZGY1N2NhNzA5ZjU1ZDQ4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.x_Gl87zN41L_pi1AHWnJ4VDYYEZ9UYOuA_S_yTAKbK8";

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export const getTrendingMovies = async () => {
  try {
    const response = await tmdbApi.get("/trending/movie/day?language=en-US");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await tmdbApi.get(
      `/search/movie?include_adult=false&language=en-US&page=1&query=${encodeURIComponent(
        query
      )}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}?language=en-US`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const getMovieCredits = async (movieId) => {
  try {
    const response = await tmdbApi.get(
      `/movie/${movieId}/credits?language=en-US`
    );
    return response.data.cast;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    throw error;
  }
};

export const getMovieReviews = async (movieId) => {
  try {
    const response = await tmdbApi.get(
      `/movie/${movieId}/reviews?language=en-US&page=1`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    throw error;
  }
};

export const getImageUrl = (imagePath, size = "w500") => {
  if (!imagePath) return "/api/placeholder/400/600";
  return `https://image.tmdb.org/t/p/${size}${imagePath}`;
};
