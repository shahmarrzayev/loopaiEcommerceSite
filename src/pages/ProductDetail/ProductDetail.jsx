// import styles from "./ProductDetail.module.scss";
// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";
// import { Autoplay } from "swiper/modules";
// import ProductDetailPrImagesSlider from "../../components/ProductDetailPrImagesSlider/ProductDetailPrImagesSlider";
// import ArrowRightIcon from "../../assets/icons/ArrowRightIcon";
// import SharelinkIcon from "../../assets/icons/SharelinkIcon";
// import PhoneIcon from "../../assets/icons/PhoneIcon";
// import BasketIconPrCart from "../../assets/icons/BasketIconPrCart";
// import ABBbankImg from "../../assets/images/ABB.png";
// import birbankImg from "../../assets/images/Birbank.png";
// import ArrowDownIcon from "../../assets/icons/ArrowDownIcon";
// import { useEffect, useState } from "react";
// import PrDetailsPageSimilarProducts from "../../components/PrDetailsPageSimilarProducts/PrDetailsPageSimilarProducts";
// import { useNavigate, useParams } from "react-router-dom";
// import unistoreSite from "../../Helpers/helpers";
// import urls from "../../ApiUrls/urls";
// import { addToBasketProduct } from "../../redux/basketSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { prDetailAdvantagesDatas } from "../../localeDatas/datas";

// export default function ProductDetail() {
//   const [showHiddenPrFeatures, setshowHiddenPrFeatures] = useState(true);
//   const { basketData } = useSelector((state) => state.basketStore);
//   const [activeBank, setActiveBank] = useState("Birbank");
//   const [activeMonth, setActiveMonth] = useState(null);
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [productDetailsData, setProductDetailsData] = useState({});
//   const handlePrFeatures = () => {
//     setshowHiddenPrFeatures(!showHiddenPrFeatures);
//   };
//   const [compareBtnSituation, setcompareBtnSituation] = useState(
//     productDetailsData?.product?.isInComparison ?? false,
//   );

//   useEffect(() => {
//     if (productDetailsData?.product?.isInComparison !== undefined) {
//       setcompareBtnSituation(productDetailsData?.product?.isInComparison);
//     }
//   }, [productDetailsData?.product?.isInComparison]);

//   const isInProductBasketList = basketData?.items?.some(
//     (item) => item?.id === productDetailsData?.product?.id,
//   );
//   const discountAmount =
//     productDetailsData?.product?.price -
//     productDetailsData?.product?.discountedPrice;
//   const bankCreditCalculatorDatas =
//     productDetailsData?.product?.installmentProviders;

//   const getProductDetailsData = async (slug) => {
//     try {
//       const resData = await unistoreSite.api().get(urls.productDetail(slug));
//       setProductDetailsData(resData.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getProductDetailsData(slug);
//   }, [slug]);

//   const activeBankData = bankCreditCalculatorDatas?.find(
//     (bankName) => bankName.displayName === activeBank,
//   );

//   const activeRule = activeBankData?.rules?.find(
//     (rule) => rule?.months === activeMonth,
//   );

//   useEffect(() => {
//     setActiveMonth(activeBankData?.rules[0]?.months);
//   }, [activeBankData]);



//   const addToBasket = () => {
//     dispatch(
//       addToBasketProduct({
//         productId: productDetailsData?.product?.id,
//         quantity: 1,
//       }),
//     );
//     // productu baskete atanda iwleyen animasiya
//     const basketElements = document.querySelectorAll(".basketCount");

//     basketElements.forEach((item) => {
//       item.classList.remove("basketAnimate");

//       setTimeout(() => {
//         item.classList.add("basketAnimate");

//         item.addEventListener(
//           "animationend",
//           () => {
//             item.classList.remove("basketAnimate");
//           },
//           { once: true },
//         );
//       }, 10);
//     });
//   };


//   const handleShare = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: productDetailsData?.product?.title || "Məhsul",
//           text: `${productDetailsData?.product?.title} məhsuluna UniStore-da baxın!`,
//           url: window.location.href,
//         });
//       } catch (error) {
//         console.error("Paylaşım zamanı xəta:", error);
//       }
//     } else {
//       // Əgər brauzer dəstəkləmirsə (məsələn, bəzi desktop brauzerləri), linki kopyalayırıq
//       try {
//         await navigator.clipboard.writeText(window.location.href);
//         alert("Paylaşma linki kopyalandı!");
//       } catch (err) {
//         console.error("Link kopyalana bilmədi:", err);
//       }
//     }
//   };

//   console.log("pr detail datas--", productDetailsData);

