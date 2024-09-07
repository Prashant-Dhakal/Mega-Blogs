import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {login, logout} from "./store/AuthSlice.js";
import { Outlet } from 'react-router-dom';
import { Header } from './components/Header/Header.jsx';
import Footer from "./components/Footer/Footer.jsx"

const App = () => {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  return (
    <>
      <div className='w-full h-screen bg-[#e5e4d5] font-sans text-center'>
        <Header />
        <Outlet/>
        {/* <Footer /> */}
      </div>
    </>
  )
}

export default App