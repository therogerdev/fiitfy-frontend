import { apiClient } from "@/config/axios.config";
import { Athlete, ClientError, Membership, MembershipResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { useToast } from "@/hooks/use-toast";
import { EndpointType } from "@/types/api";
import { AxiosError } from "axios";
import { differenceInCalendarDays, format } from "date-fns";
import { useNavigate } from "react-router";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { AthleteDetailCardLoading } from "./AthleteDetailCardLoading";
interface AthleteMembershipProps {
  id: string;
  athlete?: Athlete;
}

// Fetches the membership information for a specific athlete
const fetchMembershipInformation = async (
  id: string
): Promise<MembershipResponse> => {
  const response = await apiClient.get<MembershipResponse>(
    `${EndpointType.Athlete}/${id}/membership`
  );
  return response.data;
};

const AthleteMembership: React.FC<AthleteMembershipProps> = ({
  id,
  athlete,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    data: membershipResponse,
    error,
    isLoading,
  } = useQuery<MembershipResponse, AxiosError<ClientError>>({
    queryKey: ["membership", id],
    queryFn: () => fetchMembershipInformation(id),
  });

  if (isLoading) {
    return <AthleteDetailCardLoading title="Membership Information" />;
  }

  if (error) {
    return (
      <AthleteDetailCardLoading
        title="Membership Information"
        errorMessage={error.response?.data.error || ""}
      />
    );
  }

  const membership: Membership | undefined = membershipResponse?.data;

  if (!membership)
    return (
      <Card className="p-2">
        <CardHeader className="flex flex-col items-start justify-between pb-2 space-y-0">
          <CardTitle className="font-semibold text-md text-primary">
            {"Membership Information"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center mt-10 gap-y-4">
          <p className="text-sm font-light text-primary">
            {"There is no membership associate to this account."}
          </p>
          <Button
            onClick={() =>
              navigate(`/athlete/${athlete?.id}/programs`, {
                state: {
                  customerEmail: athlete?.email,
                },
              })
            }
            variant={"outline"}
          >
            Add Membership
          </Button>
        </CardContent>
      </Card>
    );

  // TODO: Make it generic and useEffect so that warning show up automatically
  const triggerRenewWarning = () => {
    if (
      differenceInCalendarDays(new Date(membership.endDate), new Date()) > 7
    ) {
      toast({
        title: "Membership is about to expire",
        description: "Please renew your membership as soon as possible.",
        variant: "default",

        action: (
          <Button className="mt-2" variant={"default"}>
            Renew Membership
          </Button>
        ),
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="font-semibold text-md text-primary">
          Membership Information
        </CardTitle>
        <CalendarDays className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0">
                <dt className="font-semibold text-primary text-sm/6">Name </dt>
                <dd className="mt-1 text-secondary-foreground text-sm/6 sm:col-span-2 sm:mt-0">
                  {membership?.name}
                </dd>
              </div>
              <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0">
                <dt className="font-semibold text-primary text-sm/6">Status</dt>
                <dd className="mt-1 text-secondary-foreground text-sm/6 sm:col-span-2 sm:mt-0">
                  {membership.isExpired ? (
                    <Badge variant={"destructive"}>Expired</Badge>
                  ) : (
                    <Badge>Active</Badge>
                  )}
                </dd>
              </div>
              <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0">
                <dt className="font-semibold text-primary text-sm/6">
                  Start Date
                </dt>
                <dd className="mt-1 text-secondary-foreground text-sm/6 sm:col-span-2 sm:mt-0">
                  {format(new Date(membership?.startDate || ""), "PP")}
                </dd>
              </div>
              <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0">
                <dt className="font-semibold text-primary text-sm/6">
                  End Date
                </dt>
                <dd className="flex items-center justify-between mt-1 text-secondary-foreground text-sm/6 sm:col-span-2 sm:mt-0">
                  {format(new Date(membership?.endDate || ""), "PP")}
                  <Button
                    size={"sm"}
                    // onClick={() =>
                    //   navigate(`/athlete/${athlete?.id}/programs`, {
                    //     state: {
                    //       customerEmail: athlete?.email,
                    //     },
                    //   })
                    // }
                    onClick={triggerRenewWarning}
                    variant={"default"}
                  >
                    Renew Membership
                  </Button>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AthleteMembership;
