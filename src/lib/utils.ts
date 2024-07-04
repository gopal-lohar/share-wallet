import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPfpColor(str: string) {
  let hue = 0;
  for (let index = 0; index < str.length; index++) {
    hue += str.charCodeAt(index);
  }
  hue = hue % 360;
  return `hsl(${hue} ,35% ,45%)`;
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
