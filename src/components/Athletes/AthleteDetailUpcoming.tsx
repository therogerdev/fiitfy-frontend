import { CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";


const AthleteDetailUpcoming = () => {
  return (
    <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
      <CardTitle className="text-sm font-medium">
        Upcoming Classes
      </CardTitle>
      <CreditCard className="w-4 h-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>Upcoming Classes content here</CardContent>
  </Card>
  )
}

export default AthleteDetailUpcoming