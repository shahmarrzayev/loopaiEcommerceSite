import styles from "./Header.module.scss";
import logo from "../../assets/logos/logo.png";
import PhoneIcon from "../../assets/icons/PhoneIcon";

import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import BasketIcon from "../../assets/icons/BasketIcon";
import SearchIcon from "../../assets/icons/SearchIcon";

import { useEffect, useState } from "react";

import CloseIcon from "../../assets/icons/CloseIcon";
import HomePageIcon from "../../assets/icons/HomePageIcon";
import MobileHeaderBottomCategoryIcon from "../../assets/icons/MobileHeaderBottomCategoryIcon";
import MobileHeaderBottomBasketIcon from "../../assets/icons/MobileHeaderBottomBasketIcon";

import { useDispatch, useSelector } from "react-redux";

import { getAllBasketData } from "../../redux/basketSlice";
import { getCategoryData } from "../../redux/categorySlice";

import {
  searchProduct,
  clearSearch,
} from "../../redux/localeSearchSlice";

import MobileCategory from "../MobileCategory/MobileCategory";

import ArrowRight from "../../assets/icons/ArrowRight";
import CatalogHeaderIcon from "../../assets/icons/CatalogHeaderIcon";
import Category from "../Category/Category";

export default function Header() {
  const dispatch = useDispatch();
  const {localeBasketData} = useSelector(state=>state.localeBasketStore,)
  const [isScrolled, setIsScrolled] = useState(window.scrollY > 20);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();

  const location = useLocation();

  const { basketData } = useSelector(
    (state) => state.basketStore
  );

  const { searchResultData } = useSelector(
    (state) => state.localeSerachStore
  );

  const [showHiddenWebCatalog, setShowHiddenWebCatalog] =
    useState(false);

  const [mobileCatalog, setMobileCatalog] =
    useState(false);

  const [searchInpValue, setSearchInpValue] =
    useState("");

  const [searchPrMapLimit, setSearchPrMapLimit] =
    useState(window.innerWidth <= 750 ? 4 : 5);

  useEffect(() => {
    dispatch(getCategoryData());
    dispatch(getAllBasketData());
  }, [dispatch]);

  const handleMobileCatalog = () => {
    setMobileCatalog(!mobileCatalog);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;

    setSearchInpValue(value);

    if (!value.trim()) {
      dispatch(clearSearch());
      return;
    }

    dispatch(searchProduct(value));
  };

  const handleClearSearch = () => {
    setSearchInpValue("");
    dispatch(clearSearch());
  };

  const searchNavigateFunc = () => {
    if (!searchInpValue.trim()) return;

    const params = new URLSearchParams();

    params.set("searchValue", searchInpValue);

    navigate(`/search?${params.toString()}`);

    setSearchInpValue("");
  };

  useEffect(() => {
    if (mobileCatalog) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileCatalog]);

  useEffect(() => {
    setSearchInpValue("");
    dispatch(clearSearch());
  }, [location.pathname, dispatch]);

  useEffect(() => {
    const handleResize = () =>
      setSearchPrMapLimit(
        window.innerWidth <= 750 ? 4 : 5
      );

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  return (
    <div className={`${styles.headerWrapper} ${isScrolled ? styles.scrolled : ""}`}>
      <div className="container">
        <div style={{ paddingBottom: 0 }}>
          <div className={styles.headerContents}>

            <a
              href="/"
              className={styles.siteLogo}
            >
              <img src={logo} alt="" />
            </a>

            <div
              className={
                styles.categoryBtnAndCategoryContent
              }
              onMouseEnter={() =>
                setShowHiddenWebCatalog(true)
              }
              onMouseLeave={() =>
                setShowHiddenWebCatalog(false)
              }
            >
              <span className={styles.catalogBtn}>
                <CatalogHeaderIcon color="white" />
                Kataloq
              </span>

              {showHiddenWebCatalog && (
                <Category
                  onClose={() =>
                    setShowHiddenWebCatalog(false)
                  }
                />
              )}
            </div>

            <div className={styles.searchWrapper}>
              <input
                id="search"
                type="text"
                autoComplete="off"
                value={searchInpValue}
                placeholder="Axtarış"
                onChange={handleSearchChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchNavigateFunc();
                  }
                }}
              />

              <label htmlFor="search">
                {searchInpValue.length > 0 ? (
                  <span
                    className={
                      styles.inpValueRemove
                    }
                    onClick={handleClearSearch}
                  >
                    <CloseIcon />
                  </span>
                ) : (
                  <span
                    onClick={searchNavigateFunc}
                  >
                    <SearchIcon />
                  </span>
                )}
              </label>

              {searchInpValue.length > 0 && (
                <div
                  className={
                    styles.searchAreaWrapper
                  }
                >
                  <div
                    className={
                      styles.searchValueandAllSearchBtn
                    }
                  >
                    <span
                      className={
                        styles.searchValue
                      }
                    >
                      "{searchInpValue}" üzrə nəticələr
                    </span>

                    {searchResultData?.length > 0 && (
                      <span
                        onClick={searchNavigateFunc}
                        className={
                          styles.allSearchValue
                        }
                      >
                        Hamısını göstər <ArrowRight />
                      </span>
                    )}
                  </div>

                  <div
                    className={
                      styles.headerSearchResult
                    }
                  >
                    {searchResultData?.length > 0 ? (
                      searchResultData
                        .slice(
                          0,
                          searchPrMapLimit
                        )
                        .map((item) => (
                          <div
                            onClick={() => {
                              navigate(
                                `/details/${item?.slug}`
                              );

                              setSearchInpValue("");

                              dispatch(
                                clearSearch()
                              );
                            }}
                            key={item.id}
                            className={
                              styles.searchResultCart
                            }
                          >
                            {/* PRODUCT IMAGE */}
                            <div
                              className={
                                styles.prImageWrapper
                              }
                            >
                              <img
                                src={
                                  item?.images?.[0]
                                }
                                alt={
                                  item?.title
                                }
                              />
                            </div>

                            {/* PRODUCT TITLE */}
                            <span
                              className={
                                styles.prTitle
                              }
                            >
                              {item?.title}
                            </span>

                            {/* OLD PRICE */}
                            {item?.discountedPrice && (
                              <span
                                className={
                                  styles.price
                                }
                              >
                                {item?.price}₼
                              </span>
                            )}

                            <span
                              className={
                                styles.discountedPrice
                              }
                            >
                              {item?.discountedPrice
                                ? item?.discountedPrice
                                : item?.price}
                              ₼
                            </span>
                          </div>
                        ))
                    ) : (
                      <div
                        className={
                          styles.noSearchResult
                        }
                      >
                        Məhsul tapılmadı
                      </div>
                    )}
                  </div>

                  {/* ALL RESULTS */}
                  {searchResultData?.length > 0 && (
                    <span
                      onClick={searchNavigateFunc}
                      className={
                        styles.allResultBtn
                      }
                    >
                      Bütün nəticələrə bax{" "}
                      <ArrowRight />
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* PHONE */}
            <a
              href="tel:+994558779257"
              className={
                styles.webHeaderPhone
              }
            >
              <span
                className={styles.phoneIcon}
              >
                <PhoneIcon /> İndi zəng et :
              </span>

              <span
                className={styles.phone}
              >
                + 994 55 877 92 57
              </span>
            </a>

            {/* WEB BASKET */}
            <div
              className={
                styles.webHeaderRigth
              }
            >
              <NavLink
                to="/sebetim"
                className={styles.basket}
              >
                <BasketIcon /> Səbət

                  <span
                    className={`${styles.inPrCount} basketCount`}
                  >
                    {localeBasketData?.length
                      ? localeBasketData.length
                      : 0}
                  </span>
                
              </NavLink>
            </div>

            {/* MOBILE CATEGORY */}
            {mobileCatalog && (
              <MobileCategory
                closeCatalog={
                  handleMobileCatalog
                }
              />
            )}

            {/* MOBILE HEADER BOTTOM */}
            <div
              className={
                styles.mobileHeaderBottom
              }
            >
              <a
                href="/"
                className={styles.homePage}
              >
                <HomePageIcon />
              </a>

              <span
                onClick={handleMobileCatalog}
                className={
                  styles.categoryBtn
                }
              >
                <MobileHeaderBottomCategoryIcon />
              </span>

              <NavLink
                to="/sebetim"
                className={styles.basket}
              >
                <MobileHeaderBottomBasketIcon />

                {basketData?.items?.length > 0 && (
                  <span
                    className={`${styles.inPrCount} basketCount`}
                  >
                    {basketData?.items?.length
                      ? basketData.items.length
                      : 0}
                  </span>
                )}
              </NavLink>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}