import { useToast } from "@/hooks/use-toast";
import { useAthleteMembership } from "@/hooks/useAthleteMembership";
import { Athlete } from "@/types";
import { differenceInCalendarDays, format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { useNavigate } from "react-router";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AthleteDetailCardLoading } from "./AthleteDetailCardLoading";

interface AthleteMembershipProps {
  id: string;
  athlete?: Athlete;
}

const AthleteMembership: React.FC<AthleteMembershipProps> = ({
  id,
  athlete,
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Use the custom hook
  const { membership, isLoading, error } =
    useAthleteMembership(id);

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

  // If no membership is associated with the athlete
  if (!membership) {
    return (
      <Card className="p-2">
        <CardHeader className="flex flex-col items-start justify-between pb-2 space-y-0">
          <CardTitle className="font-semibold text-md text-primary">
            Membership Information
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center mt-10 gap-y-4">
          <p className="text-sm font-light text-primary">
            There is no membership associated with this account.
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
  }

  // Trigger warning if membership is about to expire
  const triggerRenewWarning = () => {
    if (
      differenceInCalendarDays(new Date(membership.endDate), new Date()) > 7
    ) {
      toast({
        title: "Membership is about to expire",
        description: "Please renew your membership as soon as possible.",
        variant: "default",
        action: (
          <Button size={"xs"} className="mt-2" variant={"default"}>
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
                <dt className="font-semibold text-primary text-sm/6">Name</dt>
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
                    size={"xs"}
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