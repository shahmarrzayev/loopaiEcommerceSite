import styles from "./ProductDetailPrImagesSlider.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation"; 
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";

import ArrowRightIcon from "../../assets/icons/ArrowRightIcon";
import ArrowLeftIcon from "../../assets/icons/ArrowLeftIcon";
import FreeDeliveryIconTwo from "../../assets/icons/FreeDeliveryIconTwo";
import unistoreSite from "../../Helpers/helpers";

export default function ProductDetailPrImagesSlider({ images, productPrice }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
 
  return (
    <div className={styles.prImgSlider}>
      <Swiper
        loop={false}
        spaceBetween={10}
        navigation={{
          nextEl: ".prDetailNextBtn",
          prevEl: ".prDetailPrevBtn",
        }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Thumbs, Navigation]}
        className={styles.activeLargeImage}
      >
        {images?.map((img, i) => (
          <SwiperSlide key={i}>
           <img src={img} />
          </SwiperSlide>
        ))}
       {productPrice > 1000 && <span className={styles.freeDelivery}><FreeDeliveryIconTwo color={"#1f71a9"}/> Pulsuz çatdırılma</span>}
      </Swiper>
      <div className={styles.littleSliderImagesWrapper}>
        <Swiper
          onSwiper={setThumbsSwiper}  
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          slideToClickedSlide={true}
          modules={[FreeMode, Thumbs]}
          className={styles.sliderLittleImgWrapper}
        >
          {images?.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="prDetailPrevBtn">
          <ArrowLeftIcon />
        </div>

        <div className="prDetailNextBtn">
          <ArrowRightIcon />
        </div>
      </div>
    </div>
  );
}
