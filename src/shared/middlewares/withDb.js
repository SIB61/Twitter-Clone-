import { dbConnect } from "@/core/utils/db";

export function withDb(func){
  return async (...args)=>{
   await dbConnect()
   return func(...args)
  }
}
