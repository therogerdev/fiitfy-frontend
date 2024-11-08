
import { Athlete } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { getInitials } from "@/lib/utils";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "../ui/react-hover-card";
import { AthleteDetailCardLoading } from "./AthleteDetailCardLoading";


export const AthleteDetailInformation = ({ athlete }: { athlete?: Athlete }) => {
    if (!athlete) {
      return <AthleteDetailCardLoading title="Athlete Information" />;
    }
  
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="font-semibold text-md text-primary">
            Athlete Information
          </CardTitle>
          <HoverCard openDelay={200}>
            <HoverCardTrigger asChild>
              <Avatar className="hidden cursor-pointer h-9 w-9 sm:flex">
                <AvatarImage src={athlete?.profileImageUrl} alt="Avatar" />
                <AvatarFallback>
                  {getInitials(
                    athlete?.firstName as string,
                    athlete?.lastName as string
                  )}
                </AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
  
            <HoverCardContent className="w-32 h-32 p-2">
              <img src={athlete?.profileImageUrl} />
            </HoverCardContent>
          </HoverCard>
        </CardHeader>
        <CardContent>
          <div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0">
                  <dt className="font-semibold text-primary text-sm/6">Name</dt>
                  <dd className="mt-1 text-secondary-foreground text-sm/6 sm:col-span-2 sm:mt-0">
                    {`${athlete?.firstName} ${athlete?.lastName}`}
                  </dd>
                </div>
                <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0">
                  <dt className="font-semibold text-primary text-sm/6">Email</dt>
                  <dd className="mt-1 text-secondary-foreground text-sm/6 sm:col-span-2 sm:mt-0">
                    {athlete?.email}
                  </dd>
                </div>
                <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0">
                  <dt className="font-semibold text-primary text-sm/6">Phone</dt>
                  <dd className="mt-1 text-secondary-foreground text-sm/6 sm:col-span-2 sm:mt-0">
                    {athlete?.phone}
                  </dd>
                </div>
                <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0">
                  <dt className="font-semibold text-primary text-sm/6">
                    Gender{" "}
                  </dt>
                  <dd className="mt-1 text-secondary-foreground text-sm/6 sm:col-span-2 sm:mt-0">
                    {athlete?.gender}
                  </dd>
                </div>
                {/* <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-2 sm:px-0">
                <dt className="font-semibold text-primary text-sm/6">
                  Member Since
                </dt>
                <dd className="mt-1 text-secondary-foreground text-sm/6 sm:col-span-2 sm:mt-0">
                  {format(new Date(athlete?.createdAt || ""), "PP")}
                </dd>
              </div> */}
              </dl>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };