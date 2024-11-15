import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import ContentLayout from "../layouts/content-layout";

interface ClassPageSkeletonProps {
    error?: string;
  }

const ClassPageSkeleton: React.FC<ClassPageSkeletonProps> = ({ error }) => {
  if (error) {
    return (
      <ContentLayout className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-lg font-semibold text-red-500">Error</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout className="">
      <div className="flex justify-between mb-4">
        <div className="flex gap-x-2">
          <Skeleton className="w-1/6 h-4 rounded" />
          <Skeleton className="h-4 rounded w-14" />
        </div>
        <Skeleton className="w-40 h-12 " />
      </div>
      <div className="">
        {/* Date Selector Skeleton */}
        <div className="grid grid-cols-7 gap-4 mb-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <Skeleton key={index} className="w-full rounded-md h-14" />
          ))}
        </div>

        {/* Class Cards Skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-row items-center p-6 space-x-4 bg-white rounded-md shadow-md"
            >
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="w-3/4 h-4 rounded" />
                <Skeleton className="w-1/2 h-4 rounded" />
              </div>
              <Skeleton className="w-16 h-8 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </ContentLayout>
  );
};

export default ClassPageSkeleton;
