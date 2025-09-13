import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

console.log("[v0] Loading utils.ts with clsx")

export function cn(...inputs: ClassValue[]) {
  console.log("[v0] cn function (TS) called with inputs:", inputs)
  const result = twMerge(clsx(inputs))
  console.log("[v0] cn function (TS) result:", result)
  return result
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null }
