import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import PrCart from "../../components/PrCart/PrCart";
import unistoreSite from "../../Helpers/helpers";
import urls from "../../ApiUrls/urls";
import styles from "./ProductsFilter.module.scss";
import Pagination from "../../components/Pagination/Pagination";
import NoProduct from "../../assets/icons/NoProduct";

export default function ProductsFilter() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("searchValue") || "";
  const page = Number(searchParams.get("page"));
  const currentPage = Number.isInteger(page) && page > 0 ? page : 1;
  const fetchUrl = slug
    ? urls.productCategoryFilter(slug, "", undefined, undefined, currentPage)
    : `${urls.search(encodeURIComponent(searchValue))}&page=${currentPage}&perPage=24`;
  const [result, setResult] = useState(null);
  const products = result?.url === fetchUrl ? result.products : null;

  useEffect(() => {
    let active = true;

    async function fetchProducts() {
      try {
        const res = await unistoreSite.api().get(fetchUrl);
        if (active) {
          setResult({ url: fetchUrl, products: res.data?.products || res.data });
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } catch (error) {
        console.error("Fetch error:", error);
        if (active) {
          setResult({ url: fetchUrl, products: { data: [], meta: { totalPages: 0 } } });
        }
      }
    }

    fetchProducts();
    return () => {
      active = false;
    };
  }, [fetchUrl]);

  return (
    <div className="container">
      {!products ? null : products.data?.length > 0 ? (
        <>
          <div className={styles.productsFilterPage}>
            <div className={styles.productsFilerResult}>
              {products.data.map((product) => (
                <PrCart key={product.id} data={product} />
              ))}
            </div>
          </div>
          {products.meta?.totalPages > 1 && (
            <Pagination pageCountApi={products.meta.totalPages} />
          )}
        </>
      ) : (
        <span className={styles.noProduct}><NoProduct /> Məhsul tapılmadı</span>
      )}
    </div>
  );
}
