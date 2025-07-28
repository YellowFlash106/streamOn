import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router'

import HomePage from "./pages/HomePage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import CallPage from "./pages/CallPage.jsx"
import OnBoardingPage from "./pages/OnBoardingPage.jsx"
import NotificationsPage from "./pages/NotificationsPage.jsx"
import ChatPage from './pages/ChatPage.jsx'

import { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from './lib/axios.js'


const App = () => {

  const {data:authData ,isLoading, error } = useQuery({ queryKey: ["authUser"],
    queryFn : async () =>{
      const res = await axiosInstance.get("/auth/me");
      return res;
    },
  });

  const authUser = authData?.user;

  return (
    <div className=' h-screen' data-theme="night">
      <Routes>
      <Route path="/" element={ authUser ? <HomePage/> : <Navigate to="/login" /> } />
      <Route path="/signup" element={!authUser ? <SignUpPage/>  : <Navigate to="/" /> } />
      <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/" /> } />
      <Route path="/call" element={authUser ? <CallPage/> : <Navigate to="/login" /> } />
      <Route path="/Chat" element={ authUser ? <ChatPage/> : <Navigate to="/login" /> } />
      <Route path="/onboarding" element={ authUser ? <OnBoardingPage/> : <Navigate to="/login" /> } />
      <Route path="/notifications" element={ authUser ? <NotificationsPage/> : <Navigate to="/login" /> } />
      
      </Routes>

      <Toaster/>

    </div>
  )
}

export default App 