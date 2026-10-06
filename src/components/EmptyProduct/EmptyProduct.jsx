import { NavLink } from "react-router-dom"
import styles from "./EmptyProduct.module.scss"

export default function EmptyProduct({icon,title,shortInfo,pageLinkBtnTitle, pageLinkUrl}) {
  return (
    <div className={styles.emptyProductArea}>
      <span className={styles.icon}>{icon}</span>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.shortInfo}>{shortInfo}</p>
     <NavLink to={pageLinkUrl} className={styles.pageLinkBtn}>{pageLinkBtnTitle}</NavLink>
    </div>
  )
}
  