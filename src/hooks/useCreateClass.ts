import { FormSchemaType } from "@/components/Class/ClassCreateForm";
import { apiClient } from "@/config/axios.config";
import { useToast } from "@/hooks/use-toast";
import { ClientError } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";

export const useCreateClass = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Define mutation for creating a class
  const createClassMutation = useMutation<FormSchemaType, AxiosError<ClientError>, FormSchemaType>({
    mutationFn: async (data) => {
      return apiClient.post("/class/create", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classList"] });
      toast({
        title: "Class created successfully!",
        variant: "default",
      });
      navigate("/class"); // Redirect to the class list page
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  return {
    createClass: createClassMutation.mutate,
    isLoading: createClassMutation.isPending,
    isError: createClassMutation.isError,
    error: createClassMutation.error,
  };
};