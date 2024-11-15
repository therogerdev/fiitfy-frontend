import { fetchClassesBySelectedDate } from "@/services/classes";
import { ClassResponse, ClientError } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { endOfDay, startOfDay } from "date-fns";

interface UseFetchClassesOptions {
  selectedDate: Date;
}

export const useFetchClasses = ({ selectedDate }: UseFetchClassesOptions) => {
  const startDate = startOfDay(selectedDate).toISOString();
  const endDate = endOfDay(selectedDate).toISOString();

  const { data, error, isLoading, refetch } = useQuery<ClassResponse, AxiosError<ClientError>>({
    queryKey: ["classList", startDate, endDate],
    queryFn: () => fetchClassesBySelectedDate(startDate, endDate),
    refetchOnWindowFocus: true,
  });

  return {
    classes: data?.data || [],
    isLoading,
    error,
    refetch,
  };
};
