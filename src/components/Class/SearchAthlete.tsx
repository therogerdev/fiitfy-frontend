import { apiClient } from "@/config/axios.config";
import { queryClient } from "@/config/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useDebounce } from "@/hooks/useDebounce";
import { fetchAthleteBySearch } from "@/services/athlete";
import { searchQueryAtom, selectedAthleteIdAtom } from "@/store/class";
import {
  ClassEnrollment,
  ClassEnrollmentResponse,
  ClassEnrollmentStatus,
  ClientError,
} from "@/types";
import { EndpointType } from "@/types/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAtom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SearchAthleteProps {
  classId?: string;
}

const SearchAthlete = ({ classId }: SearchAthleteProps) => {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const setSelectedAthleteId = useSetAtom(selectedAthleteIdAtom);
  const { toast } = useToast();
  const debouncedSearchQuery = useDebounce(searchQuery);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const {
    data: athleteResults,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["searchAthlete", debouncedSearchQuery, currentPage],
    queryFn: () =>
      fetchAthleteBySearch(debouncedSearchQuery, currentPage, rowsPerPage),
    enabled: false,
    staleTime: 0, // Ensure fresh data on each search
  });

  const enrollMutation = useMutation<
    ClassEnrollment[],
    AxiosError<ClientError>,
    string
  >({
    mutationFn: async (athleteId) => {
      const response = await apiClient.post<ClassEnrollmentResponse>(
        `${EndpointType.Enroll}/${classId}/enroll`,
        { athleteId }
      );
      return Array.isArray(response.data.data)
        ? response.data.data
        : [response.data.data];
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["enrollment"] });
      queryClient.invalidateQueries({ queryKey: ["class-detail", classId] });

      data.forEach((enrollment) => {
        toast({
          title:
            enrollment.status === ClassEnrollmentStatus.WAITLISTED
              ? "WAITLIST!"
              : "Enrolled!",
          description: `${enrollment.athlete.firstName} ${
            enrollment.athlete.lastName
          } ${
            enrollment.status === ClassEnrollmentStatus.WAITLISTED
              ? "has been added to the waitlist"
              : "has been enrolled successfully"
          }`,
          variant:
            enrollment.status === ClassEnrollmentStatus.WAITLISTED
              ? "default"
              : "info",
        });
      });

      setSelectedAthleteId(null);
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.error || "An unexpected error occurred";
      toast({
        title: "Enrollment Error",
        description: errorMessage as string,
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      refetch().catch((error: Error) => {
        console.error("Error fetching athletes:", error);
      });
    }
  }, [debouncedSearchQuery, currentPage, refetch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleEnrollClick = (athleteId: string) => {
    setSelectedAthleteId(athleteId);
    enrollMutation.mutate(athleteId);
  };

  const pagination = athleteResults?.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
  };

  return (
    <div>
      <Input
        type="search"
        placeholder="Search Athlete..."
        value={searchQuery}
        onChange={handleSearchChange}
        className=""
      />
      {debouncedSearchQuery && athleteResults && (
        <div className="mt-4">
          {isFetching && (
            // skeleton
            <div className="animate-pulse">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="flex justify-between mb-2">
                  <div className="w-full h-4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          )}
          {!isFetching && (
            <>
              <ul>
                {athleteResults.data.map((athlete) => (
                  <li key={athlete.id} className="flex justify-between">
                    <span>{`${athlete.firstName} ${athlete.lastName}`}</span>
                    <Button
                      size="sm"
                      onClick={() => handleEnrollClick(athlete.id)}
                    >
                      Enroll
                    </Button>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between mt-4">
                <Button
                  size="sm"
                  disabled={pagination.currentPage === 1}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                >
                  <ChevronLeft className=" w-3.5" />
                </Button>
                <span>
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <Button
                  size="sm"
                  disabled={
                    pagination.currentPage === pagination.totalPages ||
                    isFetching
                  }
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, pagination.totalPages)
                    )
                  }
                >
                  <ChevronRight className=" w-3.5" />
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchAthlete;
