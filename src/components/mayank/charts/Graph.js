import React, { useEffect } from 'react';

import i18n from "i18next";
import { useTranslation } from 'react-i18next';
import "./graph.css";


import {
  XAxis,
  YAxis,
  // Line,
  Label, LabelList,
  Scatter,
  ScatterChart,
  ReferenceLine,
  ReferenceArea,
  // Rectangle
} from 'recharts';
// import { BsAspectRatio } from 'react-icons/bs';


// Option A : Ideal Normative	
// Option B: Friendly Follower		
// Option C: Information Driven		
// Option D: Individualist Rebellion	


// "label1": "Q1: Information Driven",
// "label2": "Q2: Ideal Normative",
// "label3": "Q3: Friendly Follower",
// "label4": "Q4: Individualist Rebellion",

const Graph = ({ responses, onGraphData }) => {


  useEffect(() => {
    // Simulated personality name for demonstration
    var personalityName = '';
    // console.log("Graph.js: ", maxOption);

    if (maxOption === 1) personalityName = 'Ideal_Normative';
    else if (maxOption === 2) personalityName = 'Friendly_Follower'
    else if (maxOption === 3) personalityName = 'Information_Driven'
    else if (maxOption === 4) personalityName = 'Individualist_Rebellion'

    // Call the parent's callback function with the personality name
    onGraphData(personalityName);
  }, []);


  const { t } = useTranslation("translation", { keyPrefix: 'result.graph' });

  useEffect(() => {
    let currentLang = localStorage.getItem('lang');
    i18n.changeLanguage(currentLang);

  }, []);

  // const data = [
  //   { x: 3.00, y: 7.00, name: t('label1'), fill: '#be8440' },    // option C 
  //   { x: 7.75, y: 9.00, name: t('label2'), fill: '#96b159' },    // option A 
  //   { x: 7.00, y: 3.00, name: t('label3'), fill: '#2369b1' },    // option B
  //   { x: 1.00, y: 1.00, name: t('label4'), fill: '#e52409' },    // option D
  // ];

  const data = [
    { x: 1.20, y: 7.50, name: t('label1'), fill: '#f3f3f3' },    // option C 
    { x: 6.50, y: 7.50, name: t('label2'), fill: '#f3f3f3' },    // option A 
    { x: 6.50, y: 2.50, name: t('label3'), fill: '#030303' },    // option B
    { x: 1.20, y: 2.50, name: t('label4'), fill: '#030303' },    // option D
  ];

  const optionCount = [0, 0, 0, 0]; // Array to store the count of each option
  // console.log(responses);

  // Count the number of each option selected
  responses.forEach((option) => {
    optionCount[option - 1]++;
  });

  // Find the option selected the maximum number of times
  const maxOptionIndex = optionCount.indexOf(Math.max(...optionCount));
  const maxOption = maxOptionIndex + 1;
  // console.log(optionCount);
  // console.log(maxOption);
  // const maxOption = 4;

  return (
    <>
      <ScatterChart width={400} height={570} margin={{ top: 25, right: 10, bottom: 25, left: 5 }}>
        {/* <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" /> */}
        <XAxis className="chart-label" type="number" dataKey="x" domain={[0, 10]} tickCount={6}>
          <Label className="chart-label" value={t('Xaxis_label')} position="bottom" offset={-7} />
        </XAxis>
        <YAxis className="chart-label" type="number" dataKey="y" domain={[0, 10]} tickCount={11}>
          <Label className="chart-label" value={t('Yaxis_label')} angle={-90} position="insideLeft bottom" offset={25} />
        </YAxis>
        {/* //! for Single Quadrant */}
        {/* Creating the rectangles with dotted border */}

        {maxOption === 1 ?
          <ReferenceArea className='rectangle-shadow'// Ideal Normative
            x1={5.2} y1={5.3}
            x2={9.8} y2={9.7}
            stroke="dotted"
            strokeOpacity={1}
            fill="#57674a"
            fillOpacity={1.8}
          /> : <ReferenceArea x1={5.7} y1={7} x2={9.5} y2={8} fill="#57674a" fillOpacity={1} />
        }

        {maxOption === 2 ?
          <ReferenceArea className='rectangle-shadow'//Friendly Follower
            x1={5.2} y1={0.3}
            x2={9.8} y2={4.7}
            stroke="dotted"
            strokeOpacity={0.5}
            fill="#bbc29c"
            fillOpacity={1.8}
          /> : <ReferenceArea x1={5.7} y1={2} x2={9.5} y2={3} fill="#bbc29c" fillOpacity={1} />
        }

        {maxOption === 3 ?
          <ReferenceArea className='rectangle-shadow'//Information Driven
            x1={0.2} y1={5.3}
            x2={4.8} y2={9.7}
            stroke="dotted"
            strokeOpacity={1}
            fill="#294826"
            fillOpacity={10.8}
          /> : <ReferenceArea x1={0.7} y1={7} x2={4.5} y2={8} fill="#294826" fillOpacity={1} />
        }

        {maxOption === 4 ?
          <ReferenceArea className='rectangle-shadow'//Individualist Rebellion
            x1={0.2} y1={0.3}
            x2={4.8} y2={4.7}
            stroke="dotted"
            strokeOpacity={0.5}
            fill="#9fa298"
            fillOpacity={1.8}
          /> : <ReferenceArea x1={0.7} y1={2} x2={4.5} y2={3} fill="#9fa298" fillOpacity={1} />
        }


        <Scatter data={data} fill={data.fill}>
          {data.map((point, index) => (
            <ReferenceLine key={index} x={point.x} y={point.y} stroke="#ccc" strokeDasharray="3 3" />

          ))}
          <LabelList className="chart-label"
            dataKey="name"
            position="right"
          />
        </Scatter>
        <ReferenceLine className="reference-line" y={5} stroke="#abacad" strokeWidth={4} />
        <ReferenceLine className="reference-line" x={5} stroke="#aba" strokeWidth={4} />

      </ScatterChart>
    </>

  );
};

export default Graph;








//! for all the quadrant

// {/* Creating the rectangles with dotted border */ }


// {/* <ReferenceArea
//         x1={0+0.09} y1={5+0.09}
//         x2={5-0.09} y2={10-0.09}
//         stroke="dotted"
//         strokeOpacity={0.7}
//         fill={maxOption === 1 ? "#800080" : "#6b7dab"}
//         fillOpacity={0.3}
//         />
        
//         <ReferenceArea
//         x1={5+0.09} y1={5+0.09}
//         x2={10-0.09} y2={10-0.09}
//         stroke="dotted"
//         strokeOpacity={0.7}
//         fill={maxOption === 2 ? "#800080" : "#6b7dab"}
//         fillOpacity={0.3}
//         />

//         <ReferenceArea
//         x1={5+0.09} y1={0+0.09}
//         x2={10-0.09} y2={5-0.09}
//         stroke="dotted"
//         strokeOpacity={0.7}
//         fill={maxOption === 3 ? "#800080" : "#6b7dab"}
//         fillOpacity={0.3}
//         />

//         <ReferenceArea
//         x1={0+0.09} y1={0+0.09}
//         x2={5-0.09} y2={5-0.09}
//         stroke="dotted"
//         strokeOpacity={0.7}
//         fill={maxOption === 4 ? "#800080" : "#6b7dab"}
//         fillOpacity={0.3}
//         /> */}

