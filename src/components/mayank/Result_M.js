// import { useState } from "react";
import React, { useEffect, useState, useRef } from "react";
import { server_origin } from "../../utilities/constants";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

// import { FiDownload, FiBarChart2 } from "react-icons/fi"; // Import the FiDownload and FiBarChart2 icons from react-icons
import { toast } from "react-hot-toast";
import { SyncLoader } from "react-spinners"; // Import the ClipLoader from "react-spinners"
// import { motion } from "framer-motion";
import Graph from "./charts/Graph";
import PieChart from "./charts/PieChart";
import RadialBarChartComponent from "./charts/RadialBarChart";
// import { Footer } from "../neha/Footer";
import "./result.css";
import logo2 from "../../images/logo1.png";
import t1 from "../../images/t1.png";

//for Pdf downloadind Functionality
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// import { UserData } from "./Data";

//IMPORTS FOR Language change Functionality
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import "../../library/i18n";

function Result_M() {
    //? Language Functionality Starts ......................................................................

    const { t } = useTranslation("translation", { keyPrefix: "result" });

    //used to get language Stored in LocalStorage //*should be in every Page having Language Functionality
    useEffect(() => {
        let currentLang = localStorage.getItem("lang");
        i18n.changeLanguage(currentLang);

        // console.log(t('array'  , { returnObjects: true }));
    }, []);

    //? Language Functionality Ends .................................................................

    //?  text Content Start ...............................................

    const [personalityName, setPersonalityName] = useState("");
    // Function to receive personalityName from the child component (Graph)
    const handleGraphData = (name) => {
        setPersonalityName(name);
    };

    const [categoryName, setCategoryName] = useState("");
    // Function to receive personalityName from the child component (Graph)
    const handlePieData = (name) => {
        setCategoryName(name);
    };

    const [affectingFacttors, setAffectingFacttors] = useState({});
    // Function to receive personalityName from the child component (Graph)
    const handleRadialData = (data) => {
        setAffectingFacttors(data);
    };

    // *"graph": {"text_content": { personalityName:{ Description and Qualities}............
    const graph_uri = "graph.text_content." + personalityName;

    const pie_uri = "pie.text_content." + categoryName;

    const radial_uri = "radialBar.text_content";

    // console.log(pie_uri);

    //t(pie_uri ) -> only one paragraph

    //* text guideline for designer --
    // graph --> 1 . content == t(graph_uri + '.description')  ***its just a String
    // console.log(t(graph_uri + '.description'));
    //           2.  quailties == t(graph_uri + '.qualities')  ***use .map because  its an array with exactly five Qualities in it
    const qualities_arr = t(graph_uri + ".qualities", { returnObjects: true });
    // console.log(qualities_arr);

    //?  text Content ends here  ..................................................................

  // REACT TO PDF
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `your-name-udyam-uplift`,
  });
  

  const [responses, setResponses] = useState([]);
  const [testDate, setTestDate] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const navigate = useNavigate();

    useEffect(() => {
        getResult();
    }, []);

    //!Make separate functions for fetching results and validation

    const getResult = async () => {
        // setLoading(true);
        const userId = process.env.REACT_APP_USER_ID;
        const userPassword = process.env.REACT_APP_USER_PASSWORD;
        const basicAuth = btoa(`${userId}:${userPassword}`);
        try {
            const response = await fetch(`${server_origin}/api/user/get-user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                    "Authorization": `Basic ${basicAuth}`,
                },
            });
            let response1 = await response.json();
            // console.log("response1asdfasdfasd: ", response1);
    
            if (response1.success === false) {
                toast.error(t("toast.errorFetchResult"));
                navigate("/login");
                return;
            }
            // console.log("asdflkjasldkfjaskldfjl", response1.userDoc);
            if (
                !response1.userDoc.testResponse ||
                response1.userDoc.testResponse.length !== 26
            ) {
                toast.error(t("toast.inCompleteTest"));
                navigate("/test/instructions");
                return;
            }
            setResponses(response1.userDoc.testResponse);
            setTestDate(formatDateWithCustomTime(response1.userDoc.lastTestDate));
            setUserName(response1.userDoc.name);
            // console.log(formatDateWithCustomTime(response1.userDoc.lastTestDate));
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error("Some error occured. Please try again later");
            // console.log(error.message);
        }
    };

  //* Download Functionallity Start*//
  const handleDownloadClick = async () => {
    setDownloading(true);
    // Create a new jsPDF instance
    const customWidth = 500; // Replace with your desired width in millimeters

    // Determine the height based on the device's screen size
    const isMobile = window.innerWidth < 768; // You can adjust this breakpoint as needed
    const customHeight = isMobile ? 6000 : 1200; // Set different heights for mobile and desktop

    const pdf = new jsPDF('p', 'mm', [customWidth, customHeight], true);

    // Get all the elements you want to include in the PDF
    const elementsToCapture = document.querySelectorAll('.element-to-capture');
    // console.log('Number of elements to capture:', elementsToCapture.length);

    // Loop through each element and add it as a new page in the PDF
    for (const element of elementsToCapture) {
        // console.log('Capturing element:', element);
        // Capture the content of the element as an image using html2canvas
        const canvas = await html2canvas(element, {scale: 1.5});
        const imgData = canvas.toDataURL('image/jpeg', 0.7);

        // Add the image to the PDF
        pdf.addImage(imgData, 'JPEG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), '', 'FAST');

        // Add a new page for the next element
        if (element !== elementsToCapture[elementsToCapture.length - 1]) {
            pdf.addPage();
        }
    }
    // Save the PDF with a specific filename
    pdf.save('Result.pdf');
    setDownloading(false);
};
  
  //* Download Functionallity Ends *//

    //*Current Date and Time *//
    function getDaySuffix(day) {
        if (day >= 11 && day <= 13) {
            return "th";
        }
        switch (day % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    }

    function formatDateWithCustomTime(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();
        const hour = date.getHours();
        const minute = String(date.getMinutes()).padStart(2, "0");
        const amPm = hour >= 12 ? "PM" : "AM";
        const formattedTime = `${hour % 12 || 12}:${minute} ${amPm}`;

        return `${day}${getDaySuffix(day)} ${t('main.month.'+month)} ${year}, ${formattedTime}`;
    }

  return (
    <>
      {responses.length !== 0 && !loading ? (
        <div className="result-page element-to-capture">
          <div className="half">
            <div className="dark-top dark">
              <div className="flex-item">
                <img src={logo2} className="img-top" alt="logo"></img>
              </div>
              <div className="flex-item">
                <p className="congratulations">{t("main.congratulations")}</p>
                <div className="flex">
                  <div>
                    <p className="congo-text">
                      {" "}
                      {userName} , {t("main.congo_text1")}
                      {t("main.congo_text2")}
                    </p>
                  </div>
                  <div className="pdf-controls">

                    <button
                      className="down-btn"
                      onClick={handleDownloadClick}
                      disabled={downloading}
                    >
                      {downloading ? t("toast.pleaseWait") : t("main.download")}
                    </button>
                   
                  </div>
                </div>
              </div>
            </div>

                        <div className="light">
                            <p className="para-top">
                                {t("main.text1")} <strong>{testDate}</strong> {t("main.text2")}
                            </p>
                            <h2 className="you-are" style={{ textAlign: "center" }}>
                                {t("main.person_text1")}{" "}
                                <span className="head4">{t(graph_uri + ".name")}</span>{" "}
                                {t("main.person_text2")}{" "}
                            </h2>

                            <div className="quad-graph">
                                <Graph responses={responses} onGraphData={handleGraphData} />
                            </div>
                        </div>


            
            <p className="text1">{t(graph_uri + ".description")}</p>
            
            <div className="light">
              <h2 className="margin" style={{ textAlign: "center" }}>
                <span className="your-qualities">
                  {t("main.yourQualities")}{" "}
                </span>
              </h2>

                            {/* TRY 1 */}
                            <div className="unique-quality-container">
                                <div className="unique-star-row">
                                    <div className="unique-star">
                                        <img src={t1} className="unique-my-star" alt={`Star for ${qualities_arr[0]}`} />
                                        <h4 className="unique-quality-text">{qualities_arr[0]}</h4>
                                    </div>
                                    <div className="unique-star">
                                        <img src={t1} className="unique-my-star" alt={`Star for ${qualities_arr[1]}`} />
                                        <h4 className="unique-quality-text">{qualities_arr[1]}</h4>
                                    </div>
                                    <div className="unique-star">
                                        <img src={t1} className="unique-my-star" alt={`Star for ${qualities_arr[2]}`} />
                                        <h4 className="unique-quality-text">{qualities_arr[2]}</h4>
                                    </div>
                                </div>
                                <div className="unique-star-row unique-star-row-2" >
                                    <div className="unique-star">
                                        <img src={t1} className="unique-my-star" alt={`Star for ${qualities_arr[3]}`} />
                                        <h4 className="unique-quality-text">{qualities_arr[3]}</h4>
                                    </div>
                                    <div className="unique-star">
                                        <img src={t1} className="unique-my-star" alt={`Star for ${qualities_arr[4]}`} />
                                        <h4 className="unique-quality-text">{qualities_arr[4]}</h4>
                                    </div>
                                </div>
                            </div>


                            <div style={{ marginTop: "10rem" }}>
                                <h2 className="margin" style={{ textAlign: "center" }}>
                                    <span className="social-influence">{t("pie.sub_heading")}</span>
                                </h2>
                                <div className="pie-container">
                                    <div className="chart">
                                        <PieChart responses={responses} onPieData={handlePieData} />
                                    </div>
                                    <div className="pie-text">
                                        <p className="">{t(pie_uri)}</p>
                                    </div>
                                </div>
                            </div>

                            <h2
                                className="margin"
                                style={{ textAlign: "center", marginTop: "60px" }}
                            >
                                <span className="influence">{t("radialBar.sub_heading")}</span>
                            </h2>
                            <div className="radialBar">
                                <RadialBarChartComponent
                                    responses={responses}
                                    onRadialData={handleRadialData}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="half-2">
                        <div className="inner-4">
                            <div className="inner-star">
                                <img src={t1} className="star" alt="star"></img>
                                <p style={{ fontSize: "18px" }}> {t("radialBar.label1")} </p>
                            </div>
                            <p className="p1" style={{ fontSize: "16px" }}>
                                {t(
                                    radial_uri +
                                    ".group_size_or_unanimity?." +
                                    affectingFacttors[0]
                                )}
                            </p>

                            <div className="inner-star">
                                <img src={t1} className="star" alt="star"></img>
                                <p style={{ fontSize: "18px" }}> {t("radialBar.label2")}</p>
                            </div>
                            <p className="p1" style={{ fontSize: "16px" }}>
                                {t(
                                    radial_uri +
                                    ".cohesion_or_status_of_others?." +
                                    affectingFacttors[1]
                                )}
                            </p>

                            <div className="inner-star">
                                <img src={t1} className="star" alt="star"></img>
                                <p style={{ fontSize: "18px" }}> {t("radialBar.label3")}</p>
                            </div>
                            <p className="p1" style={{ fontSize: "16px" }}>
                                {t(radial_uri + ".Reciprocity?." + affectingFacttors[2])}
                            </p>

                            <div className="inner-star">
                                <img src={t1} className="star" alt="star"></img>
                                <p style={{ fontSize: "18px" }}> {t("radialBar.label4")}</p>
                            </div>
                            <p className="p1" style={{ fontSize: "16px" }}>
                                {t(
                                    radial_uri +
                                    ".Commitment_and_Consistency?." +
                                    affectingFacttors[3]
                                )}
                            </p>

                            <div className="inner-star">
                                <img src={t1} className="star" alt="star"></img>
                                <p style={{ fontSize: "18px" }}> {t("radialBar.label5")}</p>
                            </div>
                            <p className="p1" style={{ fontSize: "16px" }}>
                                {t(radial_uri + ".Scarcity?." + affectingFacttors[4])}
                            </p>

                            <div className="inner-star">
                                <img src={t1} className="star" alt="star"></img>
                                <p style={{ fontSize: "18px" }}> {t("radialBar.label6")}</p>
                            </div>
                            <p className="p1" style={{ fontSize: "16px" }}>
                                {t(
                                    radial_uri + ".Authority/_commands?." + affectingFacttors[5]
                                )}
                            </p>

                            <div className="endbtn">
                                <button
                                    className="rounded-btn"
                                    onClick={handleDownloadClick}
                                    disabled={downloading}
                                >
                                    {downloading ? t("toast.pleaseWait") : t("main.download")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "100vh",
                    }}
                >
                    <SyncLoader size={30} color="#3e950c" />
                </div>
            )}
        </>
    );
}

export default Result_M;
