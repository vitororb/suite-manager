import { API_URL } from "@/services/config/api.config";
import {
  Suite,
  UpdateSuiteAlertDto,
  UpdateSuiteStatusDto,
} from "@/types/suite.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const getSuites = async (): Promise<Suite[]> => {
  const response = await axios.get<Suite[]>(`${API_URL}/suites`);

  if (!response.status.toString().startsWith("2")) {
    throw new Error(`Failed to fetch suites: ${response.statusText}`);
  }

  return response.data;
};

const updateSuiteStatus = async ({
  id,
  status,
}: UpdateSuiteStatusDto): Promise<Suite> => {
  const response = await axios.patch<Suite>(`${API_URL}/suites/${id}/status`, {
    status,
  });
  return response.data;
};

const updateSuiteAlert = async ({
  id,
  alert,
}: UpdateSuiteAlertDto): Promise<Suite> => {
  const response = await axios.patch<Suite>(`${API_URL}/suites/${id}/alert`, {
    alert,
  });
  return response.data;
};

export const useGetSuites = () => {
  return useQuery({
    queryKey: ["suites"],
    queryFn: getSuites,
  });
};

export const useUpdateSuiteStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSuiteStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suites"] });
    },
  });
};

export const useUpdateSuiteAlert = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSuiteAlert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suites"] });
    },
  });
};
