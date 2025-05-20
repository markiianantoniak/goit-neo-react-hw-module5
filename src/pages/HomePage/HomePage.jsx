import { useState, useEffect } from "react";
import { getTrendingMovies } from "../../services/tmdb-api";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const trendingMovies = await getTrendingMovies();
        setMovies(trendingMovies || []);
      } catch (err) {
        setError("Failed to fetch trending movies. Please try again later.");
        console.error("Error fetching trending movies:", err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div className={styles.homePage}>
      <h1 className={styles.title}>Trending Movies</h1>

      {loading && (
        <div className={styles.loader}>Loading trending movies...</div>
      )}

      {error && <div className={styles.error}>{error}</div>}

      {movies && movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;
