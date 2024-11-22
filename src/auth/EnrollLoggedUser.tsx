import { useAuth } from "@/hooks/useAuth";
import { useEnrollAthlete } from "@/hooks/useEnrollAthlete";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router";
import { PlusCircleIcon } from "lucide-react";

interface EnrollLoggedUserProps {
  classId: string;
}

const EnrollLoggedUser: React.FC<EnrollLoggedUserProps> = ({ classId }) => {
  const { user } = useAuth();
  const { enrollMutation } = useEnrollAthlete(classId);
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);

  const hasMembership =
    user?.athlete?.memberships && user.athlete.memberships.length > 0;

  const handleEnrollClick = () => {
    if (user?.athlete?.id) {
      enrollMutation.mutate(user.athlete.id);
      setShowDialog(false);
    }
  };

  return (
    <>
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogTrigger asChild>
          <Button
            size="sm"
            onClick={() => setShowDialog(true)}
            disabled={!user?.athlete?.id || enrollMutation.isPending}
          >
            <PlusCircleIcon className="w-3.5 mr-1" />
            {enrollMutation.isPending ? "Processing..." : "Enroll"}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          {hasMembership ? (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Enrollment</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to enroll in this class?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleEnrollClick}>
                  Enroll
                </AlertDialogAction>
              </AlertDialogFooter>
            </>
          ) : (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>No Active Membership</AlertDialogTitle>
                <AlertDialogDescription>
                  You currently do not have an active membership. Please add a
                  membership to enroll in classes.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() =>
                    navigate(`/athlete/${user?.athlete?.id}/programs`, {
                      state: {
                        customerEmail: user?.athlete?.email,
                      },
                    })
                  }
                >
                  Add Membership
                </AlertDialogAction>
              </AlertDialogFooter>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EnrollLoggedUser;
