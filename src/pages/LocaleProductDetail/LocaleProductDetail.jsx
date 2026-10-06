import styles from "./LocaleProductDetail.module.scss";
import ProductDetailPrImagesSlider from "../../components/ProductDetailPrImagesSlider/ProductDetailPrImagesSlider";
import ArrowRightIcon from "../../assets/icons/ArrowRightIcon";
import SharelinkIcon from "../../assets/icons/SharelinkIcon";
import PhoneIcon from "../../assets/icons/PhoneIcon";
import BasketIconPrCart from "../../assets/icons/BasketIconPrCart";
import ArrowDownIcon from "../../assets/icons/ArrowDownIcon";
import { useState } from "react";
import PrDetailsPageSimilarProducts from "../../components/PrDetailsPageSimilarProducts/PrDetailsPageSimilarProducts";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToBasketProduct } from "../../redux/localeBasketSlice";
import { allProductsData } from "../../localeDatas/datas";

export default function LocaleProductDetail() {
  const [showHiddenPrFeatures, setshowHiddenPrFeatures] = useState(true);

  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { localeBasketData } = useSelector(
    (state) => state.localeBasketStore
  );

  const products = Object.values(allProductsData).flatMap(
    (category) => category.products
  );

  const product = products.find(
    (product) => product.slug === slug
  );

  const handlePrFeatures = () => {
    setshowHiddenPrFeatures(!showHiddenPrFeatures);
  };

  const isInProductBasketList = localeBasketData?.some(
    (item) => item?.id === product?.id
  );

  const discountAmount =
    product?.discountedPrice != null
      ? Number(product?.price) - Number(product?.discountedPrice)
      : 0;

  const addToBasket = () => {
    if (!product) return;

    dispatch(addToBasketProduct(product));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.title || "Məhsul",
          text: `${product?.title} məhsuluna UniStore-da baxın!`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Paylaşım zamanı xəta:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Paylaşma linki kopyalandı!");
      } catch (err) {
        console.error("Link kopyalana bilmədi:", err);
      }
    }
  };

  if (!product) {
    return null;
  }

  return (
    <div className="container">
      <div className={styles.productDetailWrapper}>
        <div className={styles.prIamgeSlider}>
          <ProductDetailPrImagesSlider
            images={product?.images}
            productPrice={product?.discountedPrice}
          />
        </div>

        <div className={styles.productInfoAndSpecifications}>
          <div className={styles.infoHeader}>
            <div className={styles.prCategoryPrCode}>
              <span className={styles.prCategory}>
                Məhsul
                <ArrowRightIcon color={"rgba(55, 104, 122, 1)"} />

                <span className={styles.prCategoryTitle}>
                  {product?.productType}
                </span>
              </span>
            </div>

            <div className={styles.wishlistSharelink}>
              <span className={styles.shareWord}>
                Paylaş
              </span>

              <span
                onClick={handleShare}
                className={styles.sharelink}
              >
                <SharelinkIcon />
              </span>
            </div>
          </div>

          <h3 className={styles.prTitle}>
            {product?.title}
          </h3>

          <div className={styles.priceAreaWrapper}>
            {product?.discountedPrice != null && (
              <div className={styles.prSaleArea}>
                <span className={styles.discountAmount}>
                  - {discountAmount.toFixed(2)}₼
                </span>
              </div>
            )}

            <div className={styles.priceDiscountedPriceArea}>
              <span className={styles.price}>
                {product?.discountedPrice
                  ? product?.discountedPrice
                  : product?.price}
                ₼
              </span>

              {product?.discountedPrice && (
                <span className={styles.prOldPrice}>
                  {product?.price}₼
                </span>
              )}
            </div>
          </div>

          <p className={styles.productDescription}>
            {product?.description}
          </p>

          <div className={styles.btnsArea}>
            <span
              onClick={() => {
                if (isInProductBasketList) {
                  navigate("/sebetim");
                  return;
                }

                addToBasket();
              }}
              className={`${styles.addBasket} ${
                isInProductBasketList
                  ? styles.productInBasket
                  : ""
              }`}
            >
              <BasketIconPrCart />

              {isInProductBasketList
                ? "səbətdədir"
                : "Səbətə at"}
            </span>

            <a
              href="tel:+994554446640"
              className={styles.call}
            >
              <PhoneIcon color={"rgba(0, 173, 238, 1)"} />
              Zəng et
            </a>
          </div>

          {product?.attributes?.length > 1 && (
            <div className={styles.productFeaturesArea}>
              <h3
                onClick={handlePrFeatures}
                className={styles.title}
              >
                Xüsusiyyətləri

                <span
                  className={`${styles.upDownIcon} ${
                    showHiddenPrFeatures
                      ? styles.iconUp
                      : ""
                  }`}
                >
                  <ArrowDownIcon />
                </span>
              </h3>

              <div
                className={`${styles.prFeaturesContent} ${
                  showHiddenPrFeatures
                    ? styles.activePrFeatures
                    : ""
                }`}
              >
                {product?.attributes?.map((item, index) => (
                  <div
                    className={styles.feature}
                    key={index}
                  >
                    <span className={styles.key}>
                      {item?.attribute}
                    </span>

                    <span className={styles.value}>
                      {item?.option}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {product?.similarProducts?.length > 0 && (
        <div className={styles.similarPrArea}>
          <h4 className="sectionTitle">
            Oxşar məhsullar
          </h4>

          <PrDetailsPageSimilarProducts
            similarProductsDatas={product?.similarProducts}
          />
        </div>
      )}
    </div>
  );
}