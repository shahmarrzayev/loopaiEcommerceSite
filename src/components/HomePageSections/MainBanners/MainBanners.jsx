// api versiyon
// import { Link } from "react-router-dom";
// import styles from "./MainBanners.module.scss";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination, EffectFade } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/effect-fade";
// import "swiper/css/pagination";

// import { useState } from "react";

// import unistoreSite from "../../../Helpers/helpers";
// import loadingGif from "../../../assets/images/loadingGift.gif";

// import MainBannersMobileSwiperSlider from "../MainBannersMobileSwiperSlider/MainBannersMobileSwiperSlider";

// export default function MainBanners({ mainBannersData }) {
//   const [imageLoaded, setImageLoaded] = useState({
//     slider: {},
//     rightBanner: {},
//   });

//   const sliderBannerData = mainBannersData?.homeSliderBanner || [];

//   const rightBannerData =
//     mainBannersData?.homeTopBannerBottomSide || [];

//   const handleSliderImageLoad = (index) => {
//     setImageLoaded((prev) => ({
//       ...prev,
//       slider: {
//         ...prev.slider,
//         [index]: true,
//       },
//     }));
//   };

//   const handleRightBannerLoad = (index) => {
//     setImageLoaded((prev) => ({
//       ...prev,
//       rightBanner: {
//         ...prev.rightBanner,
//         [index]: true,
//       },
//     }));
//   };

//   return (
//     <div className="container">
//       <div className={styles.mainBannersWebWrapper}>
//         <div className={styles.mainBannersLeft}>
//           <Swiper
//             modules={[Autoplay, Pagination, EffectFade]}
//             autoplay={{
//               delay: 2000,
//               disableOnInteraction: false,
//             }}
//             speed={1200}
//             effect="fade"
//             loop={sliderBannerData.length > 1}
//             pagination={{
//               clickable: true,
//             }}
//             className={styles.leftSlider}
//           >
//             {sliderBannerData.map((item, index) => (
//               <SwiperSlide key={item?.id || index}>
//                 <Link
//                   to={item?.targetUrl || "#"}
//                   className={styles.sliderBanner}
//                 >
//                   {!imageLoaded.slider[index] && (
//                     <img
//                       src={loadingGif}
//                       className={styles.loadingImg}
//                       alt="loading"
//                     />
//                   )}

//                   {/* Banner */}
//                   <img
//                     src={`${unistoreSite.baseUrlImage}slider/${item?.image}`}
//                     alt={item?.title || ""}
//                     className={styles.bannerImage}
//                     onLoad={() => handleSliderImageLoad(index)}
//                     style={{
//                       opacity: imageLoaded.slider[index] ? 1 : 0,
//                     }}
//                   />
//                 </Link>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>

//         {/* ================= RIGHT / 2 BANNERS ================= */}
//         <div className={styles.mainBannersRight}>
//           {rightBannerData.slice(0, 2).map((item, index) => (
//             <Link
//               key={item?.id || index}
//               to={item?.targetUrl || "#"}
//               className={styles.rightBanner}
//             >
//               {/* Loading */}
//               {!imageLoaded.rightBanner[index] && (
//                 <img
//                   src={loadingGif}
//                   className={styles.loadingImg}
//                   alt="loading"
//                 />
//               )}

//               {/* Banner */}
//               <img
//                 src={`${unistoreSite.baseUrlImage}slider/${item?.image}`}
//                 alt={item?.title || ""}
//                 className={styles.bannerImage}
//                 onLoad={() => handleRightBannerLoad(index)}
//                 style={{
//                   opacity: imageLoaded.rightBanner[index] ? 1 : 0,
//                 }}
//               />
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* ================= MOBILE ================= */}
//       <div className={styles.mobileMainBannersWrapper}>
//         <MainBannersMobileSwiperSlider
//           mobileSliderData={mainBannersData?.homeSliderBanner}
//         />
//       </div>
//     </div>
//   );
// }
// -------------

import { Link } from "react-router-dom";
import styles from "./MainBanners.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import { useState } from "react";

import loadingGif from "../../../assets/images/loadingGift.gif";
import { homeMainBannersData } from "../../../localeDatas/datas";

import MainBannersMobileSwiperSlider from "../MainBannersMobileSwiperSlider/MainBannersMobileSwiperSlider";

