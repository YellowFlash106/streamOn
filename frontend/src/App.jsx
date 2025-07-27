import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'

import HomePage from "./pages/HomePage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import CallPage from "./pages/CallPage.jsx"
import OnBoardingPage from "./pages/OnBoardingPage.jsx"
import NotificationsPage from "./pages/NotificationsPage.jsx"
import ChatPage from './pages/ChatPage.jsx'

import { Toaster } from 'react-hot-toast'


const App = () => {


  return (
    <div className=' h-screen' data-theme="night">
      <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/signup" element={<SignUpPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/call" element={<CallPage/>} />
      <Route path="/Chat" element={<ChatPage/>} />
      <Route path="/onboarding" element={<OnBoardingPage/>} />
      <Route path="/notifications" element={<NotificationsPage/>} />
      
      </Routes>

      <Toaster/>

    </div>
  )
}

export default App 