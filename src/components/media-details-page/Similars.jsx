import MediaCard from "../MediaCard";

export default function Similars({data, type}) {
  return (
  <>
    {data.map(item => (
      <MediaCard key={item.id} item={item} isMovie={type==="movie"} layoutType="horizontal" />
    ))}
  </>
  )
}
