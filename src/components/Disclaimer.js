// Disclaimer.js
import React , {useEffect} from "react";
import "../css/disclaimer.css"

//IMPORTS FOR Language change Functionality
import i18n from "i18next";
import { useTranslation } from "react-i18next";

const Disclaimer = () => {
   //? Language Functionality Starts ......................................................................
  
const { t } = useTranslation("translation", { keyPrefix: 'disclaimer' });

//used to get language Stored in LocalStorage //*should be in every Page having Language Functionality 
useEffect(()=>{
  let currentLang = localStorage.getItem('lang');
  i18n.changeLanguage(currentLang);

  // console.log(t('array'  , { returnObjects: true }));
},[]);


//? Language Functionality Ends .................................................................

  return (
    <div className="disclaimer-container">
    <header className="disclaimer-header">
      <h1>{t('heading')}</h1>
    </header>
    <section className="disclaimer-section">
      <ul>
        <li>
          <strong>{t('purposeAccuracy')}</strong>
          <p>
            {t('websiteInfo')}
          </p>
        </li>
        <li>
          <strong>{t('userResponsibilities')}</strong>
          <p>
          {t('userResponsibilitiesText')}
          </p>
        </li>
        <li>
          <strong>{t('legalProtection')}</strong>
          <p>
          {t('legalProtectionText')}  
          </p>
        </li>
        <li>
          <strong>{t('contactInformation')}</strong>
          <p>
          {t('contactInfoPlaceholder')} {" "}
            <a href="mailto:udyamuplift@gmail.com">udyamuplift@gmail.com</a>.
          </p>
        </li>
      </ul>
    </section>
  </div>
  );
};

export default Disclaimer;
