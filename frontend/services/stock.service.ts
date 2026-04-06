import { Stock } from "@/types/stock.types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "./config/api.config";

const getStock = async (): Promise<Stock[]> => {
  const response = await axios.get<Stock[]>(`${API_URL}/stocks`);

  if (!response.status.toString().startsWith("2")) {
    throw new Error(`Failed to fetch suites: ${response.statusText}`);
  }

  return response.data;
};

export const useGetStock = () => {
  return useQuery({
    queryKey: ["stock"],
    queryFn: getStock,
  });
};
