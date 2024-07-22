import { MyAxios } from "@/tools/api";

export const getAllTransactions = async () => {
  const result = await MyAxios.get("/transactions");
  return result.data;
};
