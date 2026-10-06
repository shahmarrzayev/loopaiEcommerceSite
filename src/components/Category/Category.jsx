// import styles from "./Category.module.scss";
// import { useEffect, useMemo, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link, NavLink, useLocation } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css/effect-fade";
// import "swiper/css";
// import { Autoplay, Pagination, EffectFade } from "swiper/modules";
// import CategoryIcon from "../../assets/icons/CategoryIcon";
// import CloseIcon from "../../assets/icons/CloseIcon";
// import BoyukMeisetTexIcon from "../../assets/icons/BoyukMeisetTexIcon";
// import TvAudioIcon from "../../assets/icons/TvAudioIcon";
// import MainBannersMobileSwiperSlider from "../HomePageSections/MainBannersMobileSwiperSlider/MainBannersMobileSwiperSlider";
// import { categoryBannerImgDatas } from "../../localeDatas/datas";
// import QurasdirilanTexnikaIcon from "../../assets/icons/QurasdirilanTexnikaIcon";
// import MetbexUcunXirdaTexnika from "../../assets/icons/MetbexUcunXirdaTexnika";
// import IqlimTexnikasi from "../../assets/icons/IqlimTexnikasi";
// import KicikMeisetTexnikasi from "../../assets/icons/KicikMeisetTexnikasi";

// const icons = [
//   {
//     id: "6a0ee188014dba151d4b175a",
//     icon: <BoyukMeisetTexIcon />,
//     slug: "boyuk-meiset-texnikasi",
//   },
//   {
//     id: "6a0ee188014dba151d4b185e",
//     icon: <TvAudioIcon />,
//     slug: "tv-audio-ve-video",
//   },
//   {
//     id: "6a379adebf66d9b7eaa6f51f",
//     icon: <QurasdirilanTexnikaIcon />,
//     slug: "qurasdirilan-texnika",
//   },
//   {
//     id: "6a379adebf66d9b7eaa6f808",
//     icon: <MetbexUcunXirdaTexnika />,
//     slug: "metbex-ucun-xirda-texnika",
//   },
//   {
//     id: "6a379adebf66d9b7eaa6fbff",
//     icon: <IqlimTexnikasi />,
//     slug: "iqlim-texnikasi",
//   },
//   {
//     id: "6a379ae0bf66d9b7eaa7167d",
//     icon: <KicikMeisetTexnikasi />,
//     slug: "kicik-meiset-texnikasi",
//   },
// ];

// export default function Category({ onClose }) {
//   const { categoryData } = useSelector((state) => state.categoryStore);
//   const location = useLocation();
//   const currentPath = location.pathname.replace(/^\//, "");

//   const [activeCategory, setActiveCategory] = useState(null);

//   // Find which category matches the current URL (checks category, subcategory, and child slugs)
//   useEffect(() => {
//     if (!categoryData.length) return;

//     if (currentPath) {
//       // Check if currentPath matches any category slug
//       const matchedCategory = categoryData.find((cat) => {
//         if (cat.slug === currentPath) return true;
//         // Check subcategories
//         return cat.children?.some((sub) => {
//           if (sub.slug === currentPath) return true;
//           // Check child categories
//           return sub.children?.some((child) => child.slug === currentPath);
//         });
//       });

//       if (matchedCategory) {
//         setActiveCategory(matchedCategory.id);
//         return;
//       }
//     }

//     // Default to first category if no URL match
//     if (!activeCategory) {
//       setActiveCategory(categoryData[0].id);
//     }
//   }, [categoryData]);

//   useEffect(() => {
//     document.body.style.overflow = "hidden";

//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, []);

//   const selectedCategory = useMemo(() => {
//     return categoryData.find((item) => item.id === activeCategory);
//   }, [categoryData, activeCategory]);

//   // Find the parent category ID that matches the current URL
//   const currentPageCategoryId = useMemo(() => {
//     if (!currentPath || !categoryData.length) return null;
//     const matched = categoryData.find((cat) => {
//       if (cat.slug === currentPath) return true;
//       return cat.children?.some((sub) => {
//         if (sub.slug === currentPath) return true;
//         return sub.children?.some((child) => child.slug === currentPath);
//       });
//     });
//     return matched ? matched.id : null;
//   }, [categoryData, currentPath]);

//   const handleClose = () => {
//     if (onClose) onClose();
//   };

//   return (
//     <>
//       <div className={styles.overlay} onClick={handleClose}></div>