export default function MainBanners({ mainBannersData }) {
  const [imageLoaded, setImageLoaded] = useState({
    slider: {},
    rightBanner: {},
  });
 const homeLeftSliderDatas = homeMainBannersData.slice(0,5)
 const homeRightBannerDatas = homeMainBannersData.slice(5)
 

  const handleSliderImageLoad = (index) => {
    setImageLoaded((prev) => ({
      ...prev,
      slider: {
        ...prev.slider,
        [index]: true,
      },
    }));
  };

  const handleRightBannerLoad = (index) => {
    setImageLoaded((prev) => ({
      ...prev,
      rightBanner: {
        ...prev.rightBanner,
        [index]: true,
      },
    }));
  };

  return (
    <div className="container">
      <div className={styles.mainBannersWebWrapper}>
        <div className={styles.mainBannersLeft}>
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            speed={1200}
            effect="fade"
            loop={homeLeftSliderDatas.length > 1}
            pagination={{
              clickable: true,
            }}
            className={styles.leftSlider}
          >
            {homeLeftSliderDatas.map((item, index) => (
              <SwiperSlide key={item?.id || index}>
                <Link
                  to={item?.targetUrl || "#"}
                  className={styles.sliderBanner}
                >
                  {!imageLoaded.slider[index] && (
                    <img
                      src={loadingGif}
                      className={styles.loadingImg}
                      alt="loading"
                    />
                  )}

                  {/* Banner */}
                  <img
                    src={item.image}
                    alt={item?.title || ""}
                    className={styles.bannerImage}
                    onLoad={() => handleSliderImageLoad(index)}
                    style={{
                      opacity: imageLoaded.slider[index] ? 1 : 0,
                    }}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ================= RIGHT / 2 BANNERS ================= */}
        <div className={styles.mainBannersRight}>
          {homeRightBannerDatas.map((item, index) => (
            <Link
              key={item?.id || index}
              to={item?.targetUrl || "#"}
              className={styles.rightBanner}
            >
              {/* Loading */}
              {!imageLoaded.rightBanner[index] && (
                <img
                  src={loadingGif}
                  className={styles.loadingImg}
                  alt="loading"
                />
              )}

              {/* Banner */}
              <img
                src={item.image}
                alt={item?.title || ""}
                className={styles.bannerImage}
                onLoad={() => handleRightBannerLoad(index)}
                style={{
                  opacity: imageLoaded.rightBanner[index] ? 1 : 0,
                }}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className={styles.mobileMainBannersWrapper}>
        <MainBannersMobileSwiperSlider
          mobileSliderData={homeLeftSliderDatas}
        />
      </div>
    </div>
  );
}




// locale versiyon
// import { Link } from "react-router-dom";
// import styles from "./MainBanners.module.scss";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css/effect-fade";
// import "swiper/css";
// import { Autoplay, Pagination, EffectFade } from "swiper/modules";
// import MainBannersMobileSwiperSlider from "../MainBannersMobileSwiperSlider/MainBannersMobileSwiperSlider";
// import { homeWebMainBannersData } from "../../../localeDatas/datas";
// import { useState } from "react";

// export default function MainBanners() {
//   const [loadedImages, setLoadedImages] = useState({
//     sliderLeftTop: true,
//     leftBottom: true,
//     rightTop: true,
//     rightBottom: true,
//   });
//   const leftTopBannersData = homeWebMainBannersData.slice(0, 6);
//   const leftBottomBannersData = homeWebMainBannersData.slice(8);

//   const handleLoad = (key) => {
//     setLoadedImages((prev) => ({
//       ...prev,
//       [key]: false,
//     }));
//   };

//   return (
//     <div className="container">
//       <div className={styles.mainBannersWebWrapper}>
//         <div className={styles.mainBannersLeft}>
//           <Swiper
//             spaceBetween={30}
//             modules={[Autoplay, Pagination, EffectFade]}
//             autoplay={{ delay: 2000 }}
//             speed={1200}
//             effect="fade"
//             loop={true}
//             pagination={loadedImages["sliderLeftTop"] ? false : true}
//             className={styles.leftTopSliderWrapper}
//           >
//             {leftTopBannersData.map((item, index) => (
//               <SwiperSlide key={index}>
//                 <Link to={item.targetUrl} className={styles.sliderLeftTop}>
//                   {loadedImages["sliderLeftTop"] && (
//                     <div className={styles.loadingTopSliderImg}>
//                       <div className={styles.loadingAnimate}></div>
//                     </div>
//                   )}
//                   <img
//                     src={item.image}
//                     style={{ opacity: loadedImages["sliderLeftTop"] ? 0 : 1 }}
//                     onLoad={() => handleLoad("sliderLeftTop")}
//                     onError={() => handleLoad("sliderLeftTop")}
//                     loading="lazy"
//                     alt=""
//                   />
//                 </Link>
//               </SwiperSlide>
//             ))}
//           </Swiper>

//           <div className={styles.sliderLeftBottomWrapper}>
//             {leftBottomBannersData.map((item, index) => (
//               <div className={styles.leftBottomSmallImages} key={index}>
//                 {loadedImages["leftBottom"] && (
//                   <div className={styles.loadingLeftBottomImages}>
//                     <div className={styles.loadingAnimate}></div>
//                   </div>
//                 )}
//                 <Link to={item?.targetUrl} key={index}>
//                   <img
//                     style={{ opacity: loadedImages["leftBottom"] ? 0 : 1 }}
//                     onLoad={() => handleLoad("leftBottom")}
//                     onError={() => handleLoad("leftBottom")}
//                     src={item.image}
//                     loading="lazy"
//                     alt=""
//                   />
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className={styles.mainBannersRight}>
//           <Link
//             to={homeWebMainBannersData?.[6].targetUrl}
//             className={styles.rightTop}
//           >
//             {loadedImages["rightTop"] && (
//               <div className={styles.rightTopLoading}>
//                 <div className={styles.loadingAnimate}></div>
//               </div>
//             )}
//             <img
//               style={{ opacity: loadedImages["rightTop"] ? 0 : 1 }}
//               onLoad={() => handleLoad("rightTop")}
//               onError={() => handleLoad("rightTop")}
//               src={homeWebMainBannersData?.[6].image}
//               loading="lazy"
//               alt=""
//             />
//           </Link>
//           <Link
//             to={homeWebMainBannersData?.[7]?.targetUrl}
//             className={styles.rightBottom}
//           >
//             {loadedImages["rightBottom"] && (
//               <div className={styles.rightBottomLoading}>
//                 <div className={styles.loadingAnimate}></div>
//               </div>
//             )}
//             <img
//               style={{ opacity: loadedImages["rightBottom"] ? 0 : 1 }}
//               onLoad={() => handleLoad("rightBottom")}
//               onError={() => handleLoad("rightBottom")}
//               src={homeWebMainBannersData?.[7]?.image}
//               loading="lazy"
//               alt=""
//             />
//           </Link>
//         </div>
//       </div>
//       <div className={styles.mobileMainBannersWrapper}>
//         <MainBannersMobileSwiperSlider />
//       </div>
//     </div>
//   );
// }
