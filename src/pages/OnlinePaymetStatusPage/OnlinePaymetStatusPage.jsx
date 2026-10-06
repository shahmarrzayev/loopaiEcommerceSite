import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import unistoreSite from "../../Helpers/helpers";
import urls from "../../ApiUrls/urls";
import { allBasketProductsRemove } from "../../redux/basketSlice";

export default function OnlinePaymetStatusPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlId = searchParams.get("ID"); 

  const getKapitalStatus = async (id) => {
    try { 
      const resData = await unistoreSite
        .api()
        .post(urls.onlineKapitalPaymentStatus(id));

      if (resData.data.paymentStatus === "FullyPaid") {
        dispatch(allBasketProductsRemove());

        //   if (resData.data.paymentStatus === "Declined") {
        // dispatch(allBasketProductsRemove());
        navigate("/success", {
          state: { info: "Ödəniş uğurla tamamlandı" },
        });
      } else {
        navigate("/error");
      }  
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  useEffect(() => {
    getKapitalStatus(urlId);
  }, [urlId]);
  return <div style={{ minHeight: "100vh" }}></div>;
}
