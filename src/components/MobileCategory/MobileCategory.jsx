import styles from "./MobileCategory.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import CloseIcon from "../../assets/icons/CloseIcon";
import CategoryMobileRightIcon from "../../assets/icons/CategoryMobileRightIcon";
import BoyukMeisetTexIcon from "../../assets/icons/BoyukMeisetTexIcon";
import TvAudioIcon from "../../assets/icons/TvAudioIcon";
import QurasdirilanTexnikaIcon from "../../assets/icons/QurasdirilanTexnikaIcon";
import MetbexUcunXirdaTexnika from "../../assets/icons/MetbexUcunXirdaTexnika";
import IqlimTexnikasi from "../../assets/icons/IqlimTexnikasi";
import KicikMeisetTexnikasi from "../../assets/icons/KicikMeisetTexnikasi";

const icons = [
  {
    id: "6a0ee188014dba151d4b175a",
    icon: <BoyukMeisetTexIcon />,
    slug: "boyuk-meiset-texnikasi",
  },
  {
    id: "6a0ee188014dba151d4b185e",
    icon: <TvAudioIcon />,
    slug: "tv-audio-ve-video",
  },
  {
    id: "6a379adebf66d9b7eaa6f51f",
    icon: <QurasdirilanTexnikaIcon />,
    slug: "qurasdirilan-texnika",
  },
  {
    id: "6a379adebf66d9b7eaa6f808",
    icon: <MetbexUcunXirdaTexnika />,
    slug: "metbex-ucun-xirda-texnika",
  },
  {
    id: "6a379adebf66d9b7eaa6fbff",
    icon: <IqlimTexnikasi />,
    slug: "iqlim-texnikasi",
  },
  {
    id: "6a379ae0bf66d9b7eaa7167d",
    icon: <KicikMeisetTexnikasi />,
    slug: "kicik-meiset-texnikasi",
  },
];

export default function MobileCategory({ closeCatalog }) {
  const [menuStack, setMenuStack] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryData } = useSelector((state) => state.categoryStore);



  const currentMenu =
    menuStack.length === 0
      ? categoryData
      : menuStack[menuStack.length - 1].children;

  const handleClick = (category) => {
    if (category.children?.length > 0) {
      setMenuStack((prev) => [...prev, category]);
    } else {
      navigate(category.slug);
      closeCatalog();
    }
  };

  const handleBack = () => {
    setMenuStack((prev) => prev.slice(0, -1));
  };

  return (
    <div className={styles.catalogWrapper}>
      <div className={styles.titleAndIcon}>
        <h4 className={styles.title}>Kateqoriyalar</h4>
        <span onClick={closeCatalog} className={styles.catologCloseBtn}>
          <CloseIcon color={"black"} />
        </span>
      </div>
      {menuStack.length > 0 && (
        <button className={styles.backBtn} onClick={handleBack}>
          ← Geri
        </button>
      )}
      {/* son elementi goturur */}
      <div className={styles.menuSlide} key={menuStack.length}>
        {currentMenu?.map((category) => (
          <div
            key={category.id}
            className={styles.categoryItem}
            onClick={() => handleClick(category)}
          >
            <div className={styles.categoryNameWrapper}>
              {menuStack.length === 0 &&
                icons.find((icon) => icon.id === category.id)?.icon}
              <span>{category.name.az}</span>
            </div>
            {category.children && (
              <span className={styles.arrow}>
                <CategoryMobileRightIcon />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
