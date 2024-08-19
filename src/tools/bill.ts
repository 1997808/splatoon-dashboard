import { MyAxios } from "@/tools/api";
import { getParamsFilter } from "@/lib/utils";

export const getAllBills = async (params?: any) => {
  const requestParams = getParamsFilter(params);
  const result = await MyAxios.get(`/bills${requestParams}`);
  return result.data;
};

export const getBillById = async (id: string) => {
  const result = await MyAxios.get(`/bills/${id}`);
  return result.data;
};

export const createBills = async (payload: any) => {
  const result = await MyAxios.post("/bills", payload);
  return result.data;
};

export const updateBills = async (id: string, payload: any) => {
  const result = await MyAxios.patch(`/bills/${id}`, payload);
  return result.data;
};
