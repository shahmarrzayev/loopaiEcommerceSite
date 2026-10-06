import styles from "./PrCart.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import OrderOnlineOnlyIcon from "../../assets/icons/OrderOnlineOnlyIcon";
import BasketIconPrCart from "../../assets/icons/BasketIconPrCart";
import FreeDeliveryIcon from "../../assets/icons/FreeDeliveryIcon";
import { useDispatch, useSelector } from "react-redux";
import { addToBasketProduct } from "../../redux/localeBasketSlice";


export default function PrCart({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { localeBasketData } = useSelector((state) => state.localeBasketStore);

const isInProductBasketList = localeBasketData?.some(
  (item) => item?.id === data?.id
);
 
  const addToBasket = () => {
     dispatch(addToBasketProduct(data));
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

  const discountAmount = data?.price - data?.discountedPrice;
  // console.log("pr data--", discountAmount);


  return (
    <div className={styles.productCartWrapper}>
      <Link className={styles.prImageWrapper} to={`/details/${data?.slug}`}>
        <img
          src={
           data?.images?.[0]
          }
          alt=""
        />
      </Link>
      <Link className={styles.prTitle} to={`/details/${data?.slug}`}>
        {data?.title}
      </Link>
      <div className={styles.prCartBottom}>
        <div className={styles.bottomLeft}>
          {data?.discountedPrice && (
            <span className={styles.discountPercent}>
              {/* {data?.discountPercent}% */}
              -{discountAmount.toFixed(2)}₼
            </span>
          )}
          {data?.discountedPrice && (
            <span className={styles.price}>{data?.price?.toFixed(2)}₼</span>
          )}
          <span className={styles.discountedPrice}>
            {data?.discountedPrice
              ? data?.discountedPrice?.toFixed(2)
              : data?.price?.toFixed(2)}
            ₼
          </span>
        </div>
        <div className={styles.bottomRight}>
          {data?.onlyForOnlineSale ? (
            <span className={styles.orderOnlineOnly}>
              <OrderOnlineOnlyIcon />
              yalnız online sifariş
            </span>
          ) : (
            <span className={styles.noOrderOnline}></span>
          )}
          <span
            onClick={() => {
              if (isInProductBasketList) {
                navigate("/sebetim");
                return;
              } else {
                addToBasket();
              }
            }}
            className={`${styles.addToBasketBtn} ${isInProductBasketList ? styles.prInBasket : ""}`}
          >
            <BasketIconPrCart />
            {isInProductBasketList ? "səbətdədir" : "səbətə at"}
          </span>
        </div>
      </div>
      <span className={styles.freeDelivery}>
        {data?.discountedPrice > 1000 && (
          <>
            <FreeDeliveryIcon color={"#1f71a9"} /> pulsuz çatdırılma
          </>
        )}
      </span>
    </div>
  );
}
