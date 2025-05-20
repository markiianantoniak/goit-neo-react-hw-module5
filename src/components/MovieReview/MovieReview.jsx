import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../services/tmdb-api";
import styles from "./MovieReview.module.css";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const reviewsData = await getMovieReviews(movieId);
        setReviews(reviewsData);
      } catch (err) {
        setError("Failed to load reviews. Please try again.");
        console.error("Error fetching movie reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  if (loading) {
    return <div className={styles.loader}>Loading reviews...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className={styles.noReviews}>
        We don't have any reviews for this movie.
      </div>
    );
  }

  return (
    <ul className={styles.reviewsList}>
      {reviews.map((review) => (
        <li key={review.id} className={styles.reviewItem}>
          <div className={styles.reviewHeader}>
            <h4 className={styles.reviewAuthor}>Author: {review.author}</h4>
            {review.author_details?.rating && (
              <span className={styles.reviewRating}>
                Rating: {review.author_details.rating}/10
              </span>
            )}
          </div>
          <p className={styles.reviewContent}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
