import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Course from "./components/Course";
import Advertisement from "./components/Advertisement";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Quiz from "./components/Quiz";
import Register from "./components/Register";
import Login from "./components/Login";
import Privent from "./components/Privent"



function App() {
  return (
    <AuthProvider>  
<BrowserRouter>
    <Routes>
      
      <Route path="/" element={
          <div>
            <Navigation />
            <Hero />
            <Course />
            <Advertisement />
            <Services />
            <About />
            <Contact />
            <Footer />
          </div>
        }
      />

     
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="quiz" element={<Privent element={<Quiz />} />}/>
      <Route path="Register" element={<Privent element={<Register />} />}/>
      {/* <Route path="Register" element={<ProtectedRoute element={<Register />} />} /> */}
    </Routes>
  </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
