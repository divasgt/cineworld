export default function Loading() {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-60px)]">
      {/* <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-700"></div> */}
      <div className="animate-pulse  text-white text-2xl">Loading...</div>
    </div>
  );
}

