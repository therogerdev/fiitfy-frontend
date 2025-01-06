import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const SectionCard: React.FC<{ id: string; type: string }> = ({
  id,
  type,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <CardHeader>
        <CardTitle>{type}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Drag this to reorder or customize this section.</p>
      </CardContent>
    </Card>
  );
};
