import styles from "./NewArrivals.module.scss"
import SwiperSliderGrid from "../../SwiperSliderGrid/SwiperSliderGrid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";


export default function NewArrivals({ newArrivalsDatas }) {

  return (
    <div className="container">
      <div className={styles.titleBrendSlider}>
        <h4 className={styles.newArrivalsSectionTitle}>
         Yeni gələnlər
        </h4>
      </div>
      <SwiperSliderGrid sliderData={newArrivalsDatas} />
    </div>
  );
}
