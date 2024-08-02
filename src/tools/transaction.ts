import { MyAxios } from "@/tools/api";

export const getAllTransactions = async () => {
  const result = await MyAxios.get("/transactions");
  return result.data;
};

export const createTransactions = async (payload: any) => {
  const result = await MyAxios.post("/transactions", payload);
  console.log(result, "======================");
  return result.data;
};
