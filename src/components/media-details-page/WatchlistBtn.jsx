import { MdOutlineBookmarkBorder } from 'react-icons/md';

export default function WatchlistBtn() {
  return (
  <button id="watchlistBtn" className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-md cursor-pointer bg-gray-600/70 shadow-sm backdrop-blur-xl text-white border-none hover:bg-gray-600 transition-colors">
    <MdOutlineBookmarkBorder className="mr-2.5 size-5" />Add to Watchlist</button>
  )
}
