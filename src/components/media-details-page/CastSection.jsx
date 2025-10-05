"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { IMAGE_BASE_URL, PLACEHOLDER_IMAGE_URL } from '@/utils/constants'

export default function CastSection({data}) {
  const [castData, setCastData] = useState(data.slice(0,15))

  return (
  <div className='mt-16'>
    <h2 className='text-2xl mb-5 border-b-2 border-b-red-500 inline-block pb-2'>Top Cast</h2>

    <div className='flex gap-5 overflow-x-auto p-4 -m-4'>
      {castData.map(item => (
        <div key={item.id} className='flex flex-col shrink-0 w-40 rounded-lg overflow-hidden bg-gray-600/20 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-black/40'>
          <Image
            className='w-full h-[240px] object-cover'
            src={
              item.profile_path
                ? `${IMAGE_BASE_URL}original${item.profile_path}`
                : PLACEHOLDER_IMAGE_URL(160, 240)}
            alt={item.name}
            height={240}
            width={160}
            unoptimized={!item.profile_path}
          />
          <div className='p-3'>
            <p className='font-medium'>{item.name}</p>
            <p className='text-gray-400 text-wrap font-light text-sm'>{item.character}</p>
          </div>
        </div>
      ))}

      {castData!==data ?
      <button
        className='shrink-0 mx-8 text-gray-300 hover:text-white transition-all cursor-pointer self-center'
        onClick={() => setCastData(data)}
      >Show all</button>
      : null
      }
    </div>
  </div>
  )
}
