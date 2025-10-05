'use client';
import { useRouter } from "next/navigation";
import { IMAGE_BASE_URL, PLACEHOLDER_IMAGE_URL } from "@/utils/constants";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function MediaCard({item, isMovie, layoutType}) {
  const router = useRouter();
  
  const title = isMovie ? item.title : item.name;
  const releaseDate = isMovie ? item.release_date : item.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
  const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';

  // Use placeholder size based on approximate card size
  const placeholderWidth = layoutType === 'horizontal' ? 130 : 140;
  const placeholderHeight = placeholderWidth * 1.5; // Maintain 2:3 ratio
  const posterPath = item.poster_path ? `${IMAGE_BASE_URL}w342${item.poster_path}` : PLACEHOLDER_IMAGE_URL(placeholderWidth, placeholderHeight);


  function handleCardClick() {
    console.log(`Clicked on ${isMovie ? 'Movie' : 'TV Show'} ID: ${item.id}`);
    router.push(`/${isMovie ? 'movie' : 'tv'}/${item.id}`);
  }

  return (
  <div className={twMerge(
      'bg-gray-800 rounded-lg overflow-hidden shadow-md transition-transform duration-300 ease-in-out cursor-pointer hover:scale-105',
      layoutType === 'horizontal' && 'shrink-0 w-[200px]'
    )}
    onClick={handleCardClick}
  >
    <Image
      src={posterPath}
      alt={title}
      className="block w-full h-auto aspect-[2/3] object-cover bg-gray-700"
      height={342}
      width={342}
      unoptimized={!item.poster_path}
      // onError={this.src=PLACEHOLDER_IMAGE_URL(placeholderWidth, placeholderHeight)}
    />
    <div className="p-3">
      <h3 className="font-semibold text-sm overflow-hidden text-ellipsis whitespace-nowrap" title={title}>{title}</h3>
      <div className="mt-[10px] flex gap-[10px]">
        <div className="text-xs">{year}</div>
        <div className="flex items-center text-xs">
            <span className="text-yellow-400 mr-1">★</span>
            <span>{rating !== 'N/A' ? rating : 'No Rating'}</span>
        </div>
      </div>
    </div>
  </div>
  )
}
