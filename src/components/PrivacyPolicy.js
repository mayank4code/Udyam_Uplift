import React, { useEffect } from "react";
import "../css/privacypolicy.css"

//IMPORTS FOR Language change Functionality
import i18n from "i18next";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  //? Language Functionality Starts ......................................................................

  const { t } = useTranslation("translation", { keyPrefix: 'privacyPolicy' });

  //used to get language Stored in LocalStorage //*should be in every Page having Language Functionality 
  useEffect(() => {
    let currentLang = localStorage.getItem('lang');
    i18n.changeLanguage(currentLang);

    // console.log(t('array'  , { returnObjects: true }));
  }, []);


  //? Language Functionality Ends .................................................................

  return (
    <div className="privacy-policy-container">
      <header className="privacy-policy-header">
        <h1>{t('heading')}</h1>
      </header>
      <section className="privacy-policy-section">
        <ol>
          <li>
            <strong>{t('informationCollectHeader')}</strong>
            <p>{t('informationTypesHeader')}</p>
            <ul>
              <li><strong>{t('name')}:</strong> {t('nameDescription')}</li>
              <li><strong>{t('emailAddress')}:</strong> {t('emailAddressDescription')}</li>
              <li><strong>{t('testResponses')}:</strong> {t('testResponsesDescription')}</li>
              <li><strong>{t('userInputs')}:</strong> {t('userInputsDescription')}</li>
              <li><strong>{t('activitiesOnWebsite')}:</strong> {t('activitiesOnWebsiteDescription')}</li>
              <li><strong>{t('ipAddresses')}:</strong> {t('ipAddressesDescription')}</li>
              <li><strong>{t('cookies')}:</strong> {t('cookiesDescription')}</li>
            </ul>
          </li>
          <li>
            <strong>{t('howWeCollectInfo')}:</strong>
            <>{t('howWeCollectInfoDescription')}</>
          </li>
          <li>
            <strong>{t('howWeUseInfo')}:</strong>
            <>{t('howWeUseInfoDescription')}</>
          </li>
          <li>
            <strong>{t('sharingOfInfo')}:</strong>
            <>{t('sharingOfInfoDescription')}</>
          </li>
          <li>
            <strong>{t('cookiesAndTracking')}:</strong>
            <>{t('cookiesAndTrackingDescription')}</>
          </li>
          <li>
            <strong>{t('security')}:</strong>
            <>{t('securityDescription')}</>
          </li>
          <li>
            <strong>{t('userRights')}:</strong>
            <>{t('userRightsDescription')}</>
          </li>
          {/* Add more sections as needed */}
        </ol>
      </section>
      <footer className="privacy-policy-footer">
        <p>
          {t('lastUpdated')}
        </p>
        <p>
          {t('contactUs')} {" "}
          <a href="mailto:udyamuplift@gmail.com">udyamuplift@gmail.com</a>.
        </p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
