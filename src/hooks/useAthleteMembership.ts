import { apiClient } from "@/config/axios.config";
import { ClientError, MembershipResponse } from "@/types";
import { EndpointType } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useAthleteMembership = (athleteId: string) => {
  const fetchMembershipInformation = async (): Promise<MembershipResponse> => {
    const response = await apiClient.get<MembershipResponse>(
      `${EndpointType.Athlete}/${athleteId}/membership`
    );
    return response.data;
  };

  const {
    data: membershipResponse,
    error,
    isLoading,
  } = useQuery<MembershipResponse, AxiosError<ClientError>>({
    queryKey: ["membership", athleteId],
    queryFn: fetchMembershipInformation,
    enabled: !!athleteId, // Prevents the query from running if `athleteId` is falsy
  });

  return {
    membership: membershipResponse?.data,
    isLoading,
    error,
  };
};