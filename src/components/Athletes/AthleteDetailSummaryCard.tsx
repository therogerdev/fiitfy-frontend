import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const AthleteDetailSummaryCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle> AthleteDetailSummaryCard</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        Athlete Summary Card content here
      </CardContent>
    </Card>
  );
};

export default AthleteDetailSummaryCard;
