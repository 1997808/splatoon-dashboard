import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatUrl = (url: string, payload: Record<string, any>) => {
  const params = new URLSearchParams();
  for (const key in payload) {
    params.append(key, payload[key]);
  }
  return `${url}?${params.toString()}`;
};
