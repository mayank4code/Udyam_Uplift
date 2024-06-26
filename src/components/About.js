import React, { useEffect } from "react";

import i18n from "i18next";
import { useTranslation } from "react-i18next";

import aboutImg from "../images/about-img.svg";
import wepLogo from "../images/wep-logo.svg";
import caXpert from "../images/caXpert.svg";
import aboutmobile from "../images/aboutBgmobile.png";
import "../css/about.css";
import logo from "../assests/logo.png";
import asset1 from "../images/asset-1.png";
import metric1 from "../images/hand-coin.png";
import metric2 from "../images/thumb-badge.png";
import metric3 from "../images/hand-balane.png";
import barrupee from "../images/bar-rs.png";
import staruser from "../images/star-user.png";
import flowchart2 from "../images/flowchart2.png";
import flowchart3 from "../images/flowchart3.png";
import flowchart1 from "../images/flowchart1.png";
import india from "../images/india.png";
import smiley from "../images/smiley.png";
import handphone from "../images/hand-phone.png";
import logoudyam from "../images/logo-udyam.png";

const AboutPage = () => {
    const { t } = useTranslation("translation", { keyPrefix: "about" });

    useEffect(() => {
        let currentLang = localStorage.getItem("lang");
        i18n.changeLanguage(currentLang);
    }, []);

    return (
        <div className="u-about-page">
            {/* --------------------- Section 1 --------------------- */}
            <div className="u-about-page-section-1-bg">
                <div className="u-about-page-section-1">
                    {/* <div className="u-about-page-section-1-bg"></div> */}
                    <div className="u-about-page-section-1-heading">
                        <div>
                            <h1>{t('UDYAM_UPLIFT')}</h1>
                            <span>{t('UDYAM_UPLIFT')}</span>
                            <div className="horizontal-line"></div>
                        </div>
                        <div className="u-about-page-section-1-heading-img">
                            <img src={logoudyam} alt="" />
                        </div>
                    </div>
                    <div className="u-about-page-section-1-heading-p">
                        <p>
                            {t('UDYAM_UPLIFT_DESCRIPTION')}
                        </p>
                        <p>
                            {t('UDYAM_UPLIFT_QUESTION_TEST')}
                        </p>
                        <p>
                            {t('UDYAM_UPLIFT_DONUT_CHART')}
                        </p>
                    </div>
                </div>
            </div>
            {/* --------------------- Section 2 --------------------- */}
            <div className="u-about-page-section-2">
                <div>
                    <h2>{t('UDYAM_UPLIFT_CAN_HELP_ENTREPRENEURS')}</h2>
                    <div className="horizontal-line"></div>
                </div>
                <ul>
                    <li>
                        <div className="circle"></div>
                        {t('UNDERSTAND_SUSCEPTIBILITY')}
                    </li>
                    <li>
                        {" "}
                        <div className="circle"></div>
                        {t('IDENTIFY_AREAS_FOR_IMPROVEMENT')}
                    </li>
                    <li>
                        {" "}
                        <div className="circle"></div>
                        {t('DEVELOP_STRATEGIES_TO_MITIGATE_RISKS')}
                    </li>
                    <li>
                        {" "}
                        <div className="circle"></div>
                        {t('CREATE_COMPLIANT_WORKPLACE_CULTURE')}
                    </li>
                </ul>
            </div>
            {/* --------------------- Section 3 --------------------- */}
            <div className="u-about-page-section-3">
                <div>
                    <h2>{t('WHAT_IS_COMPLIANCE_TRAP_FOR_WE')}</h2>
                    <div className="horizontal-line"></div>
                </div>
                <div>
                    <p>
                        {t('DEFINITION_OF_COMPLIANCE_TRAP')}
                    </p>
                    <p>
                        {t('EXAMPLES_OF_COMPLIANCE_TRAP')}
                    </p>
                    <div className="u-about-page-section-3__boxes">
                        <div className="u-about-page-section-3__box">
                            {t('EXAMPLE_1_OF_COMPLIANCE_TRAP')}
                        </div>
                        <div className="u-about-page-section-3__box">
                            {t('EXAMPLE_2_OF_COMPLIANCE_TRAP')}
                        </div>
                        <div className="u-about-page-section-3__box">
                            {t('EXAMPLE_3_OF_COMPLIANCE_TRAP')}
                        </div>
                    </div>
                </div>
            </div>
            {/* --------------------- Section 4 --------------------- */}

            <div className="u-about-page-section-4">
                <div>
                    <h2>{t('THE_PROCESS')}</h2>
                    <div className="horizontal-line"></div>
                </div>
                <img src={asset1} alt="" />
            </div>
            {/* Section 5 */}
            <div className="u-about-page-section-5">
                <img src={flowchart1} alt="" />
            </div>
            {/* Section 6 */}
            <div className="u-about-page-section-6">
                <div className="u-about-page-section-6__sub">
                    <p>
                        {t('UDYAM_UPLIFT_FOR_LENDING_ORGANIZATIONS')}
                    </p>
                    <div className="u-about-page-section-6__boxes">
                        <div className="u-about-page-section-6__box">
                            {t('REDUCE_RISK_OF_DEFAULTS')}
                        </div>
                        <div className="u-about-page-section-6__box">
                            {t('IMPROVE_LOAN_PORTFOLIO_QUALITY')}
                        </div>
                        <div className="u-about-page-section-6__box">
                            {t('MAKE_BETTER_LENDING_DECISIONS')}
                        </div>
                        <div className="u-about-page-section-6__box">
                            {t('ENHANCE_REPUTATION')}
                        </div>
                    </div>
                    <p>
                        {t('USE_CASE_FOR_UDYAM_UPLIFT_FOR_LENDING_ORGS')}
                    </p>
                    <div className="u-about-page-section-6__sub-flowchart">
                        <img src={flowchart3} alt="" />
                    </div>
                    <p>
                        {t('EXAMPLE_OF_DEFAULT_RISK')}
                    </p>
                    <p>
                        {t('REDUCE_RISK_AND_MAKE_INFORMED_DECISIONS')}
                    </p>
                    <div></div>
                    <div className="u-about-page-section-6__metrics">
                        <h3>{t('METRICS_TO_TRACK')}</h3>
                        <div className="u-about-page-section-6__metrics-box">
                            <div>
                                <img src={metric1} alt="" />
                                <span>
                                    {t('REDUCTION_IN_DEFAULT_RATE')}
                                </span>
                            </div>
                            <div>
                                <img src={metric2} alt="" />
                                <span>
                                    {t('IMPROVEMENT_IN_LOAN_PORTFOLIO_QUALITY')}
                                </span>
                            </div>
                            <div>
                                <img src={metric3} alt="" />
                                <span>
                                    {t('IMPROVEMENT_IN_LENDING_DECISION_MAKING')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="u-about-page-section-6__sub">
                    <p>
                        {t('UDYAM_UPLIFT_FOR_COMPLIANCE_CHAMPIONS')}
                    </p>
                    <p>
                        {t('USE_CASE_FOR_UDYAM_UPLIFT_FOR_IMPACT_CONSULTANTS')}
                    </p>

                    <p>
                        {t('TRAINING_FOR_COMPLIANCE_CHAMPIONS')}
                    </p>
                    <div className="u-about-page-section-6__sub-flowchart">
                        <img src={flowchart2} alt="" />
                    </div>
                    <div className="u-about-page-section-6__metrics">
                        <h3>{t('METRICS_TO_TRACK_FOR_IMPACT_CONSULTANTS')}</h3>
                        <div className="u-about-page-section-6__metrics-box">
                            <div>
                                <img src={staruser} alt="" />
                                <span>{t('IMPACT_OF_UDYAM_UPLIFT_CLIENTS')}</span>
                            </div>
                            <div>
                                <img src={barrupee} alt="FINANCIAL_IMPACT_OF_UDYAM_UPLIFT" />
                                <span>
                                    {t('FINANCIAL_IMPACT_OF_UDYAM_UPLIFT')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Section 7 */}
            <div className="u-about-page-section-7">
                <div>
                    <h2>{t('FEATURES_OF_UDYAM_UPLIFT')}</h2>
                    <div className="horizontal-line"></div>
                </div>
                <div className="u-about-page-section-7__metrics-box">
                    <div>
                        <img src={handphone} alt="" />
                        <span>{t('MOBILE_FIRST_DESIGN')}</span>
                    </div>
                    <div>
                        <img src={india} alt="" />
                        <span>{t('FUNCTIONALITY_IN_EIGHT_LANGUAGES')}</span>
                    </div>
                    <div>
                        <img src={smiley} alt="" />
                        <span>
                            {t('VALUABLE_COMPREHENSIVE_FEEDBACK')}
                        </span>
                    </div>
                </div>
            </div>
            {/* Section 8 */}
            <div className="u-about-page-section-8">
                <div className="u-about-page-section-8__heading">
                    <div className="u-about-page-section-8__head">
                        <h2>{t('ABOUT_CAXPERT')}</h2>
                        <img src={caXpert} alt="" />
                        <h2>{t('ABOUT_CAXPERT2')}</h2>
                    </div>
                    <div className="horizontal-line"></div>
                </div>
                <div>
                    <p>
                        {t('CAXPERT_ACCOUNTING_SERVICES')}
                    </p>
                    <p>
                        {t('CAxpert_HANDS_ON_SERVICES')}
                    </p>
                    <p>
                        {t('SMALL_BUSINESS_OWNERS_ENGINE_OF_GROWTH')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
