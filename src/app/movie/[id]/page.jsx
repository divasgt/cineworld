import MediaDetailsContainer from "@/components/media-details-page/MediaDetailsContainer";

export default async function moviePage({params}) {
  const {id} = await params
  
  return (
  <main className="main-content">
    <MediaDetailsContainer type="movie" id={id} />
  </main>
  )
}