//   // console.log("active rule--", activeRule);
//   // console.log("detailll---", productDetailsData);

//   return (
//     <div className="container">
//       <div className={styles.productDetailWrapper}>
//         <div className={styles.prIamgeSlider}>
//           <ProductDetailPrImagesSlider
//             images={productDetailsData?.product?.images}
//             productPrice={productDetailsData?.product?.discountedPrice}
//           />
//         </div>
//         <div className={styles.productInfoAndSpecifications}>
//           <div className={styles.infoHeader}>
//             <div className={styles.prCategoryPrCode}>
//               <span className={styles.prCategory}>
//                 Məhsul <ArrowRightIcon color={"rgba(55, 104, 122, 1)"} />
//                 <span className={styles.prCategoryTitle}>
//                   {productDetailsData?.product?.category}
//                 </span>
//               </span>
//             </div>
//             <div className={styles.wishlistSharelink}>
//               <span className={styles.shareWord}>Paylaş</span>
//               <span onClick={handleShare} className={styles.sharelink}>
//                 <SharelinkIcon />
//               </span>
//             </div>
//           </div>
//           <h3 className={styles.prTitle}>
//             {productDetailsData?.product?.title}
//           </h3>
//           <div className={styles.priceAreaWrapper}>
//             {productDetailsData?.product?.discountedPrice && (
//               <div className={styles.prSaleArea}>
//                 <span className={styles.discountAmount}>
//                   - {discountAmount.toFixed(2)}₼
//                 </span>
//               </div>
//             )}
//             <div className={styles.priceDiscountedPriceArea}>
//               <span className={styles.price}>
//                 {productDetailsData?.product?.discountedPrice
//                   ? productDetailsData?.product?.discountedPrice
//                   : productDetailsData?.product?.price}
//                 ₼
//               </span>
//               {productDetailsData?.product?.discountedPrice && (
//                 <span className={styles.prOldPrice}>
//                   {productDetailsData?.product?.price}₼
//                 </span>
//               )}
//             </div>
//           </div>
// <div className={styles.advantagesArea}>
//     <Swiper
//       slidesPerView="auto"
//       spaceBetween={10}
//       pagination={{
//         clickable: true,
//       }}
//     >
//       {prDetailAdvantagesDatas?.map((advantage) => (
//         <SwiperSlide key={advantage.id} className={styles.advantageBtn}>
//           {advantage.text}
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   </div>
//           <div className={styles.btnsArea}>
//             <span
//               onClick={() => {
//                 if (isInProductBasketList) {
//                   navigate("/sebetim");
//                   return;
//                 } else {
//                   addToBasket();
//                 }
//               }}
//               className={`${styles.addBasket} ${isInProductBasketList ? styles.productInBasket : ""}`}
//             >
//               <BasketIconPrCart />
//               {isInProductBasketList ? "səbətdədir" : "Səbətə at"}
//             </span>
//             <a href="tel:+994507800060" className={styles.call}>
//               <PhoneIcon color={"rgba(0, 173, 238, 1)"} />
//               Zəng et
//             </a>
//           </div>
//           <div className={styles.creditCalculatorArea}>
//             <h5 className={styles.creditTitle}>Hissəli alış kalkulyatoru</h5>
//             <div className={styles.installmentCalculator}>
//               <Swiper
//                 slidesPerView={2}
//                 spaceBetween={10}
//                 className="prDetailCreditMonthsSlider"
//                 pagination={{
//                   clickable: true,
//                 }}
//                 autoplay={{
//                   delay: 0,
//                   disableOnInteraction: false,
//                 }}
//                 key={activeBankData?.rules?.length}
//                 loop={activeBankData?.rules?.length > 1}
//                 speed={3000}
//                 modules={[Autoplay]}
//                 breakpoints={{
//                   320: {
//                     slidesPerView: 3,
//                   },
//                   350: {
//                     slidesPerView: 4,
//                   },
//                   750: {
//                     slidesPerView: 6,
//                   },
//                   951: {
//                     slidesPerView: 2,
//                   },
//                   1100: {
//                     slidesPerView: 4,
//                   },
//                   1350: {
//                     slidesPerView: 5,
//                   },
//                   1500: {
//                     slidesPerView: 6,
//                   },
//                 }}
//               >
//                 {activeBankData?.rules?.map((item) => (
//                   <SwiperSlide key={item.id}>
//                     <span
//                       key={item.months}
//                       onClick={() => setActiveMonth(item.months)}
//                       className={`${styles.mounts} ${activeMonth === item.months ? styles.activeMount : ""}`}
//                     >
//                       {item.months} ay
//                     </span>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>
//               <div className={styles.mountPaymentAndEndTotalPayment}>
//                 <div className={styles.mountPayment}>
//                   Aylıq
//                   <span className={styles.paymeted}>
//                     {activeRule?.monthlyPrice} ₼
//                   </span>
//                 </div>
//                 <div className={styles.endTotalPayment}>
//                   Cəmi
//                   <span className={styles.paymeted}>
//                     {activeRule?.totalPrice} ₼
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <h5 className={styles.creditTitle}>Taksitlə al</h5>
//             <div className={styles.bankCarts}>
//               {/* burda ABB banki gostermemek ucun gelen datani kesib 1 ci ni yeni ancaq 1 banki gosterirem ABB gelende slice-ni sil */}
//               {bankCreditCalculatorDatas?.slice(0, 1)?.map((bankData) => (
//                 <span
//                   key={bankData.code}
//                   className={`${styles.bankBtnWarapper} ${activeBank === bankData.displayName ? styles.activeBank : ""}`}
//                   onClick={() => setActiveBank(bankData?.displayName)}
//                 >
//                   <img
//                     src={`${bankData.displayName === "Birbank" ? birbankImg : ABBbankImg}`}
//                     alt=""
//                   />
//                 </span>
//               ))}
//             </div>
//           </div>
//           {productDetailsData?.product?.attributes?.length > 1 && (
//             <div className={styles.productFeaturesArea}>
//               <h3 onClick={handlePrFeatures} className={styles.title}>
//                 Xüsusiyyətləri
//                 <span
//                   className={`${styles.upDownIcon} ${showHiddenPrFeatures ? styles.iconUp : ""}`}
//                 >
//                   <ArrowDownIcon />
//                 </span>
//               </h3>
//               <div
//                 className={`${styles.prFeaturesContent} ${showHiddenPrFeatures ? styles.activePrFeatures : ""}`}
//               >
//                 {productDetailsData?.product?.attributes?.map((item, index) => (
//                   <div className={styles.feature} key={index}>
//                     <span className={styles.key}>{item?.attribute}</span>
//                     <span className={styles.value}>{item?.option}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
      
