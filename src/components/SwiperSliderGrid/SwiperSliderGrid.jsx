// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import PrCart from "../PrCart/PrCart";
import { Grid, Navigation } from "swiper/modules";
import { Autoplay } from "swiper/modules";

export default function SwiperSliderGrid({ sliderData }) {
  // console.log("sliderrrrrr-", sliderData);
  
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={20}
      grid={{
        rows: 2,
        fill: "row",
      }}
      pagination={{
        clickable: true,
      }}

      speed={5000}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
      }}
      modules={[Grid, Navigation,Autoplay]}
      breakpoints={{
        520: {
          slidesPerView: 2,
        },
        770: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1050: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }}
      // className="gridSwiperSlider"
    >
      {sliderData?.map((item) => (
        <SwiperSlide key={item.id}>
          <PrCart data={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
