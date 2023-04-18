import { Redis } from "ioredis"

  let redis
  export function getRedisClient(){
   if(!redis) redis = new Redis()
   return redis 
  }