//       </div>
//       {productDetailsData?.similarProducts?.length > 0 && (
//         <div className={styles.similarPrArea}>
//           <h4 className="sectionTitle">Oxşar məhsullar</h4>
//           <PrDetailsPageSimilarProducts
//             similarProductsDatas={productDetailsData?.similarProducts}
//           />
//         </div>
//       )}
//     </div>
//   );
// }


// new version

import styles from "./ProductDetail.module.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Autoplay } from "swiper/modules";
import ProductDetailPrImagesSlider from "../../components/ProductDetailPrImagesSlider/ProductDetailPrImagesSlider";
import ArrowRightIcon from "../../assets/icons/ArrowRightIcon";
import SharelinkIcon from "../../assets/icons/SharelinkIcon";
import PhoneIcon from "../../assets/icons/PhoneIcon";
import BasketIconPrCart from "../../assets/icons/BasketIconPrCart";
import ABBbankImg from "../../assets/images/ABB.png";
import birbankImg from "../../assets/images/Birbank.png";
import ArrowDownIcon from "../../assets/icons/ArrowDownIcon";
import { useEffect, useState } from "react";
import PrDetailsPageSimilarProducts from "../../components/PrDetailsPageSimilarProducts/PrDetailsPageSimilarProducts";
import { useNavigate, useParams } from "react-router-dom";
import unistoreSite from "../../Helpers/helpers";
import urls from "../../ApiUrls/urls";
import { addToBasketProduct } from "../../redux/basketSlice";
import { useDispatch, useSelector } from "react-redux";
import { prDetailAdvantagesDatas } from "../../localeDatas/datas";

