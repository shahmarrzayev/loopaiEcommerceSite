import styles from "./MainBannersMobileSwiperSlider.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function MainBannersMobileSwiperSlider({mobileSliderData}) {

  const [loadedImages, setLoadedImages] = useState({});

  const handleLoad = (index) => { 
    setLoadedImages((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  return (
    <Swiper
      pagination={{ clickable: true }}
      spaceBetween={10}
      autoplay={{ delay: 2000 }}
      speed={1200}
      effect="fade"
      loop={true}
      modules={[EffectFade, Pagination, Autoplay]}
      className="mobileSlider"
    >
      {mobileSliderData?.map((item, index) => {
        const isLoaded = loadedImages[index];

        return (
          <SwiperSlide key={item.index || index}>
            {!isLoaded && (
              <div className={styles.loadingArea}>
                <div className={styles.loadingAnimate}></div>
              </div>
            )}
            
            <Link className={styles.cartSlider} to={item.targetUrl}>
              <img
                style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.3s" }}
                onLoad={() => handleLoad(index)}
                onError={() => handleLoad(index)} 
                src={item.image}
                loading="lazy"
                alt="banner"
              />
            </Link>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}