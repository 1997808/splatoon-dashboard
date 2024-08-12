import { MyAxios } from "@/tools/api";

export const getBudget = async () => {
  const result = await MyAxios.get(`/budgets`);
  return result.data;
};

export const updateBudgets = async (id: string, payload: any) => {
  const result = await MyAxios.patch(`/budgets/${id}`, payload);
  return result.data;
};
