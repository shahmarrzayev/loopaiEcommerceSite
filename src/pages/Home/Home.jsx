import { useEffect, useState } from "react";
import MainBanners from "../../components/HomePageSections/MainBanners/MainBanners";
import NewArrivals from "../../components/HomePageSections/NewArrivals/NewArrivals";
import OurAdvantages from "../../components/HomePageSections/OurAdvantages/OurAdvantages";
import unistoreSite from "../../Helpers/helpers";
import urls from "../../ApiUrls/urls";
import ExclusiveProducts from "../../components/HomePageSections/ExclusiveProducts/ExclusiveProducts";
import { yeniGelenler } from "../../localeDatas/datas";
import { enCoxSatilanlar } from "../../localeDatas/datas";

export default function Home() {
  const [homePageData, setHomePageData] = useState([]);

  const getHomePageData = async () => {
    try {
      const resData = await unistoreSite.api().get(urls.homePage);
      setHomePageData(resData.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getHomePageData();
  }, []);

  const mainBannersData = homePageData?.sliders;
  const newArrivalsData = homePageData?.newArrivals?.data;
  const exclusiveProductsData = homePageData?.exclusiveProducts;


  // console.log("exclusive product data--", exclusiveProductsData);
  // console.log("home page datas --", homePageData);

  return (
    <>
      <MainBanners
      //  mainBannersData={mainBannersData} 
       />
      <ExclusiveProducts exclusiveProductsData={enCoxSatilanlar} />
      <OurAdvantages />
      <NewArrivals newArrivalsDatas={yeniGelenler} />
    </>
  );
}
