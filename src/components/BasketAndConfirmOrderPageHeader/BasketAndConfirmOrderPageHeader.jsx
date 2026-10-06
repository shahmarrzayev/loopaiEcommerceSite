import styles from "./BasketAndConfirmOrderPageHeader.module.scss"

export default function BasketAndConfirmOrderPageHeader({title}) {
    return (
      <div className={styles.basketAndConfirmOrderPageHeaderWrapper}>
            <h3 className={styles.pageTitle}>{title}</h3>
        {/* <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.oneNumber}>1</span>Səbətdə
          </div>
          <span className={styles.middleLine}></span>
          <div className={styles.headerRight}>
            <span className={styles.twoNumber}>2</span>Sifarişin təsdiqi
          </div>
        </div> */}
      </div>
    );
}
