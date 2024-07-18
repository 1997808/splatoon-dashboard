import { MyAxios } from "@/tools/api";

export interface ILogin {
  email: string;
  password: string;
}

export const login = async (payload: ILogin) => {
  const { email, password } = payload;
  const result = await MyAxios.post("/auth/login", { email, password });
  return result.data;
};
