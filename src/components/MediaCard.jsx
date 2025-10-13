import { IMAGE_BASE_URL, PLACEHOLDER_IMAGE_URL } from "@/utils/constants";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

export default function MediaCard({item, isMovie, layoutType, showInfo=false}) {
  const title = isMovie ? item.title : item.name;
  const releaseDate = isMovie ? item.release_date : item.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
  const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';

  // Use placeholder size based on approximate card size
  const placeholderWidth = layoutType === 'horizontal' ? 130 : 140;
  const placeholderHeight = placeholderWidth * 1.5; // Maintain 2:3 ratio
  const posterPath = item.poster_path ? `${IMAGE_BASE_URL}w342${item.poster_path}` : PLACEHOLDER_IMAGE_URL(placeholderWidth, placeholderHeight);

  const linkPath = `/${isMovie ? 'movie' : 'tv'}/${item.id}`;

  return (
  <Link
    href={linkPath}
    className={twMerge(
      'rounded-lg overflow-hidden bg-gray-600/20 transition-transform duration-300 ease-in-out cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-black/40 backdrop-blur-xl shadow relative group',
      layoutType === 'horizontal' && 'shrink-0 w-[200px]'
    )}
  >
    <Image
      src={posterPath}
      alt={title || ""}
      className="block w-full h-auto aspect-[2/3] object-cover bg-gray-700"
      height={342}
      width={342}
      unoptimized={!item.poster_path}
    />

    <div className={`px-3 py-2.5 ${!showInfo && "bg-gray-800/40 text-shadow-sm backdrop-blur-3xl invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 absolute z-10 -bottom-0.25 -left-0.25 -right-0.25"}`}>
      <h3 className="text-md overflow-hidden line-clamp-2" title={title}>{title}</h3>

      <div className="mt-2 mb-0.25 flex gap-3 text-gray-300 font-medium text-sm">
        <div className="text-xs">{year}</div>
        <div className="flex items-center gap-1 text-xs">
          <span className="text-yellow-400 text-lg leading-4 -mt-0.5">★</span>
          <span className="font-">{rating !== 'N/A' ? rating : 'No Rating'}</span>
        </div>
      </div>
    </div>
  </Link>
  )
}
