import styles from "./LocaleCategoryProducts.module.scss"
import { allProductsData } from "../../localeDatas/datas"
import { useParams } from "react-router-dom"
import PrCart from "../../components/PrCart/PrCart";


export default function LocaleCategoryProducts() {
 const {slug}= useParams();



const filterCategoryDatas = Object.values(allProductsData).find(
    (item) => item.slug === slug
  );

// console.log("locale filter data--", filterCategoryDatas);


  return (
    <div className="container">
    <div className={styles.localeCategoryProductsWrapper}>
     {
        filterCategoryDatas?.products?.map(product=>(
            <PrCart   
             key={product.id}
          data={product}/>
        ))
     }
</div>
    </div>
  )
}
