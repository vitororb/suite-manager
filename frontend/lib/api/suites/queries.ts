import { API_URL } from "@/lib/config/api";
import { Suite } from "@/shared/types/suite-type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchSuites = async (): Promise<Suite[]> => {
  const response = await axios.get<Suite[]>(`${API_URL}/suites`);

  if (!response.status.toString().startsWith("2")) {
    throw new Error(`Failed to fetch suites: ${response.statusText}`);
  }

  return response.data;
};

export const useSuites = () => {
  return useQuery({
    queryKey: ["suites"],
    queryFn: fetchSuites,
  });
};
