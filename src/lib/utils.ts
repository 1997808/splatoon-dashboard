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

export const getCurrencyCode = () => {
  // Get the user's locale from the browser
  const userLocale = navigator.language || "en-US";

  // Use Intl.NumberFormat to determine the currency for the user's locale
  const currency = new Intl.NumberFormat(userLocale, {
    style: "currency",
    currency: "USD", // Fallback in case the locale does not provide a currency
  }).resolvedOptions().currency;

  return currency;
};
