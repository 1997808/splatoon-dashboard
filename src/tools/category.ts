import { MyAxios } from "@/tools/api";
import { formatUrl } from "@/lib/utils";

export interface ICategoryFilter {
  type?: string;
  isHighlight?: boolean;
}

export const getCategories = async (payload: ICategoryFilter) => {
  const url = formatUrl("/category", payload);
  const result = await MyAxios.get(url);
  return result.data;
};
