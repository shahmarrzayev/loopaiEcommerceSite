import styles from "./Basket.module.scss";
import DeletetXIcon from "../../assets/icons/DeletetXIcon";
import TotalPayment from "../../components/TotalPayment/TotalPayment";
import BasketAndConfirmOrderPageHeader from "../../components/BasketAndConfirmOrderPageHeader/BasketAndConfirmOrderPageHeader";
import { useDispatch, useSelector } from "react-redux";
import { allBasketProductsRemove, decrementFunc, deletedBasketProductFunc, incrementFunc } from "../../redux/localeBasketSlice";
import EmptyProduct from "../../components/EmptyProduct/EmptyProduct";
import BasketEmtyIcon from "../../assets/icons/BasketEmtyIcon";
import { useNavigate } from "react-router-dom";

export default function Basket() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {localeBasketData} = useSelector(
    (state) => state.localeBasketStore,
  );



  const deletedBasketProduct = (id)=>{
    dispatch(
      deletedBasketProductFunc(id)
    )
    const basketElement = document.getElementById("basketCount");
  if (basketElement) {
      basketElement.classList.remove("basketAnimate");

      setTimeout(() => {
        basketElement.classList.add("basketAnimate");

        basketElement.addEventListener(
          "animationend",
          () => {
            basketElement.classList.remove("basketAnimate");
          },
        );
      }, 10);
    }
  }
console.log("locale basket data--", localeBasketData);

  return (
    <>
      <div className="container">
        <BasketAndConfirmOrderPageHeader title={"Səbətim"} />
      {localeBasketData.length > 0 ?  <div className={styles.basketProductsAndTotal}>
          <div className={styles.basketProductsArea}>  
            {localeBasketData.map((item) => (
              <div className={styles.basketPrCart} key={item.id}>
                <div className={styles.prImgAndInfo}>
                  <span className={styles.prImg}>
                    <img src={item.images[0]} alt="" />
                  </span>. 
                  <div className={styles.prInfo}>
                    <h5 className={styles.prTitle}>{item?.title}</h5>
                    <div className={styles.prPricesArea}>
                    {item.discountedPrice &&  <span className={styles.oldPrice}>{(item.price * item.quantity).toFixed(2)} ₼</span>}
                 <span className={`${styles.price} ${item.discountedPrice ? "" : styles.noDicountedPrice}`}>
                        {item.discountedPrice ? (item.discountedPrice * item.quantity).toFixed(2) : (item.price * item.quantity).toFixed(2) } ₼
                      </span>
                    </div>
                    <div className={styles.incrDecrArea}>
                      <span onClick={()=>dispatch(decrementFunc(item.id))} className={styles.decreaseBtn}>-</span>
                      <span className={styles.quantity}>{item?.quantity}</span>
                      <span onClick={()=> dispatch(incrementFunc(item.id))} className={styles.increaseBtn}>+</span>
                    </div>
                  </div>
                </div>
                <span onClick={()=>deletedBasketProduct(item.id)} className={styles.prDeleted}>
                  <DeletetXIcon />
                </span>
              </div>
            ))}
        <span onClick={()=>dispatch(allBasketProductsRemove())} className={styles.allBasketPrDeletedBtn}>Səbəti təmizlə</span>
          </div>
          <TotalPayment/>
        </div>:
       <EmptyProduct
        icon={<BasketEmtyIcon/>}
         title={"SƏBƏTİNDƏ MƏHSUL YOXDUR"}
         shortInfo={"İstədiyin məhsulu səbətinə əlavə et."}
         pageLinkBtnTitle={"Əsas səhifə"}
         pageLinkUrl={"/"}
         />
      }
      </div> 
    </>
  );
}
