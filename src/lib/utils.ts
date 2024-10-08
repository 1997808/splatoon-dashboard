import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";
import { getProfile } from "@/tools/user";

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

export const formatMoney = (amount: any) => {
  if (amount == "Full") {
    return amount;
  }
  return new Intl.NumberFormat("de-DE").format(Math.floor(amount));
};

export const revertFormattedMoney = (formattedAmount: string): any => {
  // Remove all non-numeric characters except the decimal separator (if any)
  const cleanedAmount = formattedAmount
    .replace(/[^\d,-]/g, "")
    .replace(",", ".");

  // Parse the cleaned string into a number
  return cleanedAmount || "0";
};

export const getParamsFilter = (data: any) => {
  const obj = {
    ...data,
  };

  Object.keys(obj).forEach((key) => {
    if (obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    }
  });
  let params = new URLSearchParams(obj).toString();
  if (params !== "") {
    params = "?" + params;
  }
  return params;
};

export const getUserProfile: any = async () => {
  let profile = Cookies.get("profile");
  if (profile === undefined) {
    let result = await getProfile();
    profile = { ...result };
    Cookies.set("profile", JSON.stringify(profile));
  } else {
    profile = JSON.parse(profile);
  }
  return profile;
};

export const updateUserProfile: any = async () => {
  let profile = Cookies.get("profile");
  if (profile === undefined) {
    profile = JSON.stringify({});
  }
  let oldProfile = JSON.parse(profile);
  let { data } = await getProfile();
  Cookies.set("profile", JSON.stringify({ ...oldProfile, ...data }));
};
