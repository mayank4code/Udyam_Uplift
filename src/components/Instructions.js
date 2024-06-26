import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/instructions.css"


//IMPORTS FOR Language change Functionality
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
// import '../../library/i18n';

function InstructionsPage() {
  const { t } = useTranslation("translation", { keyPrefix: 'instruction' });
  //used to get language Stored in LocalStorage //*should be in every Page having Language Functionality 
  useEffect(() => {
    let currentLang = localStorage.getItem('lang');
    i18n.changeLanguage(currentLang);

    // console.log(t('array'  , { returnObjects: true }));

  }, []);
  
  const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(false);

  const handlePrivacyPolicyCheck = () => {
      setPrivacyPolicyChecked(!privacyPolicyChecked);
    };
    
    const handleStartTest = () => {
      if (privacyPolicyChecked) {
        // User has accepted the privacy policy, navigate to the test start page
        navigate("/test/start");
        toast.success(t('toast.testStartedMessage'))
      } else {
        // Display an error message or alert to indicate that the privacy policy must be accepted
        toast(t('toast.acceptTermsMessage'))
      }
    };

  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="instructions-page">
        <>
          <h1>{t("testInstructions")}</h1>
          <p>{t("welcomeMessage")}</p>
          <p>
            <strong>{t("instructionsHeader")}</strong>
          </p>
          <ol>
            {t("instructionList", { returnObjects: true }).map(
              (instruction, index) => (
                <li key={index}>{instruction}</li>
              )
            )}
          </ol>
          {/* <p>
            <strong>Note</strong>: Please be aware of our privacy policy.
          </p> */}

          <div className="privacy-policy-container-inst">
  <label className="checkbox-label">
    <input
      type="checkbox"
      checked={privacyPolicyChecked}
      onChange={handlePrivacyPolicyCheck}
    />
    <span className="checkmark"></span>
    {t("iAgreeToThe")}<Link to="/privacy-policy">{t("privacyPolicy")}</Link> {t("and")} <Link to="/disclaimer">{t("termsAndConditions")}</Link>.
  </label>
</div>
{/* <div className="privacy-policy-link">
  <Link to="/privacy-policy">View our privacy policy</Link>
</div> */}

          <div className="start-button-container">
            <button
              onClick={handleStartTest}
              className="btn btn-primary"
            //   disabled={!privacyPolicyChecked}
            >
              {t("startTestButton")}
            </button>
          </div>
        </>
      </div>
    </div>
  );
}

export default InstructionsPage;

