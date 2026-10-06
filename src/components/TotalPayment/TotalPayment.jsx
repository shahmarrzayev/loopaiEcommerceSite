import { NavLink } from "react-router-dom";
import styles from "./TotalPayment.module.scss";
import { useSelector } from "react-redux";

export default function TotalPayment({ onClickFunc }) {
  const { localeBasketData } = useSelector(
    (state) => state.localeBasketStore
  );

  const allTotalPayment = localeBasketData?.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0) ?? 0;

  const allDiscountTotalPrice = localeBasketData?.reduce((total, product) => {
    const finalPrice = product.discountedPrice ?? product.price;

    return total + (product.price - finalPrice) * product.quantity;
  }, 0) ?? 0;

  const resultTotalPayment = localeBasketData?.reduce((total, product) => {
    const finalPrice = product.discountedPrice ?? product.price;

    return total + finalPrice * product.quantity;
  }, 0) ?? 0;



  const handleConfirmOrder = () => {
  if (!localeBasketData?.length) return;

  const productsText = localeBasketData
    .map((product, index) => {
      const image = product.images?.[0];

      return `
${index + 1}. ${product.title}

Qiymət: ${product.price} ${product.currency}
Endirimli qiymət: ${product.discountedPrice ?? product.price} ${product.currency}
Say: ${product.quantity}
Şəkil: ${image}
`;
    })
    .join("\n--------------------\n");

  const totalPrice = localeBasketData.reduce((total, product) => {
    const price = product.discountedPrice ?? product.price;

    return total + price * product.quantity;
  }, 0);

  const message = `
Salam, sifariş vermək istəyirəm.

${productsText}

Ümumi ödəniş: ${totalPrice.toFixed(2)} AZN
`;

  const phoneNumber = "994552164717";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  window.open(whatsappUrl, "_blank");
};

  return (
    <div className={styles.totalPaymentArea}>
      <h6 className={styles.title}>Ümumi ödəniş</h6>

      <div className={styles.allTotalWrapper}>
        Toplam məbləğ
        <span className={styles.allTotal}>
          {allTotalPayment.toFixed(2)}₼
        </span>
      </div>

      <div className={styles.discountedTotalWrapper}>
        Endirim məbləği
        <span className={styles.discountedTotal}>
          {allDiscountTotalPrice.toFixed(2)}₼
        </span>
      </div>

      <div className={styles.paymentTotalWrapper}>
        Sifariş cəmi
        <span className={styles.paymentTotal}>
          {resultTotalPayment.toFixed(2)}₼
        </span>
      </div>

      <span
        onClick={() => handleConfirmOrder()}
        className={styles.confirmOrder}
      >
        Sifarişi təsdiqlə
      </span>

      <NavLink to="/" className={styles.continueShoppingBtn}>
        Alış verişə davam et
      </NavLink>
    </div>
  );
}