export default function LoadingSkeleton({ count=6 }) {
  const arr = new Array(count).fill("")
  return (
	<>
  {arr.map((_, index) => (
    <div key={index} className="card flex items-center justify-center h-72 bg-gray-700 rounded-lg animate-pulse">
      <p className="text-lg">Loading...</p>
    </div>
  ))}
	</>
  );
};