import React, { useEffect } from "react";
import "./home.css";
// import { BsTwitter } from "react-icons/bs";
// import { FaFacebook } from "react-icons/fa";
// import { BsLinkedin } from "react-icons/bs";
// import { BsYoutube } from "react-icons/bs";
// import img from "./images/logo512.png";
import { Link } from "react-router-dom";

//IMPORTS FOR Language change Functionality
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import "../../library/i18n";

const Footer = () => {
  //? Language Functionality Starts ............................................................

  const { t } = useTranslation("translation", { keyPrefix: "footer" });

  //used to get language Stored in LocalStorage //*should be in every Page having Language Functionality
  useEffect(() => {
    let currentLang = localStorage.getItem("lang");
    i18n.changeLanguage(currentLang);

    // console.log(t('array'  , { returnObjects: true }));
  }, []);

  //? Language Functionality Ends .................................................................

  return (
    <div className="footer">
      <div className="footer-deco">
        <Link to="/disclaimer" className="link">{t('Disclaimer')}</Link>
        <div>|</div>
        <Link to="/privacy-policy" className="link">{t('Privacy')}</Link>
      </div>
    </div>
  );
};

export default Footer;
