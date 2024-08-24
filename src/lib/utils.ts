import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPfpColor(str: string, hueInput: number = 0) {
  let hue = 0;
  if (!hueInput) {
    for (let index = 0; index < str.length; index++) {
      hue += str.charCodeAt(index);
    }
    hue = hue % 360;
  }

  return `hsl(${hueInput ? hueInput : hue} ,35% ,45%)`;
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
