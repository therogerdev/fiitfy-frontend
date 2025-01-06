import { ClientError } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { Skeleton } from "../ui/skeleton";


export const AthleteDetailCardLoading = ({
    errorMessage,
    title,
  }: {
    errorMessage?: ClientError["error"];
    title?: string;
  }) => {
    return (
      <Card className="p-2">
        <CardHeader className="flex flex-col items-start justify-between pb-2 space-y-0">
          <CardTitle className="font-semibold text-md text-primary">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-10">
          {errorMessage ? (
            <p className="text-sm font-light text-primary">{errorMessage}</p>
          ) : (
            <div className="flex flex-col gap-y-4">
              <Skeleton className="w-3/4 h-4" />
              <Skeleton className="w-3/4 h-4" />
              <Skeleton className="w-3/4 h-4" />
              <Skeleton className="w-3/4 h-4" />
            </div>
          )}
        </CardContent>
      </Card>
    );
  };