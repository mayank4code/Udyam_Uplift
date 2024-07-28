import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';
import { SpeedInsights } from "@vercel/speed-insights/react"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
//   <React.StrictMode>
        <SpeedInsights>

                <LanguageProvider>
                        <App />
                </LanguageProvider>

        </SpeedInsights>
        
//   {/* </React.StrictMode> */}
);

