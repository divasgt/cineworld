"use client";
import Link from "next/link";
import HeaderButton from "./HeaderButton";
import HeaderSearchBox from "./HeaderSearchBox";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      // check if scroll vertical position > 40px
      setScrolled(window.scrollY > 40)
    }
    
    // call function once, used for when page is loaded scrolled down.
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  
  return (
  <header className={`header fixed text-gray-400 font-medium flex justify-between top-0 w-screen items-center px-9 py-2.5 z-1000 ${
    scrolled ? "bg-gray-900/70 backdrop-blur-xl border-b border-gray-500/10" : "bg-transparent border-none"
  }`}>

    <div className="header-left shrink-0">
      <nav className="nav-links flex gap-5 items-center shrink-0 mr-8">
        <Link href="/" className="logo text-2xl tracking-tighter font-bold mr-2 bg-gradient-to-r from-red-500 to-orange-800 bg-clip-text text-transparent">CineWorld</Link>
        <Link href="/#intro-section" className="hover:text-white transition">Home</Link>
        <Link href="/#latestMovies" className="hover:text-white transition">Movies</Link>
        <Link href="/#latestTVShows" className="hover:text-white transition">TV Shows</Link>
      </nav>
    </div>


    <div className="header-right flex items-center gap-5 flex-grow justify-end *:text-nowrap">
      <HeaderSearchBox />
      {/* <Link href="/mood-recommend">
        <HeaderButton className="bg-gradient-to-r from-orange-700 to-red-800 transition-all duration-200 transform hover:scale-105">Mood Recommend</HeaderButton>
      </Link> */}

      <Link href="/cinema-ai">
        <HeaderButton className="bg-gradient-to-r from-orange-700 to-red-800 transition-all duration-200 transform hover:scale-105">Cinema AI</HeaderButton>
      </Link>

      <Link href="/watchlist">
        <HeaderButton className="bg-gray-700 hover:bg-gray-600"> Watchlist</HeaderButton>
      </Link>

      <div className="profile-icon flex relative text-white font-light" id="profileIcon">
        <button className="profile-button cursor-pointer size-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center">
          <span className="initial">M</span>
        </button>

        {/* <div className="profile-dropdown absolute top-full right-0 mt-2 bg-gray-700 rounded-md shadow-[0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)] overflow-hidden w-30  flex flex-col justify-center z-50 hidden" id="profileDropdown">
          <Link id="profile-Link" href="#" className="block py-1.5 px-4 text-sm hover:bg-gray-600">Profile</Link>
          <Link href="#" className="block py-1.5 px-4 text-sm hover:bg-gray-600">Settings</Link>
          <Link href="#" className="block py-1.5 px-4 text-sm hover:bg-gray-600">Logout</Link>
        </div> */}
      </div>
    </div>

  </header>
  )  
}