import React from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import Image1 from "./images/home-bg.png";

// import { Footer } from './Footer'
import { motion } from "framer-motion";
// import { InView } from 'react-intersection-observer'
// import videoFile from './images/Worklife.mp4'
import { useState, useEffect } from "react";
import { useInView } from "framer-motion";
// import { staggerContainer } from './framer'
// import { TypingText } from './text'

import { headerVariants, textVariant } from "./framer";
import LanguageSelectorModal from "./LanguageSelectorModal";
// import Picker from "react-scrollable-picker";

//IMPORTS FOR Language change Functionality
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguageContext";
import { faL } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const { t } = useTranslation("translation", { keyPrefix: "home" });

  useEffect(() => {
    let currentLang = localStorage.getItem("lang");
    i18n.changeLanguage(currentLang);

    // console.log(t('array'  , { returnObjects: true }));
  }, []);

  const [selectedLanguageM, setSelectedLanguageM] = useState({});
  const languages = [
    {
      value: "English",
      key: "en",
      disabled: false,
    },
    {
      value: "हिन्दी",
      key: "hi",
      disabled: false,
    },
    {
      value: "ଓଡ଼ିଆ",
      key: "od",
      disabled: false,
    },
    {
      value: "मराठी",
      key: "ma",
      disabled: false,
    },
    {
      value: "বাংলা",
      key: "ba",
      disabled: false,
    },
    {
      value: "ગુજરાતી",
      key: "gu",
      disabled: true,
    },
    {
      value: "தமிழ்",
      key: "ta",
      disabled: true,
    },
    {
      value: "कोंकणी",
      key: "ko",
      disabled: true,
    },
  ];

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let returningUser = localStorage.getItem("hasVisited");
    const timer = setTimeout(() => {
      setShowModal(!returningUser);
    }, 1000);
  }, []);

  const handleLanguageSelect = (language) => {
    setSelectedLanguageM(language);
    localStorage.setItem("lang", language);
    i18n.changeLanguage(language);
    localStorage.setItem("hasVisited", true);
    setShowModal(false);
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const buttonref = useRef(null);
  const buttonisInView = useInView(buttonref, { once: false });

  const [isLoading, setIsLoading] = useState(true);

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* modal */}

      {showModal && (
        <div className="modal-overlay">
          <LanguageSelectorModal
            languages={languages}
            onSelect={handleLanguageSelect}
          />
        </div>
      )}

      <div className={`container-page1 ${showModal ? "blur-background" : ""}`}>
        <div className="img-container">
          {/* <video className='image-top' controls={false} autoPlay muted
                        onLoadedData={handleLoadedData}
                        style={{ display: isLoading ? 'none' : 'block' }}
                    >
                        <source src={videoFile} type="video/mp4" />
                        {t('video_unsupported')}
                    </video> */}
          <div className="">
            <img src={Image1} className="img" layout="responsive"
            height={500}
            width={500}></img>
          </div>
        </div>

        <div className="container-2">
          <div className="fade-in-from-right">
            <motion.div
              variants={textVariant}
              initial="hidden"
              whileInView="show"
            >
              <h3 className="text-top">{t("text1")}</h3>
              <p>{t("text2")}</p>
            </motion.div>

            <div className="hero-btn-wrap">
              <Link to="/test/instructions" style={{ textDecoration: "nwrap" }}>
                <motion.a
                  className="btn"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  whileTap={{
                    scale: 0.9,
                    backgroundColor: "#71BF44",
                    color: "rgb(37, 23, 107)",
                  }}
                >
                  {t("start_test")}
                  <span className="arrow"> &rarr;</span>
                </motion.a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;