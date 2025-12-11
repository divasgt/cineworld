"use client"
import { IMAGE_BASE_URL, PLACEHOLDER_IMAGE_URL } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MdStar } from "react-icons/md";

// Modified to Handle when item object is passed, or (for watchlist items) when instead tmdbId, title, releaseYear, posterPath are passed.
export default function MediaCard({
  item=null,
  isMovie,
  layoutType="grid",
  showInfo=false,
  tmdbId=null,
  mediaTitle=null,
  releaseYear=null,
  posterPath=null,
  showWatchlistBtn=false
}) {
  const [isHovering, setIsHovering] = useState(false)
  const [isTrailerShown, setIsTrailerShown] = useState(false)
  const [alignment, setAlignment] = useState("center")
  const [trailerKey, setTrailerKey] = useState(null)
  
  const timerRef = useRef(null)
  const containerRef = useRef(null)
  const isHoveringRef = useRef(false) // ref to track hovering state inside async function (refs are instant, state setter function is not instant)

  const title = mediaTitle || (isMovie ? item.title : item.name);
  let year;
  if (!releaseYear) {
    const releaseDate = isMovie ? item.release_date : item.first_air_date;
    year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
  } else {
    year = releaseYear
  }

  let rating;
  if (item) {
    rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';
  } else {
    rating = null;
  }

  // Use placeholder size based on approximate card size
  const placeholderWidth = layoutType === 'horizontal' ? 130 : 140;
  const placeholderHeight = placeholderWidth * 1.5; // Maintain 2:3 ratio
  const posterPathUsed = posterPath || (item && item.poster_path)
    ? `${IMAGE_BASE_URL}w342${posterPath || item.poster_path}`
    : PLACEHOLDER_IMAGE_URL(placeholderWidth, placeholderHeight);
  
  const linkPath = `/${isMovie ? 'movie' : 'tv'}/${tmdbId || item.id}`;

  // clear timeout on component unmount
  useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  async function fetchTrailer() {
    const type = isMovie ? "movie" : "tv"
    const id = tmdbId || item.id

    try {
      const response = await fetch(`/api/${type}/${id}?append_to_response=videos`)
      if (!response.ok) return null
      const data = await response.json()
      const trailer = data.videos.results.find(v => v.type==='Trailer' && v.site==='YouTube')

      if (trailer) {
        setTrailerKey(trailer.key)
        return trailer.key
      }
    } catch(err) {
      console.error("Failed to fetch trailer on hover:", err)
    }
    setTrailerKey("unavailable")
    return null
  }
  
  function handleMouseEnter() {
    setIsHovering(true)
    isHoveringRef.current = true

    // calculate anignment on mouse enter
    const rect = containerRef.current.getBoundingClientRect()
    const viewportWidth = window.innerWidth

    // how much card will overflow out when its on left or right when expanded
    // expansion is (16/9 / 2/3)
    // expanded width = 2.66 * rect.width 
    // overhang = (expanded width - w)/2 = (2.66w - w)/2 = 0.83 * w 
    const overhang = 0.83 * rect.width

    // try doing overhang + abt 20 or 50 (px)
    if (rect.left < overhang + 30) {
      setAlignment("left") // when too close to left edge
    } else if (viewportWidth - rect.right < overhang ) {
      setAlignment("right") // when too close to right edge
    } else {
      setAlignment("center")
    }

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(async () => {
      if (!isHoveringRef.current) return
  
      let currentKey
      if (!trailerKey || trailerKey !== "unavailable") {
        currentKey = await fetchTrailer()
      }
      
      if (isHoveringRef.current && currentKey) {
        setIsTrailerShown(true)
      }
    }, 1000)
  }

  function handleMouseLeave() {
    setIsHovering(false)
    isHoveringRef.current = false

    if (timerRef.current) clearTimeout(timerRef.current)
    setIsTrailerShown(false)
  }

  // Get tailwind css classes for positioning based on calculated state
  const getPositionClasses = () => {
    if (alignment === "left") {
      return "left-0 origin-left";
    } else if (alignment === "right") {
      return "right-0 origin-right";
    } else {
      // For center, we only want the transform when expanded, 
      // but we need left-1/2 to anchor it to the middle.
      // To keep it simple in idle state, left-0 is fine, but for expansion:
      return isTrailerShown 
        ? "left-1/2 -translate-x-1/2 origin-center" 
        : "left-0 origin-center"; 
    }
  }
  
  return (
  // Outer container - maintains 2/3 size in grid
  <Link href={linkPath}>
  <div
    ref={containerRef}
    className={`relative aspect-2/3 hover:z-50`}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >
    {/* Animated container - which expands */}
    <div
      className={`
        absolute top-0 block h-full rounded-lg bg-gray-800 transition-all duration-300 ease-in-out shadow-md hover:scale-115 hover:shadow-md hover:shadow-black/40 group
        ${getPositionClasses()}
        ${isTrailerShown
          ? `w-[266.66%]`
          : `w-full`
        }
      `}
    >
      {/* Content container for image and trailer iframe */}
      <div className={`relative w-full h-full overflow-hidden ${isHovering ? "rounded-t-lg" : "rounded-lg"}`}>
        {isHovering &&
          <div className={`w-full h-full bg-black relative ${isTrailerShown ? "block" : "hidden"}`}>
            <iframe
              className='absolute -translate-y-[25%] w-full h-[200%] pointer-events-none'
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1`}
              title="Trailer"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        }

        {/* <Link href={linkPath} className="block w-full h-full"> */}
        <Image
          src={posterPathUsed}
          alt={title || ""}
          className="block w-full h-auto aspect-2/3 object-cover bg-gray-700"
          height={342}
          width={342}
          unoptimized={!(posterPath || (item && item.poster_path))}
        />
        {/* </Link> */}
      </div>

      {isHovering && 
        <div
          className={`px-3 py-2.5 top-full absolute left-0 right-0 transition-opacity duration-200 bg-neutral-950 rounded-b-lg shadow shadow-black/80`}
        >
          <h3 className={`font-bold overflow-hidden line-clamp-2 ${isTrailerShown && "text-lg"}`} title={title}>{title}</h3>

          <div className="mt-2 mb-px flex items-center gap-3 text-gray-400 font-medium">
            <div className="text-xs">{year}</div>
            {rating &&
              <div className="flex items-center gap-1 text-xs">
                <MdStar className="text-amber-400 size-3 mb-0.5" />
                <span className="font-">{rating !== 'N/A' ? rating : 'No Rating'}</span>
              </div>
            }
          </div>

          {isTrailerShown && <p className="text-gray-200 text-sm mt-2 line-clamp-3 text-ellipsis">{item?.overview}</p>}
        </div>
      }
    </div>
  </div>
  </Link>
  )
}
