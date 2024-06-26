import React, { useEffect, useState } from 'react'
// import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { server_origin } from '../utilities/constants';

// import useWindowSize from "@rooks/use-window-size";
import Confetti from 'react-confetti'
import { toast } from "react-hot-toast";

//IMPORTS FOR Language change Functionality
import i18n from "i18next";
import { useTranslation } from "react-i18next";

import "../css/congrats.css";


const Congrats = () => {
  window.scrollTo(0, 0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    let savedProgress = localStorage.getItem('testProgress');
    savedProgress = JSON.parse(savedProgress);
    if (savedProgress === null || savedProgress.length !== 26) {
      toast.error(t('toast.incompleteTest'));
      navigate("/test/instructions");
      return;
    }
    verifyUser();
    setLoading(false);

  })
  const verifyUser = async () => {
    if (localStorage.getItem('token')) {
        const userId = process.env.REACT_APP_USER_ID;
        const userPassword = process.env.REACT_APP_USER_PASSWORD;
        const basicAuth = btoa(`${userId}:${userPassword}`);
        try {
            const response = await fetch(`${server_origin}/api/user/verify-user`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
                "Authorization": `Basic ${basicAuth}`,
              },
            });
      
            const result = await response.json()
            if (result.success === true) {
              setLoggedIn(true);
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Some error occured. Please try again later");
        }
    }
  }


  const handleRegister = () => {
    navigate("/register")
  }

  const handleLogin = () => {
    navigate("/login")
  }

  const handleViewReport = () => {
    navigate("/test/result")
  }


 //? Language Functionality Starts ......................................................................
  
const { t } = useTranslation("translation", { keyPrefix: 'congrats' });

//used to get language Stored in LocalStorage //*should be in every Page having Language Functionality 
useEffect(()=>{
  let currentLang = localStorage.getItem('lang');
  i18n.changeLanguage(currentLang);

  // console.log(t('array'  , { returnObjects: true }));
},[]);


//? Language Functionality Ends .................................................................


  // const { width, height } = useWindowSize()

  return (
    <div className="congrats">
      <Confetti
         width={window.innerWidth}
         height={window.innerHeight}
         numberOfPieces={300}
        //  recycle={false}
 />

 
      {!loading &&
        <div className="congratulations-container">
          <div className="congratulations-content">
            <h2 className='main-heading'>{t('congratulation')}<span>🎉</span></h2>
            <p className='sub-heading'>{t('textCongrat')}</p>
            {
              !loggedIn ?
                <p className='sub-heading'>{t('pleaseLogin')}</p>
                : <p className='sub-heading'>{t('viewResult')}</p>
            }
            <div className="buttons-container">
              {
                !loggedIn ? <>
                  <button className="login-button" onClick={handleLogin}>{t('login_btn')}</button>
                  <button className="signup-button" onClick={handleRegister}>{t('signUp_btn')} </button>
                </>
                  : <button className="signup-button" onClick={handleViewReport}>{t('viewResult_btn')} </button>
              }
            </div>
          </div>
        </div>

      }

    </div>
  )
}

export default Congrats