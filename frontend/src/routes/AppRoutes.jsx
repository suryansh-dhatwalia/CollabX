import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { TypewriterEffectSmoothDemo } from "../components/home/TypewriterEffectSmoothDemo";
import { SignupFormDemo } from "../components/form/SignupFormDemo";
import SignUpPage from "../screens/signUpPage";
import LoginPage from "../screens/LoginPage";

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TypewriterEffectSmoothDemo />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
