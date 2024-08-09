import { MyAxios } from "@/tools/api";

export const getAllTransactions = async () => {
  const result = await MyAxios.get("/transactions");
  return result.data;
};

export const getTransactionById = async (id: string) => {
  const result = await MyAxios.get(`/transactions/${id}`);
  return result.data;
};

export const createTransactions = async (payload: any) => {
  const result = await MyAxios.post("/transactions", payload);
  return result.data;
};

export const updateTransactions = async (id: string, payload: any) => {
  const result = await MyAxios.patch(`/transactions/${id}`, payload);
  return result.data;
};
