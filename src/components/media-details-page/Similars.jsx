import MediaCard from "../MediaCard";

export default function Similars({data}) {
  return (
  // <div>
  //   <h2 className='text-2xl mb-5 border-b-2 border-b-red-500 inline-block pb-2'>Top Cast</h2>
    <div className='flex gap-5 overflow-x-auto p-4 -m-4'>
      {data.map(item => (
        <MediaCard key={item.id} item={item} isMovie={true} layoutType="horizontal" />
      ))}
    </div>
  // </div>
  )
}
