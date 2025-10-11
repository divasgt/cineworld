import { PLACEHOLDER_IMAGE_URL } from "@/utils/constants";
import Image from "next/image";

export default function RecommendationCard({ item }) {
  const placeholderWidth = 100;
  const placeholderHeight = 150;
  // The AI doesn't provide an image, so we'll use a placeholder.
  const posterPath = PLACEHOLDER_IMAGE_URL(placeholderWidth, placeholderHeight);

  return (
    <div className="flex gap-4 p-3 rounded-lg bg-gray-600/20 backdrop-blur-xl w-full max-w-2xl">
      <div className="shrink-0">
        <Image
          src={posterPath}
          alt={`Poster for ${item.title}`}
          className="block w-[100px] h-auto aspect-[2/3] object-cover bg-gray-700 rounded-md"
          height={placeholderHeight}
          width={placeholderWidth}
          unoptimized={true}
        />
      </div>
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold" title={item.title}>
          {item.title} {item.release_year && `(${item.release_year})`}
        </h3>
        <p className="text-sm text-gray-400 capitalize">
          {item.type} {item.genres && `• ${item.genres.join(', ')}`}
        </p>
        <p className="mt-2 text-sm text-gray-200">{item.reason}</p>
      </div>
    </div>
  );
}