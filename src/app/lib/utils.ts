import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs:ClassValue[]){
    //will merge classes
    return twMerge(clsx(inputs))
}