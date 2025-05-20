import { Link, useLocation } from "react-router-dom";
import { getImageUrl } from "../../services/tmdb-api";
import styles from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();
  if (!movies || movies.length === 0) {
    return null;
  }
  return (
    <ul className={styles.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.movieItem}>
          <Link
            to={`/movies/${movie.id}`}
            state={location}
            className={styles.movieLink}
          >
            <h3 className={styles.movieTitle}>{movie.title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
