import React, { useEffect, useState } from 'react'
import { server_origin } from '../utilities/constants';
import { useLocation, useNavigate } from 'react-router-dom';
import "../css/quiz.css";
import LoadingBar from 'react-top-loading-bar'
import Progress from '../components/Progress';
import '../css/progress.css';
import image2 from '../images/progressImage2.svg';
import image3 from '../images/progressImage3.svg';
import image4 from '../images/progressImage4.svg';
import image5 from '../images/progressImage5.svg';
import 'react-circular-progressbar/dist/styles.css';
import Confetti from 'react-confetti';
// import useWindowSize from "@rooks/use-window-size";


import { toast, Toaster } from "react-hot-toast";

// IMPORTS for Language Functionlaity
import i18n /*, { changeLanguage }*/ from "i18next";
import { useTranslation } from 'react-i18next';

import { useLanguage } from '../context/LanguageContext';

// PROMPT
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import the CSS





function Quiz() {

  const { t } = useTranslation("translation", { keyPrefix: 'quiz' });
  const { userTestResponses, setUserTestResponses } = useLanguage();
  const location = useLocation(); // Get the current route path
  const [loading, setLoading] = useState(false);


  // when Page Refreshes
  useEffect(() => {
    let currentLang = localStorage.getItem('lang');
    i18n.changeLanguage(currentLang);
    //   console.log(currentLang);
    //! Storing Question Array According to the language in LocalStorage
    const questions1 = t('question', { returnObjects: true });
    setQuestions(questions1);
    // setLoading(false);

    // return ()=>{
    //     console.log("UNMOUNTS");
    //     setShowPrompt(false);
    // }

  }, []);


  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [result, setResult] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  const [progress, setProgress] = useState(0);
  const [progress2, setProgress2] = useState(0);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [clickedOption, setClickedOption] = useState(5);

  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Retrieve the test progress from local storage
    let savedProgress = localStorage.getItem('testProgress');
    savedProgress = JSON.parse(savedProgress);
    if (savedProgress !== null) {
      setShowPrompt(true);
      setResult(savedProgress);
      setCurrentQuestionIndex(savedProgress.length - 1)
      const totalQuestions = 26;
      let progressPercentage = ((savedProgress.length - 1) / totalQuestions) * 100;
      if (savedProgress.length === 26) {
        setProgress(100);
        setProgress2(100);
      }
      else {
        setProgress(progressPercentage);
        setProgress2(progressPercentage);
      }
      // console.log("progressPercentage: ", progressPercentage);
    }
    // console.log("herere: ", savedProgress);


    getQuestions();

    // return ()=>{
    //     console.log("UNMOUNTS");
    //     setShowPrompt(false);
    // }


  }, [])


  // Dummy getQuestions
  const getQuestions = () => {
    //! Storing Question Array According to the language in LocalStorage
    const questions1 = t('question', { returnObjects: true });
    // console.log(questions1);
    setQuestions(questions1);
    // setLoading(false);


    //? tired -- for implementing lanuage change functionality on every question separately
    // const questions123 = [
    //     t('question.question_01' , { returnObjects: true }),
    //     t('question.question_02' , { returnObjects: true }),
    //     t('question.question_03' , { returnObjects: true }),
    //     t('question.question_04' , { returnObjects: true }),
    //     t('question.question_05' , { returnObjects: true }),
    //     t('question.question_06' , { returnObjects: true }),
    //     t('question.question_07' , { returnObjects: true }),
    //     t('question.question_08' , { returnObjects: true }),
    //     t('question.question_09' , { returnObjects: true }),
    //     t('question.question_10' , { returnObjects: true }),
    //     t('question.question_11' , { returnObjects: true }),
    //     t('question.question_12' , { returnObjects: true }),
    //     t('question.question_13' , { returnObjects: true }),
    //     t('question.question_14' , { returnObjects: true }),
    //     t('question.question_15' , { returnObjects: true }),
    //     t('question.question_16' , { returnObjects: true }),
    //     t('question.question_17' , { returnObjects: true }),
    //     t('question.question_18' , { returnObjects: true }),
    //     t('question.question_19' , { returnObjects: true }),
    //     t('question.question_20' , { returnObjects: true }),
    //     t('question.question_21' , { returnObjects: true }),
    //     t('question.question_22' , { returnObjects: true }),
    //     t('question.question_23' , { returnObjects: true }),
    //     t('question.question_24' , { returnObjects: true }),
    //     t('question.question_25' , { returnObjects: true }),
    //     t('question.question_26' , { returnObjects: true })
    // ]
    // console.log(questions123);
    //? tired -- for implementing lanuage change functionality on every question separately

  };




  const nextQuestion = () => {
    // if(currentQuestionIndex!==0 && currentQuestionIndex%5===0){
    // const remainingQuestions = questions.length-currentQuestionIndex-1;
    // const totalNumberOfQuestions = questions.length;
    // const percentageRemaining = (remainingQuestions)/totalNumberOfQuestions*100;
    // toast(`${percentageRemaining}% remaining`);
    // }

    if (clickedOption === 5 && !result[currentQuestionIndex]) {
      toast.error(t('toast.selectAtLeastOneOption'));
      return;
    }
    if (currentQuestionIndex < questions.length - 1) {
      window.scrollTo(0, 0);
      setCurrentQuestionIndex((currentQuestionIndex) => {
        const totalQuestions = questions.length;
        let progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;
        if (currentQuestionIndex === questions.length - 2) progressPercentage = 100;
        setProgress(progressPercentage);
        setProgress2(progressPercentage);
        return currentQuestionIndex + 1;
      });
      setClickedOption(5);
    }


  }

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      window.scrollTo(0, 0);
      setCurrentQuestionIndex((currentQuestionIndex) => {
        const totalQuestions = questions.length;
        const progressPercentage = ((currentQuestionIndex - 1) / totalQuestions) * 100;
        setProgress(progressPercentage);
        setProgress2(progressPercentage);
        return currentQuestionIndex - 1;
      });
      setClickedOption(5);
    }

  }

  const handleChangeOption = (i) => {

    setClickedOption(i + 1);
    updateResult(i + 1);
    if (currentQuestionIndex == questions.length - 1) {
      toast.success(t("toast.testCompleted"))
    }

  }

  const updateResult = (option) => {
    setResult((prevResult) => {
      const updatedResult = [...prevResult];
      updatedResult[currentQuestionIndex] = option;
      // console.log(updatedResult);
      localStorage.setItem('testProgress', JSON.stringify(updatedResult));
      return updatedResult;
    });
  }

  const handleSubmit = async () => {
    if (result.length !== questions.length) {
      toast.error(t('toast.answerAllQuestions'));
      return;
    }

    //*SAVE THE USER RESPONSES IN CONTEXT TO USE THEM AFTER VERIFICATION
    //* check if the user is already logged in, if yes, then save progress now
    //* Update the responses
    if (localStorage.getItem("token")) {
        const userId = process.env.REACT_APP_USER_ID;
        const userPassword = process.env.REACT_APP_USER_PASSWORD;
        const basicAuth = btoa(`${userId}:${userPassword}`);
        setLoading(true);
        try {
            const responseUpdate = await fetch(`${server_origin}/api/user/update-response`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token"),
                "Authorization": `Basic ${basicAuth}`,
              },
              body: JSON.stringify({ responses: result })
            });
            let response2 = await responseUpdate.json();
            setLoading(false);
            if (response2.success === false) {
              localStorage.removeItem("token");
            }
        } catch (error) {
            setLoading(false);
            toast.error("Some error occured. Please try again later");
            console.log(error.message);
        }
    }

    setUserTestResponses(result);
    navigate("/test/submit");

  }


  const handleStartOver = () => {
    // Handle starting over
    // console.log("Start over");
    // navigate("/test/start")
    setCurrentQuestionIndex(0);
    setResult([]);
    setShowPrompt(false);
    setProgress(0);
    setProgress2(100);
    localStorage.removeItem('testProgress');
  };

  const handleContinue = () => {
    // Handle continuing with saved progress
    // console.log("Continue");
    // navigate("/test/start");
    setShowPrompt(false);
  };

  const Prompt = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h2>{t('prompt.headingText1')} <span className="highlighted-text">{t('prompt.headingText2')}</span></h2>
            <p>{t('prompt.headingPara')}</p>
            <div className="button-container">
              <button className="continue-button" onClick={() => { handleContinue(); onClose(); }}>{t('prompt.continue_btn')}</button>
              <button className="start-over-button" onClick={() => { handleStartOver(); onClose(); }}> {t('prompt.start_btn')}</button>
            </div>
          </div>
        );
      }
    });
  };





  const imageArray = [require("../images/1.png"), require("../images/2.png"), require("../images/3.png")
    , require("../images/4.png"), require("../images/5.png"), require("../images/6.png"), require("../images/7.png")
    , require("../images/8.png"), require("../images/9.png"), require("../images/10.png"), require("../images/11.png")
    , require("../images/12.png"), require("../images/13.png"), require("../images/14.png"), require("../images/15.png")
    , require("../images/16.png"), require("../images/17.png"), require("../images/18.png"), require("../images/19.png")
    , require("../images/20.png"), require("../images/21.png"), require("../images/22.png"), require("../images/23.png")
    , require("../images/24.png"), require("../images/25.png"), require("../images/26.png")];

  const showMsg = progress < 26 ? true : false;
  const showMsg2 = (progress > 25 && progress < 50) ? true : false;
  const showMsg3 = (progress == 50) ? true : false;
  const showMsg31 = (progress > 50 && progress < 76) ? true : false;
  const showMsg4 = (progress >= 76 && progress < 100) ? true : false;
  const showMsg5 = (progress === 100) ? true : false;

  return (

    <div className='bodyy'>
      <LoadingBar
        color='#2a6b04'
        progress={progress2}
        height={4}
        shadow={false}
        style={{ position: "absolute", top: "75px" }}
      // onLoaderFinished={() => setProgress(0)}
      />

      {showPrompt && Prompt()}


      {/* {isUserAuthenticated && questions.length !== 0 && !loading ? <> */}
      {questions.length !== 0 ? <>
        <div className="left">
          <div className="question">
            <span id="question-number">{currentQuestionIndex + 1}. </span>
            <span id="question-txt">{questions[currentQuestionIndex]["questionText"]}</span>
          </div>
          <div className="option-container">
            {questions[currentQuestionIndex].options.map((option, i) => {
              return (
                <button
                  className={`option-btn ${clickedOption === i + 1 || result[currentQuestionIndex] === i + 1 ? 'checked' : ''}`}
                  key={(currentQuestionIndex) * 4 + i}
                  onClick={() => { handleChangeOption(i) }}
                >
                  {option}
                </button>
              )
            })}
          </div>
          <div className="buttons">
            {
              currentQuestionIndex === questions.length - 1 ? (
                //submit
                <button className='submit-button' onClick={handleSubmit}>{t('controls.submit')}</button>
              )
                : (
                  //next button
                  <button value="Next" id="next-button" onClick={nextQuestion}> {t('controls.next')}</button>
                )
            }
            <button value="Prev" id="prev-button" onClick={previousQuestion}> {t('controls.previous')} </button>
          </div>
        </div>



        <div className="right my-5">
          <div className="cont">
            <Progress progress={progress} />

          </div>
          {showMsg && (
            <div className="msg">
              <p className="animate-charcter">{t('progressBar.msg1A')}<br></br>{t('progressBar.msg1B')}</p>
              <img src={image2} className="startImage" alt="img6" ></img>
            </div>
          )}

          {showMsg2 && (
            <div className="msg2">
              <p className="animate-charcter">{t('progressBar.msg2A')} <br></br>{t('progressBar.msg2B')}</p>
              <img src={image3} className="startImage" alt="img2"></img>
            </div>
          )}

          {showMsg3 && (
            <div className="msg3" >
              <div className="con">
                <Confetti
                  width={330}
                  height={180}
                  numberOfPieces={100}
                />
              </div>
              <p className="animate-charcter">{t('progressBar.msg3A')}<br></br>{t('progressBar.msg2B')}</p>
              <img src={image4} className="startImage" alt="img1"></img>
            </div>
          )}
          {showMsg31 && (
            <div className="msg3" >
              <div className="con">
                {/* <Confetti
                           width={330}
                           height={180}
                           numberOfPieces={100}
                        /> */}
              </div>
              <p className="animate-charcter">{t('progressBar.msg3A')}<br></br>{t('progressBar.msg2B')}</p>
              <img src={image2} className="startImage" alt="img2"></img>
            </div>
          )}

          {showMsg4 && (
            <div className="msg3">
              <p className="animate-charcter">{t('progressBar.wellcome_75per')}<br></br>{t('progressBar.justFinish')} </p>
              <img src={image3} className="startImage" alt="img3"></img>
            </div>
          )}

          {showMsg5 && (
            <div className="msg4">
              <p className="animate-charcter">{t('progressBar.completed')}</p>
              <img src={image5} className="startImage" alt="img5"></img>
            </div>
          )}

          {/* <div className="box">
                    
                    </div> */}

          <img src={imageArray[currentQuestionIndex]} alt="img" />
        </div>

      </> : <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        {/* <SyncLoader size={30} color="#fb2576" /> */}
      </div>
      }
    </div>
  )
}

export default Quiz