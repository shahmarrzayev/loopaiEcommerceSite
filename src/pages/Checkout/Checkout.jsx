import styles from "./Checkout.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import unistoreSite from "../../Helpers/helpers";
import urls from "../../ApiUrls/urls";
import Input from "../../components/Input/Input";
import TotalPayment from "../../components/TotalPayment/TotalPayment";
import { allBasketProductsRemove } from "../../redux/basketSlice";

export default function Checkout() {
  // const [loginAddressData, setLoginAddressData] = useState({});
  // const { isLogin } = useSelector((state) => state.userStore);
  const { basketData } = useSelector((state) => state.basketStore);
  const [checkedLoginAddressData, setCheckedLoginAddressData] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  console.log("basket data--", basketData);
  

  const { handleChange, values, setValues, handleSubmit, resetForm, errors } =
    useFormik({
      initialValues: {
        receiverFullName: "",
        receiverPhone: "",
        deliveryType: "",
        city: "",
        fullAddress: "",
        note: "",
        paymentType: "",
        paymentProvider: "",
        installmentMonths:"",
        useCustomerShippingInfo:false
      },
      onSubmit: async (values) => {
        try {
          const apiSendPhoneFormat = values.receiverPhone.replace(/\s|-/g, "");
          let payload = {
            ...values,
              receiverPhone: apiSendPhoneFormat,
              installmentMonths: Number(values.installmentMonths) || "",
          };
          const resData = await unistoreSite
            .api()
            .post(urls.customerOrder, payload);
          // kartla yeni online odenis yonledirilir OnlinePaymetStatusPage bu sehifeye yonlendirir
          if (resData.data.redirectUrl) {
            window.location.href = resData.data.redirectUrl;
            return;
          }
          // burda ise nagd odenis oldugunda yeni nagdi secib gonderende ise dusur
          if (resData?.data?.orderStatus === "pending") {
            dispatch(allBasketProductsRemove());
            navigate("/success", {
              state: { info: "Ödəniş uğurla tamamlandı" },
            });
            resetForm();
          } else {
            navigate("/error");
          }
        } catch (error) {
          console.log(error);
        }
      },

      validationSchema: Yup.object().shape({
        receiverFullName: Yup.string().required("Adınızı daxil edin"),
        receiverPhone: Yup.string().required("Nömrənizi daxil edin"),
        deliveryType: Yup.string().required(
          "Çatdırılma ilə baglı xananı doldurun",
        ),
        city: Yup.string().when("deliveryType", {
          is: "home_delivery",
          then: (schema) => schema.required("Şəhər seçin"),
          otherwise: (schema) => schema.notRequired(),
        }),
        fullAddress: Yup.string().when("deliveryType", {
          is: "home_delivery",
          then: (schema) => schema.required("Dəqiq ünvan yazın !!!"),
          otherwise: (schema) => schema.notRequired(),
        }),
        paymentType: Yup.string().required("Ödəniş üsulu seçin"),
      }),
    });

  const orderUserData = {
    receiverFullName: {
      id: "receiverFullName",
      name: "receiverFullName",
      value: values.receiverFullName,
      inputType: "text",
      onChange: handleChange,
      placeholder: "Ad və Soyad",
      errorMessage: checkedLoginAddressData ? "" : errors.receiverFullName,
    },
    receiverPhone: {
      id: "receiverPhone",
      name: "receiverPhone",
      value: values.receiverPhone,
      inputType: "mask",
      onChange: handleChange,
      errorMessage: checkedLoginAddressData ? "" : errors.receiverPhone,
      maskProps: {
        mask: "+994 00-000-00-00",
        lazy: false,
        placeholder: "+994__-___-__-__",
        definitions: {
          0: /[0-9]/,
        },
      },
    },
    city: {
      id: "city",
      name: "city",
      value: values.city,
      type: "text",
      onChange: handleChange,
      placeholder: "Şəhəri qeyd edin",
      errorMessage: checkedLoginAddressData ? "" : errors.city,
      readOnly: checkedLoginAddressData ? true : false,
    },
    fullAddress: {
      id: "fullAddress",
      name: "fullAddress",
      value: values.fullAddress,
      type: "text",
      onChange: handleChange,
      placeholder: "Dəqiq ünvan qeyd edin",
      errorMessage: checkedLoginAddressData ? "" : errors.fullAddress,
      readOnly: checkedLoginAddressData ? true : false,
    },
    textArea: {
      value: values.note,
      handleChange: handleChange,
    },
  };


  return (
    <div className="container">
      <div className={styles.orderPage}>
        <div className={styles.orderContent}>
          <form onSubmit={handleSubmit} className={styles.userForm}>
            <div className={styles.personalInformation}>
              <h6 className={styles.sectionTitle}>Şəxsi məlumatlar</h6>
              <div className={styles.nameSurname}>
                <Input data={orderUserData?.receiverFullName} />
                <Input data={orderUserData?.receiverPhone} />
              </div>
            </div>
            <div className={styles.deliveryArea}>
              <h5 className={styles.sectionTitle}>Çatdırılma</h5>
              <div className={styles.addressDelivery}>
                <label className={styles.deliveryInputWrapper}>
                  <input
                    className={styles.deliveryInput}
                    type="radio"
                    name="deliveryType"
                    value="home_delivery"
                    onChange={handleChange}
                    checked={values.deliveryType === "home_delivery"}
                  />
                  Ünvana çatdırılma
                  <span className={styles.markerElememnt}></span>
                </label>
                <label className={styles.deliveryInputWrapper}>
                  <input
                    className={styles.deliveryInput}
                    type="radio"
                    name="deliveryType"
                    value="pickup"
                    onChange={handleChange}
                    checked={values.deliveryType === "pickup"}
                  />
                  Mağazadan götürəcəm
                  <span className={styles.markerElememnt}></span>
                </label>
              </div>
              {errors.deliveryType && (
                <span className={styles.error}>
                  {checkedLoginAddressData ? "" : errors.deliveryType}
                </span>
              )}
              {values.deliveryType === "home_delivery" && (
                <div className={styles.addressDeliveryContent}>
                  <div className={styles.cityAndaddress}>
                    <Input data={orderUserData.city} />
                    <Input data={orderUserData.fullAddress} />
                  </div>
                  <textarea
                    name="note"
                    placeholder="Qeydiniz yazın ..."
                    rows="3"
                    value={values.note}
                    onChange={handleChange}
                  ></textarea>
                </div>
              )}
            </div>

            <div className={styles.paymentArea}>
              <h5 className={styles.sectionTitle}>Ödəniş Üsulu</h5>
              <div className={styles.paymentMetod}>
                <label
                  className={`${styles.cash} ${
                    values.paymentType === "CASH" ? styles.activePayment : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentProvider"
                    value="CASH"
                    checked={values.paymentType === "CASH"}
                    onChange={() => {
                      setValues({
                        ...values,
                        paymentType: "CASH",
                        paymentProvider: "",
                         installmentMonths:""
                      });
                    }}
                  />
                  Qapıda ödə
                </label>
                <label
                  className={`${styles.online} ${
                    values.paymentProvider === "BIRBANK"
                      ? styles.activePayment
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentProvider"
                    value="BIRBANK"
                    checked={values.paymentProvider === "BIRBANK"}
                    onChange={() => {
                      setValues({
                        ...values,
                        paymentType: "ONLINE",
                        paymentProvider: "BIRBANK",
                      });
                    }}
                  />
                  Online ödə
                </label>
                {/* <label
                  className={`${styles.online} ${
                    values.paymentProvider === "ABB" ? styles.activePayment : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentProvider"
                    value="ABB"
                    checked={values.paymentProvider === "ABB"}
                    onChange={() => {
                      setValues({
                        ...values,
                        paymentType: "ONLINE",
                        paymentProvider: "ABB",
                      });
                    }}
                  />
                  ABB
                </label> */}
              </div>
              {errors.paymentType && (
                <span className={styles.paymentTypeError}>
                  {checkedLoginAddressData ? "" : errors.paymentType}
                </span>
              )}
          <div className={styles.creditMonthsArea}>
  {values.paymentType === "ONLINE" &&
    (values.paymentProvider === "BIRBANK" ||
      values.paymentProvider === "ABB") && (
      <div className={styles.kreditMonths}>
        {basketData?.installmentProviders
          ?.find(
            (provider) => provider.code === values.paymentProvider
          )
          ?.rules?.map((item) => (
            <label
              key={item.months}
              className={`${styles.creditItem} ${
                values.installmentMonths == item.months
                  ? styles.activeCredit
                  : ""
              }`}
            >
              <input
                type="radio"
                name="installmentMonths"
                value={item.months}
                checked={values.installmentMonths == item.months}
                onChange={handleChange}
              />

              <span>{item.months} ay</span>
              <span>{item.monthlyPrice} AZN</span>
            </label>
          ))}
<label
  className={`${styles.creditItem} ${
    Number(values.installmentMonths) === 0 ? styles.activeCredit : ""
  }`}
>
  <input
    type="radio"
    name="installmentMonths"
    value={0}
    checked={Number(values.installmentMonths) === 0}
    onChange={handleChange}
  />

  <span>Hamısını Ödə</span>
</label>
      </div>
    )}
</div>
            </div>
          </form>
        </div>

        <div className={styles.basketTotalAddressSelect}>
          <TotalPayment positionStyle={"inherit"} onClickFunc={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
