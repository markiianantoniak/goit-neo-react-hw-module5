import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Page Not Found</h2>
        <p className={styles.message}>
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className={styles.homeLink}>
          Go to Home Page
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
