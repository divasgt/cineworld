'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdSearch } from 'react-icons/md';

export default function HeaderSearchBox() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || null)
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
  <div className="search-wrapper flex focus-within:w-full transition-all duration-400 items-center relative flex-grow max-w-56 focus-within:max-w-full">
    <span className="search-icon absolute left-4 opacity-80% cursor-pointer"> <MdSearch className="size-4.25"/> </span>
    
    <input
      type="text"
      id="header-search"
      placeholder="Search anything..."
      className="bg-gray-700/30 focus:bg-gray-800/70 py-1.25 px-4 pl-12 pr-10 w-full  text-sm  rounded-md border border-gray-500/10 focus:border-gray-400/20 focus:border outline-none"
      value={query || ""}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={(e) => e.key==="Enter" ? router.push(`/search?q=${encodeURIComponent(query.trim())}`) : null}
      // onClick={() => router.push('/search')}
    />
  </div>
  )
}
