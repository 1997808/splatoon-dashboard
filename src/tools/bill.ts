import { MyAxios } from "@/tools/api";

export const getAllBills = async () => {
  const result = await MyAxios.get("/bills");
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
