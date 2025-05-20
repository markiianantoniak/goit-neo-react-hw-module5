import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../services/tmdb-api";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const searchResults = await searchMovies(query);
        setMovies(searchResults);
      } catch (err) {
        setError("Failed to search movies. Please try again.");
        console.error("Error searching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchQuery = form.elements.query.value.trim();

    if (!searchQuery) {
      setSearchParams({});
      return;
    }

    setSearchParams({ query: searchQuery });
  };

  return (
    <div className={styles.moviesPage}>
      <h1 className={styles.title}>Movie Search</h1>

      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder="Search for movies..."
          className={styles.searchInput}
          autoComplete="off"
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

      {loading && <div className={styles.loader}>Searching movies...</div>}

      {error && <div className={styles.error}>{error}</div>}

      {query && movies.length === 0 && !loading && !error && (
        <div className={styles.noResults}>
          No movies found for "{query}". Try a different search term.
        </div>
      )}

      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
