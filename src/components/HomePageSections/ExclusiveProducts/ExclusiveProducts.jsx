import SwiperSliderGrid from '../../SwiperSliderGrid/SwiperSliderGrid';

export default function ExclusiveProducts({exclusiveProductsData}) {
  return (
  <>
    {
      (exclusiveProductsData?.products?.length > 0 || exclusiveProductsData?.length > 0) &&
    <div className="container" style={{paddingTop:0}}>
      <h4 className="sectionTitle">{exclusiveProductsData?.title}</h4>
      <SwiperSliderGrid sliderData={exclusiveProductsData?.products || exclusiveProductsData} />  
    </div>
    }
    </>
  );
}
