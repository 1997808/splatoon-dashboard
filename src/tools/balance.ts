import { MyAxios } from "@/tools/api";

export const getAllBalances = async () => {
  const result = await MyAxios.get("/balances");
  return result.data;
};

export const getBalanceById = async (id: string) => {
  const result = await MyAxios.get(`/balances/${id}`);
  return result.data;
};

export const createBalances = async (payload: any) => {
  const result = await MyAxios.post("/balances", payload);
  return result.data;
};

export const updateBalances = async (id: string, payload: any) => {
  const result = await MyAxios.patch(`/balances/${id}`, payload);
  return result.data;
};
