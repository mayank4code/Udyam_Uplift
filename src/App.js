import React from 'react';
import './App.css'
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from "../src/components/neha/Home";
import Login from './components/Login';
import Register from './components/Register';
import Result from './components/mayank/Result_M';
import Congrats from './components/Congrats.js';
import About from './components/About.js';

import Instructions from './components/Instructions';
import Quiz from './components/Quiz';
import Footer from "./components/neha/Footer.js"
import PrivacyPolicy from "./components/PrivacyPolicy.js";
import Disclaimer from './components/Disclaimer';

import Analytics from "./components/Admin/Analytics";
import AdminQuestions from "./components/Admin/AdminQuestions";
import AdminUsers from "./components/Admin/AdminUsers";


function App() {

  return (
    <Router>
      <div>
        <Navbar />
        {/* <Navbar2 /> */}
        <Toaster toastOptions={{ duration: 4000 }} />
        <Routes>
        {/* User */}
          <Route path="/" element={<Home />} />
          <Route path="/test/instructions" element={<><Instructions/> <Footer/></>} />
          <Route path="/test/start" element={<Quiz/>} />
          <Route path="/register" element={<><Register/> <Footer/> </>} />
          <Route path="/login" element={<><Login/> <Footer/> </>} />
          <Route path="/test/result" element={<><Result/> <Footer/></>} />
          <Route path="/test/submit" element={<><Congrats/> <Footer/></>} />
          <Route path="/about" element={<> <About/> <Footer/></>} />
          <Route path="/privacy-policy" element={<><PrivacyPolicy/> <Footer/></>} />
          <Route path="/disclaimer" element={<><Disclaimer/> <Footer/></>} />

        
          {/* Admin */}
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/questions" element={<AdminQuestions />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
