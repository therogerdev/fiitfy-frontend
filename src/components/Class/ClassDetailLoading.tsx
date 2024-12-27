import { Skeleton } from "@/components/ui/skeleton";

const ClassDetailLoading = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="w-1/3 h-6" />
        <Skeleton className="w-16 h-6" />
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-24 rounded-md" />
        <Skeleton className="h-24 rounded-md" />
        <Skeleton className="h-24 rounded-md" />
      </div>

      {/* Movements Section */}
      <div>
        <Skeleton className="w-1/4 h-6 mb-4" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center p-4 space-x-4 rounded-md bg-gray-50"
            >
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="w-2/3 h-4" />
                <Skeleton className="w-1/4 h-4" />
              </div>
              <Skeleton className="w-16 h-6" />
            </div>
          ))}
        </div>
      </div>

      {/* Performance Section */}
      <div>
        <Skeleton className="w-1/4 h-6 mb-4" />
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-md bg-gray-50"
            >
              <div className="flex-1 space-y-2">
                <Skeleton className="w-2/3 h-4" />
                <Skeleton className="w-1/3 h-4" />
              </div>
              <Skeleton className="w-12 h-12 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassDetailLoading;