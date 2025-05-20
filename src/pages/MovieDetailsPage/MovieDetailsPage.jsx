import { useState, useEffect, useRef } from "react";
import {
  useParams,
  Link,
  Outlet,
  useLocation,
  NavLink,
} from "react-router-dom";
import { getMovieDetails } from "../../services/tmdb-api";
import { getImageUrl } from "../../services/tmdb-api";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  const backLocationRef = useRef(location.state || "/movies");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const movieData = await getMovieDetails(movieId);
        setMovie(movieData);
      } catch (err) {
        setError("Failed to load movie details. Please try again.");
        console.error("Error fetching movie details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return <div className={styles.loader}>Loading movie details...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!movie) {
    return null;
  }

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "Unknown";

  const userScore = movie.vote_average
    ? Math.round(movie.vote_average * 10)
    : 0;

  return (
    <div className={styles.movieDetails}>
      <Link to={backLocationRef.current} className={styles.backLink}>
        ← Go back
      </Link>

      <div className={styles.movieInfo}>
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className={styles.poster}
        />

        <div className={styles.details}>
          <h1 className={styles.title}>
            {movie.title} ({releaseYear})
          </h1>

          <p className={styles.score}>User Score: {userScore}%</p>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Overview</h2>
            <p className={styles.overview}>
              {movie.overview || "No overview available."}
            </p>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Genres</h2>
            <ul className={styles.genreList}>
              {movie.genres && movie.genres.length > 0 ? (
                movie.genres.map((genre) => (
                  <li key={genre.id} className={styles.genre}>
                    {genre.name}
                  </li>
                ))
              ) : (
                <li>No genres available</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.additionalInfo}>
        <h3 className={styles.additionalTitle}>Additional information</h3>
        <nav className={styles.subNav}>
          <NavLink
            to="cast"
            className={({ isActive }) =>
              isActive
                ? `${styles.subNavLink} ${styles.active}`
                : styles.subNavLink
            }
          >
            Cast
          </NavLink>
          <NavLink
            to="reviews"
            className={({ isActive }) =>
              isActive
                ? `${styles.subNavLink} ${styles.active}`
                : styles.subNavLink
            }
          >
            Reviews
          </NavLink>
        </nav>

        <Outlet />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
