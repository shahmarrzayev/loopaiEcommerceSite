import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.scss"
import ErrorIcon from "../../assets/icons/ErrorIcon";

export default function ErrorPage() {
  return (
    <div className={styles.errorPage}>
      <ErrorIcon />
      <span className={styles.errorInfo}>Xəta baş verdi</span>
      <Link to="/" className={styles.homePageLink}>
        Əsas səhifə
      </Link>
    </div>
  );
}
