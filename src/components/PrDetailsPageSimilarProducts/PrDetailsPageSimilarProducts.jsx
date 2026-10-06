import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import PrCart from "../PrCart/PrCart";
import styles from "./PrDetailsPageSimilarProducts.module.scss"

export default function PrDetailsPageSimilarProducts({ similarProductsDatas }) {
  return (
    <div className={styles.similarPrSliderWrapper}>
      <Swiper
        slidesPerView={2}
        spaceBetween={20}
        autoplay={{  
          delay: 10,
        }}
        loop={true}
        speed={3000}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          420: {
            slidesPerView: 2,
          },
          620: {
            slidesPerView: 3,
          },
          950: {
            slidesPerView: 3,
          },
          1300: {
            slidesPerView: 4,
          },
        }}
        modules={[Autoplay]}
        className={styles.similarSlider}
      >
        {similarProductsDatas?.map((item) => (
          <SwiperSlide key={item.id}>
            <PrCart data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
