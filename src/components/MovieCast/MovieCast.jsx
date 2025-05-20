import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits, getImageUrl } from "../../services/tmdb-api";
import styles from "./MovieCast.module.css";

const MovieCast = () => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        setLoading(true);
        setError(null);
        const castData = await getMovieCredits(movieId);
        setCast(castData);
      } catch (err) {
        setError("Failed to load cast information. Please try again.");
        console.error("Error fetching movie cast:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieCast();
  }, [movieId]);

  if (loading) {
    return <div className={styles.loader}>Loading cast...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!cast || cast.length === 0) {
    return (
      <div className={styles.noCast}>
        We don't have any cast information for this movie.
      </div>
    );
  }

  return (
    <ul className={styles.castList}>
      {cast.map((actor) => (
        <li key={actor.id} className={styles.castItem}>
          <img
            src={getImageUrl(actor.profile_path)}
            alt={actor.name}
            className={styles.actorPhoto}
          />
          <div className={styles.actorInfo}>
            <p className={styles.actorName}>{actor.name}</p>
            <p className={styles.character}>
              Character: {actor.character || "Unknown"}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
