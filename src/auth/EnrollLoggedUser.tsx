import { useAuth } from "@/hooks/useAuth";
import { useEnrollAthlete } from "@/hooks/useEnrollAthlete";
import { Button } from "@ui/button";
import { PlusCircleIcon } from "lucide-react";

interface EnrollLoggedUserProps {
  classId: string;
}

const EnrollLoggedUser: React.FC<EnrollLoggedUserProps> = ({ classId }) => {
  const { user } = useAuth();
  const { enrollMutation } = useEnrollAthlete(classId);

  const handleEnrollClick = () => {
    if (user?.athlete?.id) {
      enrollMutation.mutate(user.athlete.id);
    }
  };

  return (
    <div>
      <Button
        size="sm"
        onClick={handleEnrollClick}
        disabled={!user?.athlete?.id || enrollMutation.isPending}
      >
        <PlusCircleIcon className=" w-3.5 mr-1" />
        {enrollMutation.isPending ? "Processing..." : "Enroll"}
      </Button>
    </div>
  );
};
export default EnrollLoggedUser;
