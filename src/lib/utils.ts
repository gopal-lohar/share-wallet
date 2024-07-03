import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function getPfpColor(str: string) {
  let hue = 0;
  for (let index = 0; index < str.length; index++) {
    hue += str.charCodeAt(index);
  }
  hue = hue % 360;
  return `hsl(${hue} ,35% ,45%)`;
}
