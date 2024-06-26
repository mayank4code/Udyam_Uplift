// LanguageSelectorModal.js

import React, { useEffect } from 'react';
import './LanguageSelectorModal.css'; // Import your CSS file
import { useLanguage } from '../../context/LanguageContext' ;
import i18n from 'i18next';
import { useTranslation } from "react-i18next";
// import { useState } from 'react';


const LanguageSelectorModal = ({ languages, onSelect }) => {

  const { t } = useTranslation("translation", { keyPrefix: 'home' });
  
  useEffect(()=>{
    let currentLang = selectedLanguage ;
    localStorage.setItem('lang' , currentLang);
    i18n.changeLanguage(currentLang);
  }, []);

  const { selectedLanguage , setSelectedLanguage} = useLanguage();
  const handleLanguageClick = (language_key) => {
    onSelect(language_key);
    setSelectedLanguage(language_key);
  };
  
  return (
    <div className="modal-container">
      <h4 className='modal-heading'>{t('select_your_language')}</h4>
      <ul className="language-list">
        {languages.map(language => (
          <li
            key={language.key}
            onClick={() => handleLanguageClick(language.key)}
            className={`${language.disabled ? 'disabled' : ''} language-option`}
          >
            <label className='checkbox-label'>
              <input className='input'
                type="radio"
                checked={language.key === selectedLanguage}
                disabled = {language.disabled}
                readOnly
              />
              {language.value}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSelectorModal;
