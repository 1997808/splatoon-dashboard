import { MyAxios } from "@/tools/api";

export const getProfile = async () => {
  const result = await MyAxios.get(`/users/profile`);
  return result.data;
};

export const updateProfile = async (payload: any) => {
  const result = await MyAxios.patch(`/users/profile`, payload);
  return result.data;
};
