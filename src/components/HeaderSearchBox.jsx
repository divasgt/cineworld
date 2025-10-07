'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdSearch } from 'react-icons/md';

export default function HeaderSearchBox() {
  const [query, setQuery] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (query) {
      const timer = setTimeout(() =>{
        router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      }, 200) // 200ms delay
      return () => clearTimeout(timer)
    } else if (query==="") {
      router.push('/search')
    }
  }, [query, router])
  
  return (
  <div className="search-wrapper flex mx-10 w-70 focus-within:w-full transition-all duration-400 items-center relative flex-shrink">
    <span className="search-icon absolute left-4 opacity-80%"> <MdSearch className="size-4.25"/> </span>
    
    <input
      type="text"
      id="header-search"
      placeholder="Search anything..."
      className="bg-[#1f2937] focus:bg-gray-800 py-1.25 px-4 pl-12 pr-10 w-full  text-sm  rounded-lg border-transparent  focus:border-[#9ca3af62] focus:border outline-none placeholder:text-center"
      value={query || ""}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={(e) => e.key==="Enter" ? router.push(`/search?q=${encodeURIComponent(query.trim())}`) : null}
      // onClick={() => router.push('/search')}
    />
  </div>
  )
}
