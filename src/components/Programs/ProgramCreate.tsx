import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const ProgramCreate = () => {

  const program = {}
  return (
    <Sheet defaultOpen>
    {/* <SheetTrigger>Open Program Details</SheetTrigger> */}
    <SheetContent size="lg">
      <SheetHeader>
        <SheetTitle>{program?.name || 'Program Details'}</SheetTitle>
        <SheetDescription>
          {program?.description || 'No description available'}
        </SheetDescription>
      </SheetHeader>
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="flex items-center gap-2 text-lg group">
              {program?.name}
            </CardTitle>
            <CardDescription>
              Total Weeks: {program?.numWeeks}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-sm">
          <div className="grid gap-3">
            <div className="font-semibold">Program Details</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Number of Classes per Week
                </span>
                <span>{program?.numClassesPerWeek}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Duration (Min)
                </span>
                <span>{program?.durationMin} - {program?.durationMax} mins</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Status
                </span>
                <span>{program?.active ? 'Active' : 'Inactive'}</span>
              </li>
              <li className="flex items-center justify-between font-semibold">
                <span className="text-muted-foreground">
                  Schedule Available
                </span>
                <span>{program?.hasSchedule ? 'Yes' : 'No'}</span>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-row items-center px-6 py-3 border-t bg-muted/50">
          <div className="text-xs text-muted-foreground">
            Created at: <time dateTime={program?.createdAt}>
              {new Date(program?.createdAt).toLocaleDateString()}
            </time>
          </div>
        </CardFooter>
      </Card>
    </SheetContent>
  </Sheet>
  )
}

export default ProgramCreate
