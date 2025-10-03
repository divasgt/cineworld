import Link from "next/link";
import { MdSearch } from 'react-icons/md';
import HeaderButton from "./HeaderButton";

export default function Header() {
  return (
  <header className="header bg-gray-900 text-gray-400 font-medium flex fixed top-0 w-screen items-center px-9 py-3.5 justify-between z-1000">

    <div className="header-left shrink-0">
      <nav className="nav-links flex gap-5 items-center shrink-0">
        <Link href="/" className="logo text-red-600 text-2xl tracking-tighter font-bold mr-2 transition">CineWorld</Link>
        <Link href="/#intro-section" className="hover:text-white transition">Home</Link>
        <Link href="/#latest-movies" className="hover:text-white transition">Movies</Link>
        <Link href="/#latest-tv-shows" className="hover:text-white transition">TV Shows</Link>
      </nav>
    </div>

    <div className="search-wrapper flex mx-10 w-70 focus-within:w-full transition-all duration-400 items-center relative flex-shrink">
      <span className="search-icon absolute left-4 opacity-80%"> <MdSearch className="size-4.25"/> </span>
      <input type="text" id="header-search" placeholder="Search anything..."
        className="bg-[#1f2937] focus:bg-gray-800 py-1.25 px-4 pl-12 pr-10 w-full  text-sm  rounded-lg border-transparent  focus:border-[#9ca3af62] focus:border outline-none placeholder:text-center" />
    </div>

    <div className="header-right flex items-center gap-5 shrink-0">
      <Link href="/mood-recommend">
        <HeaderButton>Mood Recommend</HeaderButton>
      </Link>

      <Link href="/cinema-ai">
        <HeaderButton className="bg-blue-600 hover:bg-blue-500">Ask AI</HeaderButton>
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