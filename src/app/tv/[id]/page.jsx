import MediaDetailsContainer from "@/components/media-details-page/MediaDetailsContainer";

export default async function tvPage({params}) {
  const {id} = await params
  
  return (
  <main className="main-content">
    <MediaDetailsContainer type="tv" id={id} />
  </main>
  )
}