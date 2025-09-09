export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-xl h-12 w-12 border-4 border-b-45 border-[#C5C4A6]"></div>
    </div>
  );
}

export function LoadingSkeletons({ count = 6 }: { count?: number }) {
  return (
    <>
      <div className="animate-pulse relative w-full h-[400px] rounded-xl overflow-hidden mb-4">
        <div className="absolute inset-0 bg-gray-200"></div>
        <div className="absolute top-15 left-10 w-1/3 h-8 bg-gray-300 rounded"></div>
        <div className="absolute top-32 left-8 w-1/4 h-6 bg-gray-300 rounded"></div>
        <div className="absolute top-48 left-16 w-32 h-10 bg-gray-300 rounded"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="p-4 max-w-sm w-full mx-auto">
            <div className="animate-pulse flex space-x-4 ">
              <div className="rounded-xl bg-gray-200 h-80 w-full"></div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
