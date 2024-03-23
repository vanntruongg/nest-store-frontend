import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 *
 * @param path url call api
 * @returns removed first / of path
 */
export const normalizaPath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};
