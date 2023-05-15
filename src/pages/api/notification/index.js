import { handleRequest } from "@/lib/middlewares/request-handler";
import { getServerSession } from "next-auth";
import { createOptions } from "../auth/[...nextauth]";
import UserModel from "@/lib/models/user.schema";

export default handleRequest({
  GET: async (req, res) => {
      const session = await getServerSession(req, res, createOptions(req));
      if(!session){
        throw {status:401,error:"you must be logged in"}
      }
      const { type } = req.query;
      if (type === "message") {
        const { messageNotifications } = await UserModel.findById(
          session.user.id
        ).select({
          messageNotifications: 1,
        });
        return res.json({success:true,error:null,data:messageNotifications});
      }
      else return res.json([])
  },
});
