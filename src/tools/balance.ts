import { MyAxios } from "@/tools/api";

export const getAllBalances = async () => {
  const result = await MyAxios.get("/balances");
  return result.data;
};

export const createBalances = async (payload: any) => {
  const result = await MyAxios.post("/balances", payload);
  return result.data;
};