export default function ProductDetail() {
  const [showHiddenPrFeatures, setshowHiddenPrFeatures] = useState(true);
  const { basketData } = useSelector((state) => state.basketStore);
  
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productDetailsData, setProductDetailsData] = useState({});

  const handlePrFeatures = () => {
    setshowHiddenPrFeatures(!showHiddenPrFeatures);
  };
  const isInProductBasketList = basketData?.items?.some(
    (item) => item?.id === productDetailsData?.product?.id,
  );
  const discountAmount =
    productDetailsData?.product?.price -
    productDetailsData?.product?.discountedPrice;

  const getProductDetailsData = async (slug) => {
    try {
      const resData = await unistoreSite.api().get(urls.productDetail(slug));
      setProductDetailsData(resData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDetailsData(slug);
  }, [slug]);



  const addToBasket = () => {
    dispatch(
      addToBasketProduct({
        productId: productDetailsData?.product?.id,
        quantity: 1,
      }),
    );
    // productu baskete atanda iwleyen animasiya
    const basketElements = document.querySelectorAll(".basketCount");

    basketElements.forEach((item) => {
      item.classList.remove("basketAnimate");

      setTimeout(() => {
        item.classList.add("basketAnimate");

        item.addEventListener(
          "animationend",
          () => {
            item.classList.remove("basketAnimate");
          },
          { once: true },
        );
      }, 10);
    });
  };


  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productDetailsData?.product?.title || "Məhsul",
          text: `${productDetailsData?.product?.title} məhsuluna UniStore-da baxın!`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Paylaşım zamanı xəta:", error);
      }
    } else {
      // Əgər brauzer dəstəkləmirsə (məsələn, bəzi desktop brauzerləri), linki kopyalayırıq
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Paylaşma linki kopyalandı!");
      } catch (err) {
        console.error("Link kopyalana bilmədi:", err);
      }
    }
  };

  // console.log("pr detail datas--", productDetailsData);

  // console.log("active rule--", activeRule);
  // console.log("detailll---", productDetailsData);


  return (
    <div className="container">
      <div className={styles.productDetailWrapper}>
        <div className={styles.prIamgeSlider}>
          <ProductDetailPrImagesSlider
            images={productDetailsData?.product?.images}
            productPrice={productDetailsData?.product?.discountedPrice}
          />
        </div>
        <div className={styles.productInfoAndSpecifications}>
          <div className={styles.infoHeader}>
            <div className={styles.prCategoryPrCode}>
              <span className={styles.prCategory}>
                Məhsul <ArrowRightIcon color={"rgba(55, 104, 122, 1)"} />
                <span className={styles.prCategoryTitle}>
                  {productDetailsData?.product?.category}
                </span>
              </span>
            </div>
            <div className={styles.wishlistSharelink}>
              <span className={styles.shareWord}>Paylaş</span>
              <span onClick={handleShare} className={styles.sharelink}>
                <SharelinkIcon />
              </span>
            </div>
          </div>
          <h3 className={styles.prTitle}>
            {productDetailsData?.product?.title}
          </h3>
          <div className={styles.priceAreaWrapper}>
            {productDetailsData?.product?.discountedPrice && (
              <div className={styles.prSaleArea}>
                <span className={styles.discountAmount}>
                  - {discountAmount.toFixed(2)}₼
                </span>
              </div>
            )}
            <div className={styles.priceDiscountedPriceArea}>
              <span className={styles.price}>
                {productDetailsData?.product?.discountedPrice
                  ? productDetailsData?.product?.discountedPrice
                  : productDetailsData?.product?.price}
                ₼
              </span>
              {productDetailsData?.product?.discountedPrice && (
                <span className={styles.prOldPrice}>
                  {productDetailsData?.product?.price}₼
                </span>
              )}
            </div>
          </div>

          <div className={styles.btnsArea}>
            <span
              onClick={() => {
                if (isInProductBasketList) {
                  navigate("/sebetim");
                  return;
                } else {
                  addToBasket();
                }
              }}
              className={`${styles.addBasket} ${isInProductBasketList ? styles.productInBasket : ""}`}
            >
              <BasketIconPrCart />
              {isInProductBasketList ? "səbətdədir" : "Səbətə at"}
            </span>
            <a href="tel:+994554446640" className={styles.call}>
              <PhoneIcon color={"rgba(0, 173, 238, 1)"} />
              Zəng et
            </a>
          </div>
       
          {productDetailsData?.product?.attributes?.length > 1 && (
            <div className={styles.productFeaturesArea}>
              <h3 onClick={handlePrFeatures} className={styles.title}>
                Xüsusiyyətləri
                <span
                  className={`${styles.upDownIcon} ${showHiddenPrFeatures ? styles.iconUp : ""}`}
                >
                  <ArrowDownIcon />
                </span>
              </h3>
              <div
                className={`${styles.prFeaturesContent} ${showHiddenPrFeatures ? styles.activePrFeatures : ""}`}
              >
                {productDetailsData?.product?.attributes?.map((item, index) => (
                  <div className={styles.feature} key={index}>
                    <span className={styles.key}>{item?.attribute}</span>
                    <span className={styles.value}>{item?.option}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      
      </div>
      {productDetailsData?.similarProducts?.length > 0 && (
        <div className={styles.similarPrArea}>
          <h4 className="sectionTitle">Oxşar məhsullar</h4>
          <PrDetailsPageSimilarProducts
            similarProductsDatas={productDetailsData?.similarProducts}
          />
        </div>
      )}
    </div>
  );
}