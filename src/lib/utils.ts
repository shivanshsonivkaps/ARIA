import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(fullName: string) {
  const nameArray = fullName.split(" ");
  let initials = "";
  nameArray.forEach((word) => {
    initials += word.charAt(0).toUpperCase();
  });
  return initials;
}
