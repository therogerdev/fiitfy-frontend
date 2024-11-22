import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { format } from "date-fns";
import { Copy } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

export const ClassInfo = ({
  description,
  date,
  id,
  duration,
}: {
  id: string;
  className: string;
  description: string;
  date: string;
  time: string;
  duration: string;
}) => {
  const { copyToClipboard } = useCopyToClipboard();

  return (
    <Card className="border-b border-l-0 border-r-0 rounded-none">
      <CardHeader>
        <CardTitle>Class Information</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-y-5 ">
        <div className="grid items-center w-full grid-cols-4 gap-4 ">
          <div className="flex flex-col space-y-1.5 col-span-2 ">
            <Label className="text-md">ID:</Label>
            <div className="flex">
              <p className="truncate text-primary">{id}</p>
              <Button
                size="icon"
                variant="outline"
                className="w-6 h-6 mx-1 transition-opacity"
                onClick={() => copyToClipboard(id)}
              >
                <Copy className="w-3 h-3" />
                <span className="sr-only">Copy Class ID</span>
              </Button>
            </div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label className="text-md">Date</Label>
            <p className="text-primary">{format(new Date(date), "PP")}</p>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label className="text-md">Start Time</Label>
            <p className="text-primary">{format(new Date(date), "pp")}</p>
          </div>
        </div>

        <div className="grid items-center w-full grid-cols-4 gap-4 ">
          <div className="flex flex-col space-y-1.5 col-span-2 ">
            <Label className="text-md">Description</Label>
            <p className="text-primary">{description}</p>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label className="text-md">Duration</Label>
            <p className="text-primary">{duration || 60} min</p>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label className="text-md">Duration</Label>
            <p className="text-primary">{duration || 60} min</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
