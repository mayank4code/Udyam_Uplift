import React, { useState, useEffect } from "react";
import { server_origin } from "../utilities/constants";
// import { useLanguage } from '../context/LanguageContext';

import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../css/login.css";

// Firebase for OTP
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

//IMPORTS FOR Language change Functionality
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const navigate = useNavigate();

  const [componentState, setComponentState] = useState(-1);
  //*

  // const { userTestResponses} = useLanguage();

  //* 3 Inputs mobile, otp and password
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOTP] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  //*

  //* Checkers
  // const [otpSent, setOTPSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState(null);

  const [captchaGenerated, setCaptchaGenerated] = useState(false);

  //? Language Functionality Starts ............................................................

  const { t } = useTranslation("translation", { keyPrefix: "login" });

  const [userTestResponses, setUserTestResponses] = useState([]);

  //used to get language Stored in LocalStorage //*should be in every Page having Language Functionality
  useEffect(() => {
    let currentLang = localStorage.getItem("lang");
    i18n.changeLanguage(currentLang);

    // console.log(t('array'  , { returnObjects: true }));
  }, []);

  useEffect(() => {
    let savedProgress = localStorage.getItem("testProgress");
    savedProgress = JSON.parse(savedProgress);
    // if(savedProgress===null || savedProgress.length!==26){
    //     toast.error("Please complete the test to continue");
    //     navigate("/test/instructions");
    //     return;
    // }
    setUserTestResponses(savedProgress);
  }, []);

  //? Language Functionality Ends .................................................................

  //These 3 functions are for OTP sending and verification
  function onCaptchVerify() {
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response) => {
              setCaptchaGenerated(true);
              onSignup();
            },
            "expired-callback": () => {
              toast.error(t("toast.capthchaExpiredToast"));
            },
          },
          auth
        );
      }
    } catch (err) {
      console.log("Captcha error: ", err);
    }
  }

  //! WILL WORK ONLY FOR INDIAN PHONE NUMBERS WITH +91 code.
  const onSignup = () => {
    //* Display EnterOTP component when OTP is sent successfully
    const mobLength = mobileNumber.length;
    if (mobLength !== 10) {
      toast.error(t("toast.invalidMobileToast"));
      return;
    }
    setLoading(true);
    //*Show OTP enter component
    setComponentState(0);

    //* Generate window.recaptcha
    // if (captchaGenerated === false) {
    // console.log("HERE");
    onCaptchVerify();
    // }

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+91" + mobileNumber;
    // console.log("formatPh: ", formatPh);

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        // setOTPSent(true);
        setComponentState(0);
        const str = t("toast.otpSentToast") + " " + formatPh;
        toast.success(str);
      })
      .catch((error) => {
        // toast.error("Please refresh the page and try again!");
        setOtpError(
          `Some error occured Please try again later. ${error.message}`
        );
        console.log("error1: ", error);

        // if(!otpError)
        // toast(error.message);
        // toast.error("Some error occured.");
        // setComponentState(-1);
        setLoading(false);
      });
  };

  function onOTPVerify() {
    setLoading(true);
    // toast("Please wait");
    window.confirmationResult
      .confirm(otp)
      .then((res) => {
        // OTP is verified, send request to server for token
        // console.log("RESRES: ", res);
        setOtpVerified(true);
        setLoading(false);
        toast.success(t("toast.otpVerifiedToast"));
        // OTP is verified - Show Enter Password create component
        setComponentState(2);
      })
      .catch((err) => {
        toast.error(t("toast.enterCorrectOTPToast"));
        console.log(err);
        if (err.code === "auth/code-expired") {
          setOtpError(t("toast.otpExpired"));
        } else {
          setOtpError(t("toast.otpInvalid"));
        }
        setLoading(false);
      });
  }

  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
  };

  const handleOTPChange = (event) => {
    setOTP(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordMatch(event.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordMatch(event.target.value === password);
  };

  // * Single function to handle complete login
  const handleLoginClick = async () => {
    setLoading(true);
    if (mobileNumber.length !== 10) {
      toast.error(t("toast.invalidMobileToast"));
      setLoading(false);
      return;
    }

    // Check if the mobile is not registered
    const userId = process.env.REACT_APP_USER_ID;
        const userPassword = process.env.REACT_APP_USER_PASSWORD;
        const basicAuth = btoa(`${userId}:${userPassword}`);
        console.log("userID", userId)
    const response = await fetch(
      `${server_origin}/api/user/check-mobile-registered`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${basicAuth}`,
        },
        body: JSON.stringify({ mobile: mobileNumber }),
      }
    );
    let response1 = await response.json();
    if (response1.success === false) {
      // Not registered before
      navigate("/register");
      toast.error(t("toast.mobileNo_not_registered"));
      setLoading(false);
      return;
    }
    //* Registered
    if (password.length === 0) {
      toast.error(t("toast.enter_password"));
      setLoading(false);
      return;
    }
    //login user

    // handleCheckPasswordButtonClick();
    try {
        const responsee = await fetch(`${server_origin}/api/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${basicAuth}`,
          },
          body: JSON.stringify({ mobile: mobileNumber, password: password }),
        });
        const responsee1 = await responsee.json();
        if (responsee1.success === false) {
          toast.error(t("toast.wrongPasswordToast"));
          setLoading(false);
          return;
        }
    
        //* Password is correct
        const token = responsee1.token;
        localStorage.setItem("token", token);
    
        // * Update the responses only if test is given already (testProgress is in localStorage)
        if (localStorage.getItem("testProgress")) {
            const userId = process.env.REACT_APP_USER_ID;
            const userPassword = process.env.REACT_APP_USER_PASSWORD;
            const basicAuth = btoa(`${userId}:${userPassword}`);
          const responseUpdate = await fetch(
            `${server_origin}/api/user/update-response`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "auth-token": token,
                "Authorization": `Basic ${basicAuth}`,
              },
              body: JSON.stringify({ responses: userTestResponses }),
            }
          );
          let response2 = await responseUpdate.json();
          if (response2.success === false) {
            toast.error(t("toast.tryAgain"));
            setLoading(false);
            return;
          }
    
          localStorage.removeItem("testProgress");
          toast.success(t("toast.loggedInToast"));
          setLoading(false);
          navigate("/test/result");
          return;
        }
        navigate("/");
        
    } catch (error) {
        setLoading(false);
        console.log(error.message);
        toast.error("Some error occured. Please try again later");
    }
    
    setLoading(false);
  };

  const handleVerifyOtpClick = () => {
    //* When OTP is verified show set password component
    onOTPVerify();
  };

  // const handleCheckPasswordButtonClick = async () => {
  //     //* Check the password
  //     setLoading(true);
  //     // Check if the password is correct
  //     const response = await fetch(`${server_origin}/api/user/login`, {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ mobile: mobileNumber, password: password })
  //     });
  //     const response1 = await response.json();
  //     const token = response1.token;

  //     if (response1.success === true) {
  //         localStorage.setItem("token", token);
  //         // console.log("response here: ", response1);
  //         // console.log("Inside if block");

  //         //* Password is correct
  //         //* Update the responses
  //         const responseUpdate = await fetch(`${server_origin}/api/user/update-response`, {
  //             method: 'PUT',
  //             headers: {
  //                 'Content-Type': 'application/json',
  //                 'auth-token': token
  //             },
  //             body: JSON.stringify({responses: userTestResponses})
  //         });
  //         let response2 = await responseUpdate.json();
  //         toast.success(t('toast.loggedInToast'));
  //         setLoading(false);
  //         navigate('/test/result');
  //     }
  //     else {
  //         //* Wrong password
  //         toast.error(t('toast.wrongPasswordToast'));
  //         setLoading(false);
  //     }
  // }

  const handleCreatePasswordButton = async () => {
    //* Create new password?
    //* After this user is logged in and token is saved
    if (password !== confirmPassword) {
      toast.warning(t("toast.passwordNotMatchToast"));
      return;
    }
    setLoading(true);
    const userId = process.env.REACT_APP_USER_ID;
        const userPassword = process.env.REACT_APP_USER_PASSWORD;
        const basicAuth = btoa(`${userId}:${userPassword}`);
    // Create password and generate token and login
    const response = await fetch(`${server_origin}/api/user/update-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${basicAuth}`,
      },
      body: JSON.stringify({ mobile: mobileNumber, password: password }),
    });
    let response1 = await response.json();
    if (response1.success) {
      toast.success(t("toast.passwordCreatedToast"));

      const response = await fetch(`${server_origin}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${basicAuth}`,
        },
        body: JSON.stringify({ mobile: mobileNumber, password: password }),
      });
      const response1 = await response.json();
      const token = response1.token;
      if (response1.success) {
        localStorage.setItem("token", token);
        if (localStorage.getItem("testProgress")) {
          navigate("/test/result");
        } else {
          navigate("/");
        }
      }
      setLoading(false);
    } else {
      toast.error(t("toast.cannotUpdatePasswordToast"));
      setLoading(false);
    }
  };

  const handleForgotPasswordButtonClick = async () => {
    //* Show OTP
    //* Have to check if the number is registered or not
    setLoading(true);
    if (mobileNumber.length !== 10) {
      toast.error(t("toast.invalidMobileToast"));
      setLoading(false);
      return;
    }

    const userId = process.env.REACT_APP_USER_ID;
        const userPassword = process.env.REACT_APP_USER_PASSWORD;
        // console.log("userID", userId);
        const basicAuth = btoa(`${userId}:${userPassword}`);
    const response = await fetch(
      `${server_origin}/api/user/check-mobile-registered`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${basicAuth}`,
        },
        body: JSON.stringify({ mobile: mobileNumber }),
      }
    );
    let response1 = await response.json();
    if (response1.success === false) {
      // Not registered before
      navigate("/register");
      toast.error(t("toast.mobileNo_not_registered"));
      setLoading(false);
      return;
    }

    onSignup();
  };

  //components //* should start with capital letter

  //Componenent 1
  const EnterPhoneComponent = () => {
    return (
      <>
        <div className="login-form">
          <h4>{t("enterPhone")}</h4>
          <input
            type="tel"
            className="login-input"
            placeholder={t("mobilePlaceholder")}
            value={mobileNumber}
            onChange={handleMobileNumberChange}
            disabled={loading}
          />

          {/*  */}
          <input
            type="password"
            className="login-input"
            placeholder={t("passwordPlaceholder")}
            value={password}
            onChange={handlePasswordChange}
            disabled={loading}
          />
          <div className="forgot-password-register">
            <p
              className="forgot-password-link"
              onClick={handleForgotPasswordButtonClick}
            >
              <span>{t("forgotPassword")}</span>
            </p>
            <p
              className="register-link"
              onClick={() => {
                navigate("/register");
              }}
            >
              <span>{t("register")}</span>
            </p>
          </div>
          {/*  */}
          <button
            className="send-otp-button"
            onClick={handleLoginClick}
            disabled={loading}
          >
            {loading ? t("waitButton") : t("loginButton")}{" "}
            <FontAwesomeIcon icon={faUnlock} />
          </button>
        </div>
      </>
    );
  };

  const EnterOTPComponent = () => {
    return (
      <>
        <div className="login-form">
          <h4>{t("enterOTP")}</h4>
          <input
            type="text"
            className="login-input otp-input"
            placeholder={t("otpPlaceholder")}
            value={otp}
            onChange={handleOTPChange}
            disabled={loading}
          />
          {/* {otpError && <p className="error-message">{otpError}</p>} */}
          {/* {otpError && toast(otpError)} */}

          <button
            className="send-otp-button login-button"
            onClick={handleVerifyOtpClick}
            disabled={loading}
          >
            {loading ? t("waitButton") : t("verifyOTPButton")}
          </button>
        </div>
      </>
    );
  };

  const EnterPasswordCreateComponent = () => {
    return (
      <>
        <div className="login-container">
          <div className="login-form">
            <h4>{t("enterPasswordToCreate")}</h4>
            <input
              type="password"
              className="login-input"
              placeholder={t("passwordPlaceholder")}
              value={password}
              onChange={handlePasswordChange}
              disabled={loading}
            />
            <input
              type="password"
              className={`login-input ${
                passwordMatch ? "" : "password-mismatch"
              }`}
              placeholder={t("confirmPasswordPlaceholder")}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              disabled={loading}
            />
            {!passwordMatch && (
              <p className="error-message">{t("PasswordNotMatch")}</p>
            )}
            <button
              className="send-otp-button save-password-button"
              onClick={handleCreatePasswordButton}
              disabled={loading || !passwordMatch}
            >
              {loading ? t("waitButton") : t("saveContinueButton")}
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {/* <div id="recaptcha-container"></div>
            <div className="registration-heading">
                <h1 style={{textDecoration: "underline"}}>Login</h1>
                <h3 style={{color: "#5b564e"}}>Unlock Your Personalized Personality Insights Report
                <p style={{ color: "#1A5D1A" }}>Discover a deeper understanding of yourself, <em> just a step away</em></p></h3>
            </div> */}

      {/* //!Important for OTP */}
      <div id="recaptcha-container"></div>

      <div className="component-slide">
        {componentState === -1 && EnterPhoneComponent()}
        {componentState === 0 && EnterOTPComponent()}
        {componentState === 2 && EnterPasswordCreateComponent()}
      </div>
    </>
  );
};

export default Login;
