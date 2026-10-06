import styles from "./About.module.scss"
import aboutUnistoreImage from "../../assets/images/aboutUnistoreImage.jpeg"
import OurAdvantages from "../../components/HomePageSections/OurAdvantages/OurAdvantages"

export default function About() {
  return (
    <div className={styles.aboutPageWrapper}>
              <h4 className={styles.titleTop}>Unistore haqqında</h4>
              <p className={styles.unistoreInfo}>
Unistore.az – rəqəmsal və məişət texnikası dünyasındakı etibarlı bələdçinizdir. Biz, müştərilərimizə qabaqcıl texnologiyaları,  məişət avadanlıqlarını və aksesuarları ən uyğun şərtlərlə təqdim edirik. Məqsədimiz – yüksək keyfiyyətli məhsulları, rəsmi istehsalçı zəmanəti və peşəkar xidmət səviyyəsi ilə hər bir ev və iş yeri üçün əlçatan etməkdir. Unistore.az ilə texnologiya artıq daha yaxındır!
              </p>
              <div className="container">
              <div className={styles.aboutUnistoreImageWrapper}>
              <img src={aboutUnistoreImage} alt="" />
              </div>
              </div>
     <h4 className={styles.titleBottom}>Niyə bizi seçməlisiniz?</h4>
      <OurAdvantages/>
    </div>
  )
}  
