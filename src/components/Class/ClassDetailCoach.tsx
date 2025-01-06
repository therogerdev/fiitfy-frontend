import { apiClient } from "@/config/axios.config";
import { EndpointType } from "@/types/api";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";
import { getInitials } from "@/lib/utils";
import { Link } from "react-router-dom";

export const ClassDetailCoach = ({ coachId }: { coachId?: string }) => {
  const {
    data: coach,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["class", coachId],
    queryFn: () => apiClient.get(`${EndpointType.Athlete}/${coachId}`),
    enabled: !!coachId,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Card className="border rounded-none">
      <CardContent className="flex py-4 gap-x-2">
        <Avatar className="w-12 h-12">
          <AvatarImage
            src={coach?.data.profileImageUrl}
            alt={coach?.data?.username}
          />
          <AvatarFallback>
            {getInitials(coach?.data?.firstName, coach?.data?.lastName)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <Label className="font-bold text-md">Coach</Label>
          <p className="text-primary">{`${coach?.data.firstName} ${coach?.data.lastName}`}</p>
          <Link to="/bio" className="text-blue-400 cursor-pointer">
            Bio
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
