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
    
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  
  return (
  <header className={`header fixed text-gray-400 font-medium flex top-0 w-screen items-center px-9 py-3.5 justify-between z-1000 ${
    scrolled ? "bg-gray-900/50 backdrop-blur-md border-b border-gray-500/20" : "bg-transparent border-none"
  }`}>

    <div className="header-left shrink-0">
      <nav className="nav-links flex gap-5 items-center shrink-0">
        <Link href="/" className="logo text-red-600 text-2xl tracking-tighter font-bold mr-2 transition">CineWorld</Link>
        <Link href="/#intro-section" className="hover:text-white transition">Home</Link>
        <Link href="/#latest-movies" className="hover:text-white transition">Movies</Link>
        <Link href="/#latest-tv-shows" className="hover:text-white transition">TV Shows</Link>
      </nav>
    </div>

    <HeaderSearchBox />

    <div className="header-right flex items-center gap-5 shrink-0">
      <Link href="/mood-recommend">
        <HeaderButton>Mood Recommend</HeaderButton>
      </Link>

      <Link href="/cinema-ai">
        <HeaderButton className="bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 
  transform hover:scale-105">Ask AI</HeaderButton>
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