//       <div className={styles.webCategoryArea}>
//         <div
//           className={`${styles.categoryAndSubcategoryArea} ${styles.activeCategoryAndSubcategoryArea}`}
//         >
//           <div className={styles.categories}>
//             {categoryData.map((category) => (
//               <NavLink
//                 onClick={handleClose}
//                 to={category.slug}
//                 key={category.id}
//                 onMouseEnter={() => setActiveCategory(category.id)}
//                 className={`${styles.categoryBtn} ${activeCategory === category.id ? styles.activeBtn : ""} ${currentPageCategoryId === category.id ? styles.currentPageBtn : ""}`}
//               >
//                 {category.name.az}
//               </NavLink>
//             ))}
//           </div>

//           <div className={styles.subCategoryList}>
//             {selectedCategory?.children?.map((sub) => (
//               <div key={sub.id} className={styles.subcategory}>
//                 <NavLink
//                   to={sub.slug}
//                   onClick={handleClose}
//                   className={`${styles.subTitle} ${currentPath === sub.slug ? styles.activeSubTitle : ""}`}
//                 >
//                   {sub.name.az}
//                 </NavLink>

//                 {sub.children?.map((child) => (
//                   <Link
//                     key={child.id}
//                     to={child.slug}
//                     onClick={handleClose}
//                     className={`${styles.childLink} ${currentPath === child.slug ? styles.activeChildLink : ""}`}
//                   >
//                     {child.name.az}
//                   </Link>
//                 ))}
//               </div>
//             ))}
//           </div>

//           {/* <Swiper
//             spaceBetween={30}
//             modules={[Autoplay, EffectFade]}
//             autoplay={{ delay: 2000 }}
//             speed={1200}
//             effect="fade"
//             loop={true}
//             // pagination={{ clickable: true }}
//             className={styles.sliderArae}
//           >
//             {categoryBannerImgDatas.map((item, index) => (
//               <SwiperSlide key={index}>
//                 <Link to="/" className={styles.sliderImgWrapper}>
//                   <img src={item} alt="" />
//                 </Link>
//               </SwiperSlide>
//             ))}
//           </Swiper> */}
//         </div>
//       </div>
//     </>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import styles from "./Category.module.scss";
import unistoreSite from "../../Helpers/helpers";
import { localCategoryData } from "../../localeDatas/datas";

export default function Category({ onClose }) {
  const { categoryData } = useSelector((state) => state.categoryStore);
  const location = useLocation();
  const currentPath = location.pathname.replace(/^\//, "");

  const [activeCategory, setActiveCategory] = useState(null);
  const [isSubcategoryOpen, setIsSubcategoryOpen] = useState(false);

  const currentPageCategoryId = useMemo(() => {
    if (!currentPath || !categoryData?.length) return null;

    for (const cat of categoryData) {
      if (cat.slug === currentPath) return cat.id;

      const hasMatch = cat.children?.some(
        (sub) =>
          sub.slug === currentPath ||
          sub.children?.some((child) => child.slug === currentPath),
      );

      if (hasMatch) return cat.id;
    }
    return null;
  }, [categoryData, currentPath]);


  useEffect(() => {
    if (currentPageCategoryId && !activeCategory) {
      setActiveCategory(currentPageCategoryId);
    }
  }, [currentPageCategoryId, activeCategory]);

  const selectedCategory = useMemo(() => {
    return (
      categoryData?.find((item) => item.id === activeCategory) ||
      categoryData?.[0]
    );
  }, [categoryData, activeCategory]);

  if (!categoryData?.length) return null;

  return (
    <div className={styles.webCategoryArea}>
      <div className={styles.categoryAndSubcategoryArea}>
 <div className={styles.categories}>
          {localCategoryData.map((category) => (
            <NavLink
               to={`/category/${category.slug}`}
              key={category.id}
              onClick={onClose}
              onMouseEnter={() => {
                setActiveCategory(category.id);
                setIsSubcategoryOpen(true);
              }}
              className={`${styles.categoryBtn} ${
                activeCategory === category.id ? styles.activeBtn : ""
              } ${
                currentPageCategoryId === category.id
                  ? styles.currentPageBtn
                  : ""
              }`}
            >
              {/* <img src={category.image} /> */}
              <span className={styles.categoryName}>{category.name}</span>
            </NavLink>
          ))}
        </div>
  
       
      </div>
    </div>
  );
}
