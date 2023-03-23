import { dbConnect } from "@/core/utils/db"
export function handleRequest({GET,POST,DELETE,PATCH,PUT}){
  return async (req,res) =>{
    await dbConnect()
    switch(req.method){
      case 'GET': return GET(req,res)
      case 'POST': return POST(req,res)
      case 'DELETE': return DELETE(req,res)
      case 'PATCH': return PATCH(req,res)
      case 'PUT': return PUT(req,res)
      default: res.status(404).send()
    }
  }
}
