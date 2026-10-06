import styles from "./Footer.module.scss";
import "swiper/css";  
import logo from "../../assets/logos/logo.png";
import paymentCartLogo from "../../assets/logos/paymentCartLogo.png";
import { NavLink } from "react-router-dom";
import RightIcon from "../../assets/icons/RightIcon";
import FacebookIcon from "../../assets/icons/FacebookIcon";
import InstagramIcon from "../../assets/icons/InstagramIcon";
import TiktokIcon from "../../assets/icons/TiktokIcon";
// import markerIcon from "../../assets/images/map.png";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
import looptechLogoAnimate from "../../assets/logos/looptech-logo-animated.svg";


export default function Footer() {
  return (
    <div className={styles.footerWrapper}>
     
      <div className={styles.footerBottom}>
        <div className="container">
          <div className={styles.footercontent}>
            <div className={styles.footerLeft}>
              <a href="/" className={styles.siteFotterLogo}>
                <img src={logo} alt="" />
              </a>
              <p className={styles.siteShortInfo}>
           Qisa metin olacaq 2 cumlelik
              </p>
              <img
                src={paymentCartLogo}
                alt=""
                className={styles.paymentCartLogo}
              />
            </div>
            <div className={styles.footerPageList}>
              <NavLink
                to={"haqqimizda"}
                className={({ isActive }) =>
                  `${styles.pageStyle} ${isActive ? styles.activePage : ""}`
                }
              >
                <RightIcon />
                Haqqımızda
              </NavLink>

              <NavLink
                to={"/Çatdırılma-şərtləri"}
                className={({ isActive }) =>
                  `${styles.pageStyle} ${isActive ? styles.activePage : ""}`
                }
              >
                <RightIcon />
                Çatdırılma şərtləri
              </NavLink>
              <NavLink
                to={"/Gizlilik-siyasəti"}
                className={({ isActive }) =>
                  `${styles.pageStyle} ${isActive ? styles.activePage : ""}`
                }
              >
                <RightIcon />
                Gizlilik siyasəti
              </NavLink>
              <NavLink
                to={"/Qaydalar"}
                className={({ isActive }) =>
                  `${styles.pageStyle} ${isActive ? styles.activePage : ""}`
                }
              >
                <RightIcon />
                Qaydalar
              </NavLink>
            </div>
            <div className={styles.footerContantList}>
              <h4 className={styles.title}>Əlaqə</h4>
              <a
                href="h"
                className={styles.communicationIndicator}
              >
                <h6 className={styles.key}>Ünvan:</h6>
                <span className={styles.value}>
                Burada magazanin unvani olacaq 
                </span>
              </a>
              <a
                href="tel:xxxxxxx"
                className={styles.communicationIndicator}
              >
                <h6 className={styles.key}>Telefon:</h6>
                <span className={styles.value}> + 994 xx xxx xx xx</span>
              </a>
              <a
                href=""
                target="_blank"
                className={styles.communicationIndicator}
              >
                <h6 className={styles.key}>E-mail:</h6>
                <span className={styles.value}>info@unistore.az</span>
              </a>
              <div className={styles.communicationIndicator}>
                <h6 className={styles.key}>İş saatları:</h6>
                <span className={styles.value}>Hər gün 8:00 - 17:00</span>
              </div>
              <div className={styles.footerSocila}>
                <a
                  target="_blank"
                  href=""
                >
                  <FacebookIcon />
                </a>
                <a
                  target="_blank"
                  href=""
                >
                  <InstagramIcon />
                </a>
                <a
                  target="_blank"
                  href=""
                >
                  <TiktokIcon />
                </a>
              </div>
            </div>
            <div className={styles.mapWrapper}>
<iframe
  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3041.7503023102295!2d49.7653999!3d40.3256989!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307fda20058dfb%3A0xef07c30c15372241!2sUnistore%20Electronics!5e0!3m2!1str!2saz!4v1783629635707!5m2!1str!2saz"
  width="100%"
  height="250"
  style={{ border: 0, borderRadius: "14px" }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="strict-origin-when-cross-origin"
/>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <span className={styles.whiteLine}></span>
        <div className={styles.createdWebsite}>
          <span className={styles.copyright}>Copyright © 2026 </span>
          <a
            className={styles.createdBy}
            href="https://looptech.az/"
            target="_blank"
          >
            Saytı hazırladı:
            <object
              className={styles.looptechLogo}
              data={looptechLogoAnimate}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
