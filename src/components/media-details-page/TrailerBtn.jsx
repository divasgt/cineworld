import { MdPlayArrow } from 'react-icons/md';

export default function TrailerBtn() {
  return (
  <button id="playTrailer" className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-md cursor-pointer bg-red-700 shadow-sm backdrop-blur-xl text-white border-none hover:bg-red-600 transition-colors">
    <MdPlayArrow className="mr-2 size-6 mb-0.25" /> Play Trailer</button>
  )
}