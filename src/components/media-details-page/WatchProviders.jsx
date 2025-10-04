"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import { IMAGE_BASE_URL } from "@/utils/constants";
import { MdPlayArrow } from 'react-icons/md';

export default function WatchProviders({detailsData}) {
  const [watchNow, setWatchNow] = useState(false)
  const [hoveredProvider, setHoveredProvider] = useState(null);
  const providers = detailsData['watch/providers']?.results?.IN

  const providersList = useMemo(() => {
    if (providers && (providers.flatrate || providers.buy || providers.rent)) {
      const allProviders = [
        ...(providers.flatrate || []),
        ...(providers.buy || []),
        ...(providers.rent || []),
      ]

      const uniqueProviders = {}
      allProviders.forEach(provider => {
        if (!uniqueProviders[provider.provider_id]) {
          uniqueProviders[provider.provider_id] = provider
        }
      })

      return Object.values(uniqueProviders)
    }
    return []
  }, [providers])

  function handleWatchNowClick() {
    setWatchNow(prev => !prev)
  }

  // Don't render anything if there are no providers
  if (providersList.length === 0) {
    return <p className="text-gray-400">Not available for streaming in your region.</p>
  }

  return (
  <div className="flex items-center gap-5">
    <button className="self-start inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold rounded-md cursor-pointer bg-red-600/80 shadow-sm backdrop-blur-xl text-white border-none hover:bg-red-600 transition-colors" onClick={handleWatchNowClick}>
      <MdPlayArrow className="mr-2 size-6 mb-0.25" />
      Watch Now
    </button>
    {watchNow && (
      <div className="inline-flex shrink-0 grow-0 items-center gap-4">
        {providersList.map((provider) => {
          const isHovered = hoveredProvider === provider.provider_id;
          return (
            <div
              key={provider.provider_id}
              className="relative"
              onMouseEnter={() => setHoveredProvider(provider.provider_id)}
              onMouseLeave={() => setHoveredProvider(null)}
            >
              <a href={providers.link} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                <Image
                  className="size-12 rounded"
                  src={`${IMAGE_BASE_URL}w92${provider.logo_path}`}
                  alt={provider.provider_name}
                  width={48}
                  height={48}
                />
              </a>
              {isHovered && <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-gray-500/40 backdrop-blur-sm text-white text-xs rounded-md whitespace-nowrap shadow-lg transition-opacity duration-900 text-center">{provider.provider_name}</div>}
            </div>
          );
        })}
      </div>
    )}
  </div>
  )
}
