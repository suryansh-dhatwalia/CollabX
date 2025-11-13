import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { TypewriterEffectSmoothDemo } from "../components/landingPage/TypewriterEffectSmoothDemo";
import { SignupFormDemo } from "../components/form/SignupFormDemo";
import SignUpPage from "../screens/signUpPage";
import LoginPage from "../screens/LoginPage";
import Home from "../screens/Home";
import Project from "../screens/Project";

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TypewriterEffectSmoothDemo />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/projects/:projectId" element={<Project />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
