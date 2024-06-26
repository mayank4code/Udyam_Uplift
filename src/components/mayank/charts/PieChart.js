import React, { useEffect } from 'react';

import i18n from "i18next";
import { useTranslation } from 'react-i18next';



import {
  PieChart,
  Pie,
  Cell,
  Legend,ResponsiveContainer
} from 'recharts';


// const data = [
//   { name: 'Confirimity',value: 34 , fill:'#FFBA00' },
//   { name: 'Compliance', value: 40 , fill:'#6CA044'},
//   { name: 'Obedience', value: 26 , fill:'#A24F10'}
// ];

function PieChartCom({ responses, onPieData }) {

  const { t } = useTranslation("translation", { keyPrefix: 'result.pie' });

  useEffect(() => {
    let currentLang = localStorage.getItem('lang');
    i18n.changeLanguage(currentLang);

  }, []);



  // Defining Type values 
  var confirimity = 0;
  var compliance = 0;
  var obedience = 0;

  //multiplying the Social Pressure in the option choosen
  const factor = 0.5;

  // Count the number of each option selected by the user with weight
  responses.forEach((option, index) => {
    if (index >= 0 && index <= 12) {
      confirimity += 1 * (2 - ((option - 1) * factor));
    }
    else if (index >= 13 && index <= 21) {
      compliance += 1.44 * (2 - ((option - 1) * factor));
    }
    else if (index >= 22 && index <= 25) {
      obedience += 3.25 * (2 - ((option - 1) * factor));
    }
  });

  // converting Type Values in " % "
  const total = confirimity + compliance + obedience;
  confirimity = Math.round((confirimity / total) * 100);
  compliance = Math.round((compliance / total) * 100);
  obedience = Math.round((obedience / total) * 100);

  // const data = [
  //   { name: t('label1'),value: confirimity , fill:'#FFBA00' },
  //   { name: t('label2'), value: compliance , fill:'#6CA044'},
  //   { name: t('label3'), value: obedience , fill:'#A24F10'}
  // ];

  const data = [
    { name: t('label1'), value: confirimity, fill: '#57674a' },
    { name: t('label2'), value: compliance, fill: '#294826' },
    { name: t('label3'), value: obedience, fill: '#789896' }
  ];

  useEffect(() => {
    // Simulated personality name for demonstration
    var categoryName = '';

    var count_40 = 0;
    if (confirimity >= 40) count_40++;
    if (compliance >= 40) count_40++;
    if (obedience >= 40) count_40++;

    if (count_40 === 1) { //clear winner
      if (confirimity >= 40) categoryName = 'confirmity';
      else if (compliance >= 40) categoryName = 'compliance';
      else if (obedience >= 40) categoryName = 'Obedience';
    }
    else { // unclear winner thus we will find loser
      const min_value = Math.min(confirimity, compliance, obedience);
      if (min_value === obedience) categoryName = 'notObedience';
      else if (min_value === compliance) categoryName = 'notCompliance';
      else if (min_value === confirimity) categoryName = 'notConfirmity';
    }

    // Call the parent's callback function with the personality name
    onPieData(categoryName);
  }, [onPieData]);


  function hexToRgba(hex, alpha) {
    // Remove the '#' character if present
    hex = hex.replace('#', '');
  
    // Parse the hex values for red, green, and blue
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
  
    // Ensure the alpha value is between 0 and 1
    alpha = Math.min(1, Math.max(0, alpha));
  
    // Return the RGBA color
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  


  return (
    <ResponsiveContainer width="100%" height="100%">
    <div  style={{ textAlign: 'center' }}>
  <PieChart width={400} height={570}>
    <Pie
      data={data}
      dataKey="value"
      isAnimationActive={true}
      cx={195} cy={220}
      startAngle={90} endAngle={-270}
      outerRadius={155} innerRadius={65}
      labelLine={false}
      label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.15;
        const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
        const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

        return (
          <text
            x={x} y={y} fill="#fdfbf1"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
            style={{ fontWeight: 'bold', fontSize: 30 }}
          >
            {`${data[index].value}%`}
          </text>
        );
      }}
    >
      {data.map((entry, index) => (
        <Cell
          key={index} fill={entry.fill} 
          style={{
            border: 'none',
            borderColor:'#789896',
            filter: `drop-shadow(0px 0px 8px ${hexToRgba(entry.fill, 1)})`,
          }}
        />
      ))}
    </Pie>
    <Legend
      iconSize={25}
      layout="vertical"
      verticalAlign="bottom"
      // align=""
      wrapperStyle={{ fontSize: 25, fontWeight: 'bold' }}
    />
  </PieChart>
    </div >
    </ResponsiveContainer>
  );
}

export default PieChartCom;





/************ Old Code with Data within the Component ************/

// import React from 'react';
// import { PieChart, Pie, Cell, Legend  } from 'recharts';

// const data = [
//   { name: 'Confirimity',value: 34 , fill:'#FFBA00' },
//   { name: 'Compliance', value: 40 , fill:'#6CA044'},
//   { name: 'Obedience', value: 26 , fill:'#A24F10'},
//   // { name: 'Testing Data', value: 1 , fill:'#FF8042'},
// ];

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// function PieChartCom () {
//   return (
//     <div style={{ textAlign: 'center' }}>
//       <PieChart width={400} height={500}>
//         <Pie className='col'
//           dataKey="value"
//           isAnimationActive={true}
//           data={data}
//           cx={200} cy={200} startAngle={90} endAngle={-270}
//           outerRadius={140} innerRadius={75}
//           fill="#884d8" label
//         >
//            {/* {data.map((entry) => (
//              <Cell key={entry.name} fill={entry.color} />
//            ))} */}
//         </Pie>
//         <Legend
//         iconSize={10}
//         layout="horizontal"
//         verticalAlign="bottom"
//         align="right"
//          />
//       </PieChart>
//     </div>
//   );
// };

// export default PieChartCom ;








// // import React from "react";
// // import { Pie } from "react-chartjs-2";
// // import { Chart as ChartJS } from "chart.js/auto";

// // function PieChart({ chartData }) {
// //   return <Pie data={chartData} />;
// // }

// // export default PieChart;
