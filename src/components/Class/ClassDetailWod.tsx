import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

const ClassDetailWod = () => {
  return (
    <div className="flex-1 h-full bg-white">
      <Card className="border-none rounded-none">
        <CardHeader>
          <CardTitle>Workout</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-full">
            <p>
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
              esse ea aspernatur consectetur autem doloremque labore ut
              perferendis exercitationem, natus, aperiam ad tempore magnam
              facilis voluptates sequi eos dignissimos dicta?
            </p>
            <p>
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
              esse ea aspernatur consectetur autem doloremque labore ut
              perferendis exercitationem, natus, aperiam ad tempore magnam
              facilis voluptates sequi eos dignissimos dicta?
            </p>
            <p>
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
              esse ea aspernatur consectetur autem doloremque labore ut
              perferendis exercitationem, natus, aperiam ad tempore magnam
              facilis voluptates sequi eos dignissimos dicta?
            </p>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClassDetailWod;
