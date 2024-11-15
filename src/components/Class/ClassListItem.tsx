import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { appLink } from "@/config/links";
import { Class } from "@/types";
import { Tooltip } from "@radix-ui/react-tooltip";
import { format } from "date-fns";
import { EyeIcon, Timer, XIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ClassListItemProps {
  classInfo: Class;
}

const ClassListItem: React.FC<ClassListItemProps> = ({ classInfo }) => {
  const isClassFull = classInfo.activeEnrollments === classInfo.capacity;
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-4 mb-2 bg-white border rounded-lg">
      <div className="flex items-center space-x-4">
        <div className="text-xs text-gray-500">
          {format(classInfo.date as Date, "H:mm a")}
        </div>
        <div>
          <h3 className="font-bold">{classInfo.name}</h3>
          <div className="text-sm text-gray-500">
            {classInfo.classType} • Martial Arts • {classInfo.coach?.firstName}{" "}
            {classInfo.coach?.lastName}
          </div>
        </div>
        {isClassFull && (
          <div className="">
            <Badge variant={"destructive"}>Class is full</Badge>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex mr-3 gap-x-1">
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  onClick={() =>
                    navigate(`${appLink.classDetail(classInfo.id, "").href}`)
                  }
                  variant={"default"}
                  size={"sm"}
                >
                  <EyeIcon className="w-3.5 h-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>See Details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button variant={"outline"} size={"sm"}>
                  <Timer className="w-3.5 h-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Join Class</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button variant={"destructive"} size={"sm"}>
                  <XIcon className="w-3.5 h-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cancel Enrollment</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {classInfo.activeEnrollments} Booked
      </div>
    </div>
  );
};

export default ClassListItem;
