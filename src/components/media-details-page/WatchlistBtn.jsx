"use client";
import { useAuth } from '@/hooks/useAuth';
import { useWatchlist } from '@/hooks/useWatchlist';
import { useState } from 'react';
import { MdBookmarkAdded, MdBookmarkRemove, MdOutlineBookmarkAdd } from 'react-icons/md';

export default function WatchlistBtn({tmdbId, title, type, year, posterPath}) {
  tmdbId = Number(tmdbId)
  const {user} = useAuth()
  const {watchlist, addToWatchlist, removeFromWatchlist, loading} = useWatchlist(user?.id)
  const isInWatchlist = watchlist.some(item => item.tmdb_id===tmdbId)
  const [isButtonHovered, setIsButtonHovered] = useState(false)
  const [hoverTimeout, setHoverTimeout] = useState(null)
  
  const handleClick = async () => {
    if (!user) return
    
    try {
      if (isInWatchlist) await removeFromWatchlist(tmdbId)
      else await addToWatchlist(tmdbId, title, type, year, posterPath)
    } catch(err) {
      if (!isInWatchlist) alert('Failed to add to watchlist')
      else alert('Failed to remove from watchlist')
    }
  }

  const handleMouseEnter = () => {
    if (loading) return;
    if (hoverTimeout) clearTimeout(hoverTimeout); // Clear any existing timeout
    setHoverTimeout(setTimeout(() => setIsButtonHovered(true), 200));
  };

  const handleMouseLeave = () => {
    if (loading) return;
    if (hoverTimeout) clearTimeout(hoverTimeout); // Clear any existing timeout
    setHoverTimeout(setTimeout(() => setIsButtonHovered(false), 200));
  };
  
  return (
  <button
    id="watchlistBtn"
    onClick={handleClick}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    disabled={loading}
    className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-md cursor-pointer bg-gray-600/70 shadow-sm backdrop-blur-xl text-white border-none hover:bg-gray-600 transition-colors"
  >
    {isInWatchlist ?
      isButtonHovered ?
      <>
        <MdBookmarkRemove className="mr-2.5 size-5" />Remove from Watchlist
      </>
      :
      <>
        <MdBookmarkAdded className="mr-2.5 size-5" />Added to Watchlist
      </>
    :
      <>
        <MdOutlineBookmarkAdd className="mr-2.5 size-5" />Add to Watchlist
      </>
    }
  </button>
  )
}
