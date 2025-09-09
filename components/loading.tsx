

export function LoadingSpinner() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-xl h-12 w-12 border-4 border-b-45 border-[#C5C4A6]"></div>
        </div>
    );
}

export function LoadingSkeletons({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
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
  );
}

