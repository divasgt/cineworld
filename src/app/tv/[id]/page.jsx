import MediaDetailsPageComponent from "@/components/media-details-page/MediaDetailsPageComponent"

export default async function TvPage({params}) {
  const {id} = await params
  
  return (
  <main className="main-content">
    <MediaDetailsPageComponent type="tv" id={id} />
  </main>
  )
}