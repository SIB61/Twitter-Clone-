import { dbConnect } from "@/core/utils/db";
import { createOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
export function handleRequest({ GET, POST, DELETE, PATCH, PUT }) {
  const unknownHandler = (_, res) => res.status(404).send("method not found");
  return async (req, res) => {
    await dbConnect();
    const session = await getServerSession(req,res,createOptions(req))
    // if(!session && req.method !== "GET"){
    //    return res.status(401).json({error:"you must be logged in to perform this request"})  
    // }
    let handler
    switch (req.method) {
      case "GET": 
        handler = GET || unknownHandler;
        break;
      case "POST":
        handler = POST || unknownHandler;
        break;
      case "DELETE":
        handler = DELETE || unknownHandler;
        break;
      case "PATCH":
        handler = PATCH || unknownHandler;
        break;
      case "PUT":
        handler = PUT || unknownHandler;
        break;
      default:
        handler = unknownHandler;
    }
    return handler(req, res);
  };
}
