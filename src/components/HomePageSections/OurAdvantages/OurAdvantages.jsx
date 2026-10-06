import { ourAdvantagesDatas } from "../../../localeDatas/datas";
import styles from "./OurAdvantages.module.scss"
 
export default function OurAdvantages() {
  return (
    <div className={styles.ourAdvantagesSection}>
      <div style={{paddingTop:0}} className="container">
        <div className={styles.ourAdvantagesContents}>
          {ourAdvantagesDatas.map((item) => (
            <div className={styles.ourAdvantageCart} key={item.id}>
              <span className={styles.icon}>{item.icon}</span>
              <div className={styles.info}>
                <h4 className={styles.title}>{item.title}</h4>
                <p className={styles.shortInfo}>{item.shortInfo}</p>
              </div>
            </div>
          ))}
        </div> 
      </div>
    </div>
  );
} 
