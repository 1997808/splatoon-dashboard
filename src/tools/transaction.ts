import { getParamsFilter } from "@/lib/utils";
import { MyAxios } from "@/tools/api";

export const getAllTransactions = async (params?: any) => {
  const requestParams = getParamsFilter(params);
  const result = await MyAxios.get(`/transactions${requestParams}`);
  return result.data;
};

export const getMonthlySum = async () => {
  const result = await MyAxios.get("/transactions/month-sum");
  return result.data;
};

export const getMonthlyCategory = async () => {
  const result = await MyAxios.get("/transactions/month-category");
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

export const createManyTransactions = async (payload: any) => {
  const result = await MyAxios.post("/transactions/many", payload);
  return result.data;
};

export const updateTransactions = async (id: string, payload: any) => {
  const result = await MyAxios.patch(`/transactions/${id}`, payload);
  return result.data;
};
