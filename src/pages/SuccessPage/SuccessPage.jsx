import { Link, useLocation } from "react-router-dom"
import styles from "./SuccessPage.module.scss"
import SuccessIcon from "../../assets/icons/SuccessIcon";

export default function SuccessPage() {
  const location = useLocation();
  const info = location.state.info;
  
  return (
    <div className={styles.successPageWrapper}>
          <SuccessIcon />
          <span className={styles.successInfo}>{info ? info : "Əməliyyat uğurlu oldu"}</span>
           <Link to="/" className={styles.homePageLink}>Əsas səhifə</Link>
    </div>
  )
}
