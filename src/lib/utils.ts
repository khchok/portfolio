import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
  const date = dayjs(dateString);
  if (date.isValid()) {
    return date.format("DD/MM/YYYY");
  }
  return dateString;
}
